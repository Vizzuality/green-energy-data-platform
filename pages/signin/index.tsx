import React, {
  FC,
  useState,
  FormEvent,
  useCallback,
} from 'react';
import Link from 'next/link';
import {
  csrfToken as getCSRFToken,
  signIn,
  getSession,
} from 'next-auth/client';
import cx from 'classnames';

import i18next from 'i18next';

// components
import LayoutPage from 'layout';
import Head from 'components/head';
import Header from 'layout/header';
import Button from 'components/button';
import Icon from 'components/icon';

type SigninProps = {
  csrfToken?: string,
};

const SigninPage: FC<SigninProps> = ({
  csrfToken,
}: SigninProps) => {
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

  const handleSubmit = useCallback(async (evt) => {
    evt.preventDefault();
    const {
      email,
      password,
    } = credentials;

    signIn('email-password', {
      email,
      password,
    });
  }, [credentials]);

  return (
    <LayoutPage className="bg-gradient-color1">
      <Head title="Welcome to Green Energy Data Platform" />
      <main className="flex flex-col h-full w-full m-auto">
        <Header />
        <div className="flex items-center h-full flex-1 justify-center p-12 md:p-4 m-auto">
          <section className="flex flex-col flex-1 w-full h-full justify-between py-20 md:py-10 max-w-xs text-white mx-20">
            <h1 className="text-5.5xl font-bold pt-7 tracking-tight">Sign in</h1>
            <img alt="Sign-up" src="/images/signup.svg" className="py-3" />
            <div className="h-0.2 bg-gradient-to-r from-white to-white-50" />
            <p className="mt-10">Don&apos;t have an account?</p>
            <div className="py-4">
              <Link href={{ pathname: '/signup' }} passHref>
                <a
                  href="/signup"
                  className="border-2 border-white bg-transparent text-white hover:text-opacity-50 hover:border-opacity-50 active:bg-white active:text-black py-0.5 px-4 text-center rounded-full focus:outline-none"
                >
                  Sign up
                </a>
              </Link>
            </div>
          </section>
          <section className="flex flex-col flex-1 w-full justify-start py-20 md:py-10 bg-white rounded-2.5xl lg:px-32 md:px-24 sm:px-16 min-w-70 shadow-sm">
            <form onSubmit={handleSubmit} className="inline-flex flex-col flex-1 w-full">
              <input
                name="csrfToken"
                type="hidden"
                defaultValue={csrfToken}
                className="border-b-gradient-to-r from-white to-white-50 focus:border-b-2"
              />
              <div className="pb-6">
                <label htmlFor="email" className="text-2.5xl font-bold">
                  Your email is:
                  <div className="relative mb-10 sm:mb-4 font-normal">
                    <Icon ariaLabel="mail-input" name="mail" size="lg" className="absolute -left-10 transform -translate-y-1/2 top-1/2 font-bold" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Write your email account"
                      className={cx('w-full bg-white placeholder-transparent placeholder-gray1 placeholder-opacity-20 overflow-ellipsis',
                        { 'placeholder-opacity-100': credentials.email.length })}
                      value={credentials.email}
                      onChange={(e) => handleChange('email', e)}
                      required
                    />
                    <div className={cx('w-full h-0.7 rounded-sm bg-gray1 bg-opacity-20 mb-10',
                      { 'bg-gradient-color1': credentials.password.length })}
                    />
                  </div>
                </label>
                <label htmlFor="password" className="text-2.5xl font-bold">
                  Enter your password:
                  <div className="relative mb-10 sm:mb-4 font-normal">
                    <Icon ariaLabel="password-input" name="password" size="lg" className="absolute -left-10 transform -translate-y-1/2 top-1/2 font-bold" />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Write the associated password"
                      className={cx('w-full placeholder-gray1 placeholder-opacity-20',
                        { 'placeholder-opacity-100': credentials.password.length })}
                      value={credentials.password}
                      onChange={(e) => handleChange('password', e)}
                      required
                    />
                    <div className={cx('w-full h-0.7 rounded-sm bg-gray1 bg-opacity-20 mb-4',
                      { 'bg-gradient-color1': credentials.password.length })}
                    />
                  </div>
                </label>
                <div className="">
                  <a href="/" className="w-full flex justify-end underline text-xs">I don&apos;t remember my password</a>
                </div>
              </div>
              <Button
                type="submit"
                aria-label="Log in"
                theme="secondary-background-dark"
                size="xlg"
              >
                {i18next.t('accessAccount')}
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
