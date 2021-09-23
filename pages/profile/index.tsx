import React, {
  FC,
  useState,
  useCallback,
  ChangeEvent,
  useEffect,
} from 'react';
import { useQueryClient, useMutation } from 'react-query';
import cx from 'classnames';
import { getSession, signOut } from 'next-auth/client';

import i18next from 'i18next';

// authentication
import { withAuthentication, withUser } from 'hoc/auth';
import { useMe } from 'hooks/auth';

// services
import {
  updateUser,
  passwordRecovery,
  deleteUser,
} from 'services/user';

// components
import LayoutPage from 'layout';
import Head from 'components/head';
import Hero from 'layout/hero';
import Icon from 'components/icon';
import Button from 'components/button';

// util
import { validateEmail } from 'utils';

interface NewDetailProps {
  username?: string,
  email?: string,
  token: string,
  password?: string,
  passwordConfirmation?: string
}
const ProfilePage: FC = () => {
  const queryClient = useQueryClient();
  const { isLoading, data: user } = useMe({
    refetchOnWindowFocus: false,
    placeholderData: {
      email: '',
      username: '',
    },
  });

  const { email: userEmail, username: userName, token: userToken } = user;

  const [passwordView, setPasswordVisibility] = useState({
    new: false,
    password_confirmation: false,
  });

  const [credentials, setCredentials] = useState({
    username: userName,
    email: userEmail,
    token: userToken,
    password: '',
    newPassword: '',
    password_confirmation: '',
  });

  useEffect(() => {
    if (!isLoading) {
      setCredentials({
        username: userName,
        email: userEmail,
        token: userToken,
        password: '',
        newPassword: '',
        password_confirmation: '',
      });
    }
  }, [isLoading, userName, userEmail, userToken]);

  const [errorMessage, setErrorMessage] = useState('');
  const [isValid, setEmailVerification] = useState(false);

  const handleChange = (type: string, e: ChangeEvent<HTMLInputElement>): void => {
    if (type === 'email') {
      const verificationEmail = validateEmail(e.currentTarget.value);
      setEmailVerification(verificationEmail);
    }

    setCredentials({
      ...credentials,
      [type]: e.currentTarget.value,
    });
  };

  const handlePasswordView = (e) => {
    setPasswordVisibility({
      ...passwordView,
      [e]: !passwordView[e],
    });
  };

  const submitNewDetails = async (
    {
      username, email, token, password, passwordConfirmation,
    }: NewDetailProps,
  ) => updateUser({
    username, email, password, password_confirmation: passwordConfirmation,
  }, token);

  const deletUserAccount = async ({ token }) => deleteUser(token);

  const {
    username, email, token, password, newPassword, password_confirmation: passwordConfirmation,
  } = credentials;

  const { mutate: mutateUserDetails } = useMutation(submitNewDetails, {
    onSuccess: () => {
      queryClient.invalidateQueries('me');
    },
    onError: () => {
      if (newPassword !== passwordConfirmation) {
        setErrorMessage('Your password confirmation did not match your password');
      }
      if (newPassword === passwordConfirmation) {
        setErrorMessage('Your password must be at least 6 characters long');
      }
      throw new Error('something went wrong updating user');
    },
  });

  const { mutate: mutateUserAccount } = useMutation(deletUserAccount, {
    onSuccess: () => {
      queryClient.invalidateQueries('me');
      signOut({ callbackUrl: '/signup' });
    },
    onError: (error) => {
      throw new Error(`something went wrong deleting account: ${error}`);
    },
  });

  const handleSave = (evt) => {
    evt.preventDefault();
    setCredentials({
      token: userToken,
      username,
      email,
      ...credentials,
    });

    if (token) {
      mutateUserDetails({
        username, token, email,
      });
    }
  };

  const handlePasswordChange = useCallback(async (evt) => {
    evt.preventDefault();
    setCredentials({
      token: userToken,
      password,
      newPassword,
      password_confirmation: passwordConfirmation,
      ...credentials,
    });

    mutateUserDetails({
      token: userToken, password: newPassword, passwordConfirmation,
    });
  }, [credentials, userToken, password, passwordConfirmation, newPassword, mutateUserDetails]);

  const handleDelete = useCallback(async (evt) => {
    evt.preventDefault();
    mutateUserAccount({ token });
  }, [token, mutateUserAccount]);

  const handleRecover = () => {
    passwordRecovery(email);
  };

  return (
    <LayoutPage className="text-white bg-gradient-gray1 min-h-screen">
      <Head title="Green Energy Data Platform" />
      <Hero className="lg:px-32 md:px-20">
        <h1 className="text-5.5xl pt-3">{i18next.t('profile')}</h1>
      </Hero>
      <div className="container m-auto bg-white rounded-2.5xl text-grayProfile divide-grayProfile divide-opacity-50 shadow -mt-40 divide-x flex px-10">
        <section className="flex flex-col w-1/2">
          <div className="p-16 flex-1 flex flex-col justify-between">
            <form onSubmit={handleSave} className="flex flex-col items-start">
              <label
                htmlFor="name"
                className="w-full text-xs pb-6 tracking-tight text-grayProfile text-opacity-95"
              >
                {i18next.t('name')}
                <div className="relative my-3 p-2 rounded-sm border border-grayProfile border-opacity-50">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    defaultValue={user?.username}
                    className={cx('pl-10 w-full overflow-ellipsis text-sm text-grayProfile text-opacity-50',
                      { 'text-grayProfile text-opacity-100': username.length })}
                    onChange={(e) => handleChange('username', e)}
                  />
                  <Icon
                    ariaLabel="mail-input"
                    name="profile"
                    size="lg"
                    className="absolute left-4 transform -translate-y-1/2 top-1/2 font-bold"
                  />
                </div>
              </label>
              <label htmlFor="email" className="w-full text-xs pb-2 tracking-tight text-grayProfile text-opacity-50">
                {i18next.t('email')}
                <div className={cx('relative my-3 p-2 rounded-sm border border-grayProfile border-opacity-50',
                  { 'text-grayProfile text-opacity-100': isValid })}
                >
                  <Icon ariaLabel="mail-input" name="mail" size="lg" className="absolute left-4 transform -translate-y-1/2 top-1/2 font-bold" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Write your email account"
                    defaultValue={user?.email}
                    className={cx('pl-10 w-full overflow-ellipsis text-sm text-grayProfile text-opacity-50',
                      { 'text-grayProfile text-opacity-100': isValid })}
                    onChange={(e) => handleChange('email', e)}
                  />

                </div>
              </label>
              <Button
                type="submit"
                aria-label="Sign in"
                theme="secondary"
                className="py-20 bg-gray1 border-gray1 text-white text-sm"
                disabled={isValid}
              >
                {i18next.t('save')}
              </Button>
            </form>
            <>
              <p className="text-grayProfile text-opacity-50 pb-10 text-sm">
                {i18next.t('deleteWarning')}
              </p>
              <Button
                type="button"
                aria-label="delete account"
                theme="warning"
                className="flex justify-left text-sm w-max"
                onClick={handleDelete}
              >
                {i18next.t('delete')}

              </Button>
            </>
          </div>
        </section>
        <section className="flex flex-col w-1/2">
          <div className="p-16 flex-1 flex flex-col justify-between">
            <form onSubmit={handlePasswordChange} className="flex flex-col items-start">
              <h2 className="text-3.5xl font-bold">Change password</h2>
              <label
                htmlFor="password"
                className="w-full pt-10 tracking-tight text-grayProfile text-xs"
              >
                {i18next.t('enterPassword')}

                <div className="relative my-3 p-2 rounded-sm border border-grayProfile border-opacity-50">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className={cx('w-full overflow-ellipsis text-sm',
                      { 'text-grayProfile text-opacity-100': password.length })}
                    onChange={(e) => handleChange('password', e)}
                  />

                </div>
              </label>
              <button
                type="button"
                className="underline pb-10 text-xs"
                onClick={handleRecover}
              >
                {i18next.t('dontRememberPassword')}
              </button>
              <fieldset className="w-full text-xs">
                <label htmlFor="new-password" className="pb-10 tracking-tight text-grayProfile">
                  {i18next.t('newPassword')}

                  <div className="relative mb-8 my-3 p-2 rounded-sm border border-grayProfile border-opacity-50">
                    <input
                      id="new-password"
                      name="new-password"
                      type={passwordView.new ? 'text' : 'password'}
                      className={cx('w-full overflow-ellipsis text-sm',
                        { 'text-grayProfile text-opacity-50': !newPassword.length })}
                      onChange={(e) => handleChange('newPassword', e)}
                    />
                    <Icon
                      ariaLabel="new password"
                      name={passwordView.new ? 'view' : 'hide'}
                      onClick={() => handlePasswordView('new')}
                      size="lg"
                      className={cx('absolute right-4 transform -translate-y-1/2 top-1/2 font-bold',
                        { 'text-grayProfile text-opacity-50': !newPassword.length })}
                    />
                  </div>
                </label>
                <label
                  htmlFor="confirm-password"
                  className="w-full text-xs pt-10 tracking-tight text-grayProfile"
                >
                  {i18next.t('passwordConfirm')}
                  <div className={cx('relative my-3 p-2 rounded-sm border border-grayProfile border-opacity-50',
                    { 'mb-8 ': !errorMessage?.length })}
                  >
                    <input
                      id="confirm-password"
                      name="password"
                      type={passwordView.password_confirmation ? 'text' : 'password'}
                      className={cx('w-full overflow-ellipsis text-sm text-opacity-0',
                        { 'text-grayProfile text-opacity-50': !passwordConfirmation.length })}
                      onChange={(e) => handleChange('password_confirmation', e)}
                    />
                    <Icon
                      ariaLabel="confirm password"
                      name={passwordView.password_confirmation ? 'view' : 'hide'}
                      onClick={() => handlePasswordView('password_confirmation')}
                      size="lg"
                      className={cx('absolute right-4 transform -translate-y-1/2 top-1/2 font-bold',
                        { 'text-grayProfile text-opacity-50': !passwordConfirmation.length })}
                    />
                  </div>
                </label>
                {!!errorMessage?.length && (
                  <p className="mb-8 text-warning">{errorMessage}</p>
                )}
              </fieldset>
              <Button
                type="submit"
                aria-label="Sign in"
                theme="secondary"
                className={cx('py-20 bg-gray1 border-gray1 text-white text-sm',
                  { 'opacity-50': !password.length || !newPassword.length || !passwordConfirmation.length })}
                disabled={!password.length || !newPassword.length || !passwordConfirmation.length}
              >
                {i18next.t('changePassword')}
              </Button>
            </form>
          </div>
        </section>

      </div>
    </LayoutPage>
  );
};

const customServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return ({
      redirect: {
        destination: '/signin?callbackUrl=/profile',
        permanent: false,
      },
    });
  }

  return ({
    props: {},
  });
};

export const getServerSideProps = withAuthentication(withUser(customServerSideProps));

export default ProfilePage;
