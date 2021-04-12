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
    name: '',
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
    <LayoutPage className="bg-gradient-color1 h-screen">
      <Head title="Welcome to Green Energy Data Platform" />
      <main className="flex flex-col h-full w-full m-auto">
        <Header />
        <div className="flex items-center h-full flex-grow justify-center p-12 md:p-4">
          <section className="flex flex-col flex-grow justify-start py-20 md:py-10 max-w-xs text-white mx-20">
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
          <section className="flex flex-col flex-grow justify-start py-20 md:py-10 bg-white rounded-2.5xl px-28 md:px-14 min-w-70shadow-sm max-w-2xl">
            <form method="post" className="inline-flex flex-col flex-grow w-full">
              <input
                name="csrfToken"
                type="hidden"
                defaultValue={csrfToken}
                className="border-b-gradient-to-r from-white to-white-50 focus:border-b-2"
              />
              <div className="pb-6">
                <label htmlFor="name" className="text-2.5xl font-bold">
                  Your name is:
                  <div className="relative mb-10 sm:mb-4 font-normal">
                    <Icon ariaLabel="profile" name="profile" size="lg" className="absolute -left-10 transform -translate-y-1/2 top-1/2 font-bold" />
                    <input
                      id="name"
                      name="name"
                      type="name"
                      placeholder="Write your name account"
                      className={cx('w-full placeholder-gray1 placeholder-opacity-20',
                        { 'placeholder-opacity-100 font-bold': credentials.name.length })}
                      value={credentials.name}
                      onChange={(e) => handleChange('name', e)}
                      required
                    />
                    <div className={cx('w-full h-0.7 rounded-sm bg-gray1 bg-opacity-20 mb-10',
                      { 'bg-gradient-color2': credentials.password.length })}
                    />
                  </div>
                </label>
                <label htmlFor="email" className="text-2.5xl font-bold">
                  Your email is:
                  <div className="relative mb-10 sm:mb-4 font-normal">
                    <Icon ariaLabel="mail-input" name="mail" size="lg" className="absolute -left-10 transform -translate-y-1/2 top-1/2 font-bold" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Write your email account"
                      className={cx('w-full placeholder-gray1 placeholder-opacity-20',
                        { 'placeholder-opacity-100 font-bold': credentials.email.length })}
                      value={credentials.email}
                      onChange={(e) => handleChange('email', e)}
                      required
                    />
                    <div className={cx('w-full h-0.7 rounded-sm bg-gray1 bg-opacity-20 mb-10',
                      { 'bg-gradient-color2': credentials.password.length })}
                    />
                  </div>
                </label>
                <label htmlFor="password" className="text-2.5xl pb-10 font-bold">
                  Enter your password:
                  <div className="relative mb-10 sm:mb-4 font-normal">
                    <Icon ariaLabel="password-input" name="password" size="lg" className="absolute -left-10 transform -translate-y-1/2 top-1/2 font-bold" />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Write the associated password"
                      className={cx('w-full placeholder-gray1 placeholder-opacity-20 mb-10',
                        { 'placeholder-opacity-100 font-bold': credentials.password.length })}
                      value={credentials.password}
                      onChange={(e) => handleChange('password', e)}
                      required
                    />
                    <div className={cx('w-full h-0.7 rounded-sm bg-gray1 bg-opacity-20',
                      { 'bg-gradient-color2': credentials.password.length })}
                    />
                  </div>
                </label>
              </div>
              <Button
                type="submit"
                aria-label="Sign in"
                theme="secondary-background"
                size="xlg"
                onClick={(evt) => {
                  evt.preventDefault();
                  signIn('credentials');
                }}
              >
                Create account
              </Button>
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
        destination: context.query.callbackUrl || '/',
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
