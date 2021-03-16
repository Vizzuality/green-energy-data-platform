import React, {
  FC,
  useState,
  InputHTMLAttributes,
  FormEvent,
} from 'react';
import Link from 'next/link';
import {
  csrfToken as getCSRFToken,
  signIn,
  getSession,
} from 'next-auth/client';
import cx from 'classnames';

// components
import LayoutPage from 'layout';
import Head from 'components/head';
import Header from 'layout/header';
import Button from 'components/button';
import Icon from 'components/icon';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

type LoginProps = {
  onChange: (type: string, e: string) => void;
  csrfToken?: string,
};

const SigninPage: FC<LoginProps> = ({
  csrfToken,
}) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (type: string, e: FormEvent<HTMLInputElement>): void => {
    setCredentials({
      ...credentials,
      [type]: e.currentTarget.value,
    });
  };

  return (
    <LayoutPage className="h-screen bg-sign-in bg-cover">
      <Head title="Welcome to Green Energy Data Platform" />
      <main className="flex flex-col w-full h-full container m-auto">
        <Header />
        <div className="flex items-center justify-center h-full p-12">
          <section className="flex flex-col flex-grow h-full justify-start py-20 max-w-xs text-white mx-20">
            <h1 className="text-5xl font-bold py-7">Sign in</h1>
            <p className="text-lg pb-44">Create an account to explore more about GEDP data insights</p>
            <div className="h-0.2 bg-gradient-to-r from-white to-white-50" />
            <p className="mt-10">Don&apos;t have an account?</p>
            <div className="py-10">
              <Link href={{ pathname: '/sign-up' }}>
                <Button theme="primary">Sign up</Button>
              </Link>
            </div>
          </section>
<<<<<<< HEAD
          <section className="flex flex-col flex-grow bg-white rounded-2.5xl py-44 px-14 md:px-28 min-w-70shadow-sm max-w-2xl">
=======
          <section className="flex flex-col flex-grow bg-white rounded-2.5xl py-44 px-14 md:px-28 min-w-70shadow-sm">
>>>>>>> bottom gradient in sign in
            <form method="post" className="inline-flex flex-col min-w-64">
              <input
                name="csrfToken"
                type="hidden"
                defaultValue={csrfToken}
                className="border-b-gradient-to-r from-white to-white-50 focus:border-b-2"
              />
              <label htmlFor="email" className="text-2.5xl py-10">
                Your email is:
                <div className="relative">
                  <Icon ariaLabel="mail-input" name="mail" size="lg" className="absolute -left-10 transform -translate-y-1/2 top-1/2 font-bold" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Write your email account"
                    className={cx('w-full placeholder-gray2 placeholder-opacity-20',
                      { 'placeholder-opacity-100 font-bold': credentials.email.length })}
                    value={credentials.email}
                    onChange={(e) => handleChange('email', e)}
                    required
                  />
                  <div className={cx('w-full h-0.7 rounded-sm bg-gray2 bg-opacity-20',
                    { 'bg-sign-in-gradient': credentials.password.length })}
                  />
                </div>
              </label>
              <label htmlFor="password" className="text-2.5xl py-10">
                Enter your password:
                <div className="relative">
                  <Icon ariaLabel="password-input" name="password" size="lg" className="absolute -left-10 transform -translate-y-1/2 top-1/2 font-bold" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Write the associated password"
                    className={cx('w-full placeholder-gray2 placeholder-opacity-20',
                      { 'placeholder-opacity-100 font-bold': credentials.password.length })}
                    value={credentials.password}
                    onChange={(e) => handleChange('password', e)}
                    required
                  />
                  <div className={cx('w-full h-0.7 rounded-sm bg-gray2 bg-opacity-20',
                    { 'bg-sign-in-gradient': credentials.password.length })}
                  />
                </div>
              </label>
              <a href="" className="underline pb-10">I don&apos;t remember my password</a>
              {credentials.email && credentials.password && (
                <Button
                  type="submit"
                  aria-label="Sign in"
                  theme="secondary-background"
                  className="w-full py-20 bg-gray2 border-gray2 text-white"
                  onClick={(evt) => {
                    evt.preventDefault();
                    signIn('credentials');
                  }}
                >
                  Access with this account
                </Button>
              )}
            </form>
          </section>
        </div>
      </main>
    </LayoutPage>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return ({
    props: {
      csrfToken: await getCSRFToken(context),
    },
  });
};

export default SigninPage;
