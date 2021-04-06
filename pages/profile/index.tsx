import React, {
  FC,
  useState,
  InputHTMLAttributes,
  FormEvent,
} from 'react';
import cx from 'classnames';

import { useMe } from 'hooks/auth';

// components
import LayoutPage from 'layout';
import Head from 'components/head';
import Hero from 'layout/hero';
import Icon from 'components/icon';
import Button from 'components/button';

const ProfilePage: FC = () => {
  const { user } = useMe();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (type: string, e: FormEvent<InputHTMLAttributes<string>>): void => {
    setCredentials({
      ...credentials,
      [type]: e.currentTarget.value,
    });
  };

  return (
    <LayoutPage className="text-white bg-gradient-gray1">
      <Head title="Green Energy Data Platform" />
      <Hero>
        <h1 className="text-5.5xl">Profile</h1>
      </Hero>
      <div className="container m-auto bg-white rounded-2.5xl text-grayProfile divide-grayProfile divide-opacity-50 shadow-sm -mt-40 divide-x flex px-10">
        <section className="flex flex-col w-1/2">
          <div className="p-16 flex-1 flex flex-col justify-between">
            <form method="post" className="flex flex-col items-start">
              <label
                htmlFor="name"
                className="w-full text-sm pb-10 tracking-tight text-opacity-95"
              >
                NAME
                <div className="relative mb-8 border border-grayProfile rounded-sm p-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    defaultValue={'user.name'}
                    className="ml-10"
                    onChange={(e) => handleChange('name', e)}
                  />
                  <Icon ariaLabel="mail-input" name="mail" size="lg" className="absolute left-4 transform -translate-y-1/2 top-1/2 font-bold" />

                </div>
              </label>
              <label htmlFor="email" className="w-full text-sm pb-2 tracking-tight text-opacity-95">
                YOUR EMAIL IS
                <div className="relative mb-8 border border-grayProfile rounded-sm p-2">
                  <Icon ariaLabel="mail-input" name="mail" size="lg" className="absolute left-4 transform -translate-y-1/2 top-1/2 font-bold" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Write your email account"
                    defaultValue={'user.email'}
                    className="ml-10 "
                    onChange={(e) => handleChange('email', e)}
                  />

                </div>
              </label>
              <Button
                type="submit"
                aria-label="Sign in"
                className="py-20 bg-gray2 border-gray2 text-white"
                onClick={(evt) => {
                  evt.preventDefault();
                  console.log('saving changes');
                }}
              >
                Save Changes
              </Button>
            </form>
            <div>
              <p className="text-opacity-50 pb-10">
                If you delete your account, please keep the following in mind: Your profile will be permenantly deleted, Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <Button
                type="button"
                aria-label="delete account"
                className="py-20 border-color-red text-color-red"
                onClick={(evt) => {
                  evt.preventDefault();
                  console.log('deleting account');
                }}
              >
                Delete account
              </Button>
            </div>
          </div>
        </section>
        <section className="flex flex-col w-1/2">
          <div className="p-16 flex-1 flex flex-col justify-between">
            <form method="post" className="flex flex-col items-start">
              <h2 className="text-3.5xl font-bold">Change password</h2>
              <label
                htmlFor="email"
                className="w-full text-sm pt-10 tracking-tight text-opacity-5"
              >
                ENTER YOUR PASSWORD
                <div className="relative mb-4 border border-grayProfile rounded-sm p-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Write your email account"
                    onChange={(e) => handleChange('name', e)}
                  />

                </div>
              </label>
              <a href="" className="underline pb-10">I don&apos;t remember my password</a>
              <fieldset className="w-full">
                <label htmlFor="new-password" className="text-sm pb-10 tracking-tight text-opacity-95">
                  NEW PASSWORD
                  <div className="relative mb-8 border border-grayProfile rounded-sm p-2">
                    <input
                      id="new-password"
                      name="new-password"
                      type="password"
                      onChange={(e) => handleChange('email', e)}
                    />
                    <Icon ariaLabel="new password" name="mail" size="lg" className="absolute right-4 transform -translate-y-1/2 top-1/2 font-bold" />
                  </div>
                </label>
                <label htmlFor="confirm-password" className="w-full text-sm py-10 tracking-tight text-opacity-95">
                  CONFIRM NEW PASSWORD
                  <div className="relative mb-8 border border-grayProfile rounded-sm p-2">
                    <input
                      id="confirm-password"
                      name="password"
                      type="password"
                      onChange={(e) => handleChange('email', e)}
                    />
                    <Icon ariaLabel="confirm password" name="mail" size="lg" className="absolute right-4 transform -translate-y-1/2 top-1/2 font-bold" />
                  </div>
                </label>
              </fieldset>
              <Button
                type="submit"
                aria-label="Sign in"
                className="py-20 bg-gray2 border-gray2 text-white"
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

export default ProfilePage;
