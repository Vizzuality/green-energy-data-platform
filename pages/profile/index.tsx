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
    <LayoutPage className="text-white bg-gradient-gray1 min-h-screen">
      <Head title="Green Energy Data Platform" />
      <Hero className="lg:px-32 md:px-24 sm:px-16 px-8">
        <h1 className="text-5.5xl pt-3 text-left">{i18next.t('profile')}</h1>
      </Hero>
      <div className="container m-auto bg-white rounded-2.5xl text-grayProfile divide-grayProfile divide-opacity-50 shadow -mt-40 divide-x flex px-10 max-w-[1200px]">
        <section className="flex flex-col w-1/2">
          <div className="p-16 flex-1 flex flex-col">
            <h2 className="text-2.5xl font-bold">
              {i18next.t('personalData')}
            </h2>
            <form
              onSubmit={handleSave}
              className="flex flex-col items-start pt-4"
            >
              <label
                htmlFor="title"
                className="uppercase w-full text-xs pb-6 tracking-tight text-grayProfile text-opacity-95"
              >
                {i18next.t('title')}
                <div className="relative mt-3 p-2 rounded-sm border border-grayProfile border-opacity-50">
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
                    className="absolute left-4 transform -translate-y-1/2 top-1/2 font-bold"
                  />
                </div>
              </label>
              <label
                htmlFor="name"
                className="uppercase w-full text-xs pb-6 tracking-tight text-grayProfile text-opacity-95"
              >
                {i18next.t('name')}
                <div className="relative mt-3 p-2 rounded-sm border border-grayProfile border-opacity-50">
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
                    className="absolute left-4 transform -translate-y-1/2 top-1/2 font-bold"
                  />
                </div>
              </label>
              <label
                htmlFor="organisation"
                className="uppercase w-full text-xs pb-6 tracking-tight text-grayProfile text-opacity-95"
              >
                {i18next.t('organisation')}
                <div className="relative mt-3 p-2 rounded-sm border border-grayProfile border-opacity-50">
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
                    className="absolute left-4 transform -translate-y-1/2 top-1/2 font-bold"
                  />
                </div>
              </label>
              <label
                htmlFor="email"
                className="uppercase w-full text-xs pb-2 tracking-tight text-grayProfile text-opacity-50"
              >
                {i18next.t('email')}
                <div className="bg-gray-100  relative mt-3 p-2 rounded-sm">
                  <Icon
                    ariaLabel="mail-input"
                    name="mail"
                    size="lg"
                    className="absolute left-4 transform -translate-y-1/2 top-1/2 font-bold "
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Write your email account"
                    defaultValue={user?.email}
                    className="bg-gray-100 pl-10 w-full overflow-ellipsis text-sm text-grayProfile"
                    onChange={(e) => handleChange('email', e)}
                  />
                </div>
              </label>
              <Button
                type="submit"
                aria-label="Sign in"
                theme="secondary"
                className="py-20 mt-5 bg-gray1 border-gray1 text-white text-sm"
                disabled={isValid}
              >
                {i18next.t('save')}
              </Button>
            </form>
          </div>
        </section>
        <section className="flex flex-col w-1/2">
          <div className="p-16 flex-1 flex flex-col">
            <h2 className="text-2.5xl font-bold">
              {i18next.t('changePassword')}
            </h2>
            <div className="flex flex-col items-start max-w-[380px]">
              <p className="text-grayProfile text-opacity-50 pb-10 text-sm pt-4">
                {i18next.t('deleteWarning')}
              </p>
              <div className="flex w-full justify-between">
                <Button
                  type="button"
                  aria-label="delete account"
                  theme="warning"
                  className="flex justify-left text-sm w-max"
                  onClick={handleDelete}
                >
                  {i18next.t('delete')}
                </Button>
                <Button
                  type="button"
                  aria-label="Sign in"
                  theme="secondary"
                  onClick={handlePasswordChange}
                  className="py-20 bg-gray1 border-gray1 text-white text-sm"
                >
                  {i18next.t('changePassword')}
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
    props: {},
  };
};

export const getServerSideProps = withAuthentication(
  withUser(customServerSideProps),
);

export default ProfilePage;
