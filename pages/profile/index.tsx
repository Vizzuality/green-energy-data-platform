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
import toast from 'react-hot-toast';

// authentication
import { withAuthentication, withUser } from 'hoc/auth';
import { useMe } from 'hooks/auth';

// services
import { updateUser, deleteUser } from 'services/user';

// components
import LayoutPage from 'layout';
import Head from 'components/head';
import Hero from 'layout/hero';
import Icon from 'components/icon';
import Button from 'components/button';

// util
import { validateEmail } from 'utils';
import { useRouter } from 'next/router';

interface NewDetailProps {
  title?: string;
  name?: string;
  organisation?: string;
  email?: string;
  token: string;
  password?: string;
}

const ProfilePage: FC = () => {
  // language keys
  const profile = i18next.t('profile');
  const personalData = i18next.t('personalData');
  const titleLang = i18next.t('title');
  const nameLang = i18next.t('name');
  const organisationLang = i18next.t('organisation');
  const emailLang = i18next.t('email');
  const save = i18next.t('save');
  const changePassword = i18next.t('changePassword');
  const deleteWarning = i18next.t('deleteWarning');
  const deleteLang = i18next.t('delete');

  const queryClient = useQueryClient();
  const { isLoading, data: user } = useMe({
    refetchOnWindowFocus: false,
    placeholderData: {
      title: '',
      name: '',
      organisation: '',
      email: '',
    },
  });

  const {
    title: userTitle,
    email: userEmail,
    organisation: userOrganisation,
    name: userName,
    token: userToken,
  } = user;

  const router = useRouter();
  const { locale } = router.query;

  const [credentials, setCredentials] = useState({
    title: userTitle,
    name: userName,
    email: userEmail,
    organisation: userOrganisation,
    token: userToken,
    password: '',
    newPassword: '',
  });

  useEffect(() => {
    if (!isLoading) {
      setCredentials({
        title: userTitle,
        name: userName,
        organisation: userOrganisation,
        email: userEmail,
        token: userToken,
        password: '',
        newPassword: '',
      });
    }
  }, [isLoading, userTitle, userName, userOrganisation, userEmail, userToken]);

  const [isValid, setEmailVerification] = useState(false);

  const handleChange = (
    type: string,
    e: ChangeEvent<HTMLInputElement>,
  ): void => {
    if (type === 'email') {
      const verificationEmail = validateEmail(e.currentTarget.value);
      setEmailVerification(verificationEmail);
    }

    setCredentials({
      ...credentials,
      [type]: e.currentTarget.value,
    });
  };

  const submitNewDetails = async ({
    title,
    name,
    organisation,
    email,
    token,
    password,
  }: NewDetailProps) => updateUser(
    {
      title,
      name,
      organisation,
      email,
      password,
    },
    token,
  );

  const deleteUserAccount = async ({ token }) => deleteUser(token);

  const {
    title, name, organisation, email, token,
  } = credentials;

  const { mutate: mutateUserDetails } = useMutation(submitNewDetails, {
    onSuccess: () => {
      toast.success('Profile successfully updated!');
      queryClient.invalidateQueries('me');
    },
    onError: () => {
      const toastMessage = locale === 'cn'
        ? '出了点问题，请重试'
        : 'Something went wrong, please try again';
      toast.success(toastMessage);
      const message = locale === 'cn'
        ? '更新用户时出了点问题'
        : 'something went wrong updating user';
      throw new Error(message);
    },
  });

  const { mutate: mutateUserAccount } = useMutation(deleteUserAccount, {
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
      title,
      name,
      organisation,
      email,
      ...credentials,
    });

    if (token) {
      mutateUserDetails({
        title,
        name,
        organisation,
        token,
        email,
      });
    }
  };

  const handleDelete = useCallback(
    async (evt) => {
      evt.preventDefault();
      mutateUserAccount({ token });
    },
    [token, mutateUserAccount],
  );

  const handlePasswordChange = () => {
    router.push('recover-password');
  };

  return (
    <LayoutPage className="min-h-screen text-white bg-gradient-gray1">
      <Head title="Green Energy Data Platform" />
      <Hero className="px-8 lg:px-32 md:px-24 sm:px-16">
        <h1 className="text-5.5xl pt-3 text-left">{profile}</h1>
      </Hero>
      <div className="container m-auto bg-white rounded-2.5xl text-grayProfile divide-grayProfile divide-opacity-50 shadow -mt-40 divide-x flex px-10 max-w-[1200px]">
        <section className="flex flex-col w-1/2">
          <div className="flex flex-col flex-1 p-16">
            <h2 className="text-2.5xl font-bold">
              {personalData}
            </h2>
            <form
              onSubmit={handleSave}
              className="flex flex-col items-start pt-4"
            >
              <label
                htmlFor="title"
                className="w-full pb-6 text-xs tracking-tight uppercase text-grayProfile text-opacity-95"
              >
                {titleLang}
                <div className="relative p-2 mt-3 border border-opacity-50 rounded-sm border-grayProfile">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    defaultValue={user?.title}
                    className={cx(
                      'pl-10 w-full overflow-ellipsis text-sm text-grayProfile text-opacity-50',
                      { 'text-grayProfile text-opacity-100': title?.length },
                    )}
                    onChange={(e) => handleChange('title', e)}
                  />
                  <Icon
                    ariaLabel="mail-input"
                    name="profile"
                    size="lg"
                    className="absolute font-bold transform -translate-y-1/2 left-4 top-1/2"
                  />
                </div>
              </label>
              <label
                htmlFor="name"
                className="w-full pb-6 text-xs tracking-tight uppercase text-grayProfile text-opacity-95"
              >
                {nameLang}
                <div className="relative p-2 mt-3 border border-opacity-50 rounded-sm border-grayProfile">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    defaultValue={user?.name}
                    className={cx(
                      'pl-10 w-full overflow-ellipsis text-sm text-grayProfile text-opacity-50',
                      { 'text-grayProfile text-opacity-100': name?.length },
                    )}
                    onChange={(e) => handleChange('name', e)}
                  />
                  <Icon
                    ariaLabel="mail-input"
                    name="profile"
                    size="lg"
                    className="absolute font-bold transform -translate-y-1/2 left-4 top-1/2"
                  />
                </div>
              </label>
              <label
                htmlFor="organisation"
                className="w-full pb-6 text-xs tracking-tight uppercase text-grayProfile text-opacity-95"
              >
                {organisationLang}
                <div className="relative p-2 mt-3 border border-opacity-50 rounded-sm border-grayProfile">
                  <input
                    id="organisation"
                    name="organisation"
                    type="text"
                    defaultValue={user?.organisation}
                    className={cx(
                      'pl-10 w-full overflow-ellipsis text-sm text-grayProfile text-opacity-50',
                      {
                        'text-grayProfile text-opacity-100':
                          organisation?.length,
                      },
                    )}
                    onChange={(e) => handleChange('organisation', e)}
                  />
                  <Icon
                    ariaLabel="Organization"
                    name="Organization"
                    size="lg"
                    className="absolute font-bold transform -translate-y-1/2 left-4 top-1/2"
                  />
                </div>
              </label>
              <label
                htmlFor="email"
                className="w-full pb-2 text-xs tracking-tight text-opacity-50 uppercase text-grayProfile"
              >
                {emailLang}
                <div className="relative p-2 mt-3 bg-gray-100 rounded-sm">
                  <Icon
                    ariaLabel="mail-input"
                    name="mail"
                    size="lg"
                    className="absolute font-bold transform -translate-y-1/2 left-4 top-1/2 "
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Write your email account"
                    defaultValue={user?.email}
                    className="w-full pl-10 text-sm bg-gray-100 overflow-ellipsis text-grayProfile"
                    onChange={(e) => handleChange('email', e)}
                  />
                </div>
              </label>
              <Button
                type="submit"
                aria-label="Sign in"
                theme="secondary"
                className="py-20 mt-5 text-sm text-white bg-gray1 border-gray1"
                disabled={isValid}
              >
                {save}
              </Button>
            </form>
          </div>
        </section>
        <section className="flex flex-col w-1/2">
          <div className="flex flex-col flex-1 p-16">
            <h2 className="text-2.5xl font-bold">
              {changePassword}
            </h2>
            <div className="flex flex-col items-start max-w-[380px]">
              <p className="pt-4 pb-10 text-sm text-opacity-50 text-grayProfile">
                {deleteWarning}
              </p>
              <div className="flex justify-between w-full">
                <Button
                  type="button"
                  aria-label="delete account"
                  theme="warning"
                  className="flex text-sm justify-left w-max"
                  onClick={handleDelete}
                >
                  {deleteLang}
                </Button>
                <Button
                  type="button"
                  aria-label="Sign in"
                  theme="secondary"
                  onClick={handlePasswordChange}
                  className="py-20 text-sm text-white bg-gray1 border-gray1"
                >
                  {changePassword}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </LayoutPage>
  );
};

const customServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/signin?callbackUrl=/profile',
        permanent: false,
      },
    };
  }

  return {
    props: {
      locale: context.query?.locale ?? 'en',
    },
  };
};

export const getServerSideProps = withAuthentication(
  withUser(customServerSideProps),
);

export default ProfilePage;
