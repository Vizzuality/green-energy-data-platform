import React, {
  FC,
  useState,
  ChangeEvent,
  useCallback,
} from 'react';

import cx from 'classnames';

import { useQueryClient } from 'react-query';

// components
import LayoutPage from 'layout';
import Head from 'components/head';
import Header from 'layout/header';
import Button from 'components/button';
import Icon from 'components/icon';
import { useRouter } from 'next/router';

// services
import { updateUser } from 'services/user';
import i18next from 'i18next';

const NewPasswordPage: FC = () => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const { query: { token } } = router;

  const [passwordView, setPasswordVisibility] = useState({
    password: false,
    confirmation: false,
  });
  const [credentials, setCredentials] = useState({
    password: '',
    confirmation: '',
  });

  const [passwordMismatch, setPasswordsMismatchMessage] = useState(false);

  const handleChange = (type: string, e: ChangeEvent<HTMLInputElement>): void => {
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

  const handleSubmit = useCallback(async (evt) => {
    evt.preventDefault();

    const {
      password,
      confirmation,
    } = credentials;

    if (password !== confirmation) {
      setPasswordsMismatchMessage(true);
      setTimeout(() => setPasswordsMismatchMessage(false), 3000);
      throw new Error('Your password confirmation did not match your password');
    }

    try {
      await updateUser({ password, password_confirmation: confirmation }, token);
      router.push('signin');
      queryClient.invalidateQueries('me');
    } catch (e) {
      throw new Error(`something went wrong updating user: ${e.message}`);
    }
  }, [router, credentials, queryClient, token]);

  return (
    <LayoutPage className="m-auto bg-gradient-color1">
      <Head title="Welcome to Green Energy Data Platform" />
      <main className="min-h-screen flex flex-col h-full w-full m-auto pb-20">
        <Header />
        <div className="m-auto max-w-2xl flex flex-col flex-1 w-full justify-start  my-20 py-20 md:py-10 bg-white rounded-2.5xl lg:px-32 md:px-24 px-16 min-w-70 shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col items-start">
            <h2 className="text-3.5xl font-bold">Create a new Password</h2>
            <p className="py-7">Your new password must be different from previous used passwords.</p>
            <fieldset className="w-full text-xs">
              <label htmlFor="password" className="pb-10 tracking-tight text-grayProfile">
                <div className="relative my-3 p-2">
                  <Icon
                    ariaLabel="password"
                    name="password"
                    size="lg"
                    className="absolute -left-10"
                  />
                  <input
                    id="password"
                    name="password"
                    type={passwordView.password ? 'text' : 'password'}
                    className={cx('w-full bg-white placeholder-transparent placeholder-gray1 placeholder-opacity-20 overflow-ellipsis',
                      { 'text-grayProfile text-opacity-50': !credentials.password.length })}
                    onChange={(e) => handleChange('password', e)}
                    placeholder="Write a new password"
                  />
                  <Icon
                    ariaLabel="new password"
                    name={passwordView.password ? 'view' : 'hide'}
                    onClick={() => handlePasswordView('password')}
                    size="lg"
                    className={cx('absolute right-4 transform -translate-y-1/2 top-1/2 font-bold',
                      { 'text-grayProfile text-opacity-50': !credentials.password.length })}
                  />
                </div>
                <div className={cx('w-full h-0.7 rounded-sm bg-gray1 bg-opacity-20 mb-14',
                  { 'bg-gradient-color1': credentials.password.length })}
                />
              </label>
              <label htmlFor="password-confirmation" className="pb-10 tracking-tight text-grayProfile">
                <div className="relative my-3 p-2">
                  <Icon
                    ariaLabel="confirm password"
                    name="password"
                    size="lg"
                    className="absolute -left-10"
                  />
                  <input
                    id="confirmation"
                    name="confirmation"
                    type={passwordView.confirmation ? 'text' : 'password'}
                    className={cx('w-full bg-white placeholder-transparent placeholder-gray1 placeholder-opacity-20 overflow-ellipsis',
                      { 'text-grayProfile text-opacity-50': !credentials.confirmation.length })}
                    onChange={(e) => handleChange('confirmation', e)}
                    placeholder="Write a new password"
                  />
                  <Icon
                    ariaLabel="password confirmation"
                    name={passwordView.confirmation ? 'view' : 'hide'}
                    onClick={() => handlePasswordView('confirmation')}
                    size="lg"
                    className={cx('absolute right-4 transform -translate-y-1/2 top-1/2 font-bold',
                      { 'text-grayProfile text-opacity-50': !credentials.confirmation.length })}
                  />
                </div>
                <div className={cx('w-full h-0.7 rounded-sm bg-gray1 bg-opacity-20 mb-14',
                  { 'bg-gradient-color1': credentials.confirmation.length })}
                />
              </label>
              {passwordMismatch && (
                <p className="mb-14 text-warning">Your password confirmation did not match your password</p>
              )}
            </fieldset>
            <Button
              type="submit"
              aria-label="Sign in"
              theme="secondary"
              size="xlg"
              className="w-full bg-gray1 border-gray1 text-white text-sm"
            >
              {i18next.t('changePassword')}
            </Button>
          </form>
        </div>
      </main>
    </LayoutPage>
  );
};

export default NewPasswordPage;
