import React, {
  FC,
  useState,
  ChangeEvent,
} from 'react';
import cx from 'classnames';
import { getSession } from 'next-auth/client';

// authentication
import { withAuthentication, withUser } from 'hoc/auth';
import { useMe } from 'hooks/auth';

// components
import LayoutPage from 'layout';
import Head from 'components/head';
import Hero from 'layout/hero';
import Icon from 'components/icon';
import Button from 'components/button';

const ProfilePage: FC = () => {
  const { user } = useMe();
  const [passwordView, setPasswordVisibility] = useState({
    new: false,
    confirmation: false,
  });
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    new: '',
    confirmation: '',
  });

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

  return (
    <LayoutPage className="text-white bg-gradient-gray1">
      <Head title="Green Energy Data Platform" />
      <Hero>
        <h1 className="text-5.5xl pt-3">Profile</h1>
      </Hero>
      <div className="container m-auto bg-white rounded-2.5xl text-grayProfile divide-grayProfile divide-opacity-50 shadow-sm -mt-40 divide-x flex px-10">
        <section className="flex flex-col w-1/2">
          <div className="p-16 flex-1 flex flex-col justify-between">
            <form method="post" className="flex flex-col items-start">
              <label
                htmlFor="name"
                className="w-full text-xs pb-6 tracking-tight text-grayProfile text-opacity-95"
              >
                NAME
                <div className="relative my-3 p-2 rounded-sm border border-grayProfile border-opacity-50">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    defaultValue={user.name}
                    className={cx('pl-10 w-full overflow-ellipsis text-sm text-grayProfile text-opacity-50',
                      { 'text-grayProfile text-opacity-100': credentials.name.length })}
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
              <label htmlFor="email" className="w-full text-xs pb-2 tracking-tight text-grayProfile text-opacity-50">
                YOUR EMAIL IS
                <div className={cx('relative my-3 p-2 rounded-sm border border-grayProfile border-opacity-50',
                  { 'text-grayProfile text-opacity-100': credentials.email.length })}
                >
                  <Icon ariaLabel="mail-input" name="mail" size="lg" className="absolute left-4 transform -translate-y-1/2 top-1/2 font-bold" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Write your email account"
                    defaultValue={user.email}
                    className={cx('pl-10 w-full overflow-ellipsis text-sm text-grayProfile text-opacity-50',
                      { 'text-grayProfile text-opacity-100': credentials.email.length })}
                    onChange={(e) => handleChange('email', e)}
                  />

                </div>
              </label>
              <Button
                type="submit"
                aria-label="Sign in"
                className="py-20 bg-gray1 border-gray1 text-white text-sm"
                onClick={(evt) => {
                  evt.preventDefault();
                  console.log('saving changes');
                }}
              >
                Save Changes
              </Button>
            </form>
            <>
              <p className="text-grayProfile text-opacity-50 pb-10 text-sm">
                If you delete your account, please
                keep the following in mind: Your profile will be permenantly
                deleted, Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <Button
                type="button"
                aria-label="delete account"
                className="border-color-red text-color-red text-sm"
                onClick={(evt) => {
                  evt.preventDefault();
                  console.log('deleting account');
                }}
              >
                Delete account
              </Button>
            </>
          </div>
        </section>
        <section className="flex flex-col w-1/2">
          <div className="p-16 flex-1 flex flex-col justify-between">
            <form method="post" className="flex flex-col items-start">
              <h2 className="text-3.5xl font-bold">Change password</h2>
              <label
                htmlFor="password"
                className="w-full pt-10 tracking-tight text-grayProfile text-xs"
              >
                ENTER YOUR PASSWORD
                <div className="relative my-3 p-2 rounded-sm border border-grayProfile border-opacity-50">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className={cx('w-full overflow-ellipsis text-sm',
                      { 'text-grayProfile text-opacity-100': credentials.password.length })}
                    onChange={(e) => handleChange('password', e)}
                  />

                </div>
              </label>
              {/* TO - DO change href when it's ready */}
              <a href="/" className="underline pb-10 text-xs">I don&apos;t remember my password</a>
              <fieldset className="w-full text-xs">
                <label htmlFor="new-password" className="pb-10 tracking-tight text-grayProfile">
                  NEW PASSWORD
                  <div className="relative mb-8 my-3 p-2 rounded-sm border border-grayProfile border-opacity-50">
                    <input
                      id="new-password"
                      name="new-password"
                      type={passwordView.new ? 'text' : 'password'}
                      className={cx('w-full overflow-ellipsis text-sm',
                        { 'text-grayProfile text-opacity-50': !credentials.new.length })}
                      onChange={(e) => handleChange('new', e)}
                    />
                    <Icon
                      ariaLabel="new password"
                      name={passwordView.new ? 'view' : 'hide'}
                      onClick={() => handlePasswordView('new')}
                      size="lg"
                      className={cx('absolute right-4 transform -translate-y-1/2 top-1/2 font-bold',
                        { 'text-grayProfile text-opacity-50': !credentials.new.length })}
                    />
                  </div>
                </label>
                <label htmlFor="confirm-password" className="w-full text-xs py-10 tracking-tight text-grayProfile">
                  CONFIRM NEW PASSWORD
                  <div className="relative mb-8 my-3 p-2 rounded-sm border border-grayProfile border-opacity-50">
                    <input
                      id="confirm-password"
                      name="password"
                      type={passwordView.confirmation ? 'text' : 'password'}
                      className={cx('w-full overflow-ellipsis text-sm text-opacity-0',
                        { 'text-grayProfile text-opacity-50': !credentials.confirmation.length })}
                      onChange={(e) => handleChange('password', e)}
                    />
                    <Icon
                      ariaLabel="confirm password"
                      name={passwordView.confirmation ? 'view' : 'hide'}
                      onClick={() => handlePasswordView('confirmation')}
                      size="lg"
                      className={cx('absolute right-4 transform -translate-y-1/2 top-1/2 font-bold',
                        { 'text-grayProfile text-opacity-50': !credentials.confirmation.length })}
                    />
                  </div>
                </label>
              </fieldset>
              <Button
                type="submit"
                aria-label="Sign in"
                className="py-20 bg-gray1 border-gray1 text-white text-sm"
                onClick={(evt) => {
                  evt.preventDefault();
                  console.log('Changing password');
                }}
              >
                Change password
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
