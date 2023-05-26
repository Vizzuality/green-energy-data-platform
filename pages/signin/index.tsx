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
import { passwordRecovery } from 'services/user';
import router from 'next/router';
import { validateEmail } from 'utils';

import type { Language } from 'types/data';

type SigninProps = {
  csrfToken?: string,
};

const SigninPage: FC<SigninProps & Language> = ({
  csrfToken,
  locale
}: SigninProps & Language) => {
  // language keys
  const signin = i18next.t('signin');
  const dontHaveAccount = i18next.t('dontHaveAccount');
  const signup = i18next.t('signup');
  const yourEmail = i18next.t('yourEmail');
  const enterPassword = i18next.t('enterPassword');
  const dontRememberPassword = i18next.t('dontRememberPassword');
  const accessAccount = i18next.t('accessAccount');
  const forgotPassword = i18next.t('forgotPassword');
  const recoveryPasswordRequirements = i18next.t('recoveryPasswordRequirements');
  const resetLink = i18next.t('resetLink');
  
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [isValid, setEmailVerification] = useState(false);

  const [isRecovery, setRecovery] = useState(false);

  const [isPasswordFailed, setPasswordFailed] = useState(false);

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
      redirect: false,
      email,
      password,
    }).then((res) => {
      const { error }: any = res;
      if (error) setPasswordFailed(true);
      else router.push('/');
    });
  }, [credentials]);

  const handleRecoveryEmail = (e: FormEvent<HTMLInputElement>): void => {
    const verificationEmail = validateEmail(e.currentTarget.value);
    setEmailVerification(verificationEmail);
    setRecoveryEmail(e.currentTarget.value);
  };

  const toggleRecovery = () => {
    setRecovery(!isRecovery);
  };

  const handleRequestResetLink = async () => {
    await passwordRecovery(recoveryEmail);
    router.push('email-success');
  };

  return (
    <LayoutPage className="bg-gradient-color1">
      <Head title="Welcome to Green Energy Data Platform" />
      <main className="flex flex-col w-full h-full min-h-screen pb-20 m-auto">
        <Header />
        <div className="flex items-center justify-center flex-1 h-full max-w-6xl p-12 m-auto">
          <section className="flex flex-col justify-between flex-1 w-full h-full max-w-xs mx-20 text-white">
            <h1 className="text-5.5xl font-bold pt-7 tracking-tight">{signin}</h1>
            <img alt="Sign-up" src="/images/signup.svg" className="py-3" />
            <div className="h-0.2 bg-gradient-to-r from-white to-white-50" />
            <p className="mt-10">{dontHaveAccount}</p>
            <div className="py-4">
              <Link href={{ pathname: '/signup', query: { locale } }} className="border-2 border-white bg-transparent text-white hover:text-opacity-50 hover:border-opacity-50 active:bg-white active:text-black py-0.5 px-4 text-center rounded-full focus:outline-none">
                {signup}
              </Link>
            </div>
          </section>
          <section className="flex flex-col flex-1 w-full justify-start py-20 md:py-10 bg-white rounded-2.5xl lg:px-32 md:px-24 px-16 min-w-70 shadow-sm">
            {!isRecovery && (
              <form onSubmit={handleSubmit} className="inline-flex flex-col flex-1 w-full">
                <input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                  className="border-b-gradient-to-r from-white to-white-50 focus:border-b-2"
                />
                <div className="pb-6">
                  <label htmlFor="email" className="text-2.5xl font-bold">
                    {yourEmail}
                    :
                    <div className="relative mb-10 font-normal sm:mb-4">
                      <Icon ariaLabel="mail-input" name="mail" size="lg" className="absolute font-bold transform -translate-y-1/2 -left-10 top-1/2" />
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
                    {enterPassword}
                    :
                    <div className="relative mb-10 font-normal sm:mb-4">
                      <Icon ariaLabel="password-input" name="password" size="lg" className="absolute font-bold transform -translate-y-1/2 -left-10 top-1/2" />
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
                        {
                          'bg-gradient-color1': credentials.password.length && !isPasswordFailed,
                          'bg-red-100': !!isPasswordFailed,
                        })}
                      />
                    </div>
                    {isPasswordFailed && <div className="font-sans text-xs font-light text-red-100">THE PASSWORD DOESN&apos;T MATCH THE EMAIL</div>}
                  </label>
                  <button
                    type="button"
                    className="w-full text-xs text-right underline"
                    onClick={toggleRecovery}
                  >
                    {dontRememberPassword}
                  </button>
                </div>
                <Button
                  type="submit"
                  aria-label="Log in"
                  theme="secondary-background-dark"
                  size="xlg"
                >
                  {accessAccount}
                </Button>
              </form>
            )}

            {isRecovery && (
              <div className="inline-flex flex-col justify-between flex-1 w-full min-h-1/2">
                <div className="relative justify-items-start">
                  <Icon ariaLabel="back-button" name="arrow" size="lg" className="absolute font-bold transform rotate-180 -left-10 top-3" onClick={toggleRecovery} />
                  <p className="text-2.5xl font-bold py-1">{forgotPassword}</p>
                  <p>
                    {recoveryPasswordRequirements}
                    .
                  </p>
                  <div className="py-6">
                    <label htmlFor="email" className="text-2.5xl font-bold">
                      <div className="relative mb-10 font-normal sm:mb-4">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Write your email"
                          className={cx('w-full placeholder-gray1 placeholder-opacity-20',
                            { 'placeholder-opacity-100': recoveryEmail.length })}
                          value={recoveryEmail}
                          onChange={(e) => handleRecoveryEmail(e)}
                          required
                        />
                        <div className={cx('w-full h-0.7 rounded-sm bg-gray1 bg-opacity-20 mb-4',
                          { 'bg-gradient-color1': recoveryEmail.length })}
                        />
                      </div>
                    </label>
                  </div>

                </div>

                <Button
                  type="button"
                  aria-label="Log in"
                  theme={isValid ? 'secondary-background-dark' : 'border-dark'}
                  size="xlg"
                  disabled={!isValid}
                  onClick={handleRequestResetLink}
                >
                  {resetLink}
                </Button>
              </div>
            )}
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
      locale: context.query?.locale ?? 'en',
    },
  });
};

export default SigninPage;
