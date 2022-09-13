import React, {
  FC,
  useState,
  FormEvent,
  useCallback,
  useRef,
} from 'react';
import Link from 'next/link';
import {
  getSession,
} from 'next-auth/client';
import cx from 'classnames';

import API from 'lib/api';

// components
import LayoutPage from 'layout';
import Head from 'components/head';
import Header from 'layout/header';
import Button from 'components/button';
import Icon from 'components/icon';
import i18next from 'i18next';
import router from 'next/router';

const SignupPage: FC = () => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    title: '',
    organization: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const passwordInputRef = useRef(null);
  const handleChange = (type: string, e: FormEvent<HTMLInputElement>): void => {
    setCredentials({
      ...credentials,
      [type]: e.currentTarget.value,
    });
  };
  const handleSubmit = useCallback(async (evt) => {
    evt.preventDefault();
    if (passwordInputRef?.current?.value.length < 6) {
      setErrorMessage('Your password must be at least 6 characters long');
      setTimeout(() => setErrorMessage(''), 3000);
    } else {
      try {
        const signUpResponse = await API
          .request({
            method: 'POST',
            url: '/users/signup',
            data: credentials,
          });
        if (signUpResponse.status === 201) {
          router.push('signin');
        }
      } catch (responseError) {
        const errorMge = responseError?.response?.data?.error;
        setErrorMessage(errorMge);
        setTimeout(() => setErrorMessage(''), 3000);
      }
    }
  }, [credentials]);

  return (
    <LayoutPage className="bg-gradient-color1">
      <Head title="Welcome to Green Energy Data Platform" />
      <main className="flex flex-col w-full h-full min-h-screen pb-20 m-auto">
        <Header />
        <div className="flex items-center justify-center flex-grow h-full max-w-5xl p-12 m-auto overflow-y-auto md:p-4">
          <section className="flex flex-col justify-start max-w-xs mx-20 text-white">
            <h1 className="text-5.5xl font-bold py-7 tracking-tight">{i18next.t('signup')}</h1>
            <p className="pb-20 text-lg">
              {i18next.t('createAccountLong')}
            </p>
            <div className="h-0.2 bg-gradient-to-r from-white to-white-50" />
            <p className="py-4">{i18next.t('registered')}</p>
            <Link href={{ pathname: '/signin' }} passHref>
              <a href="/signin" className="flex items-center justify-center text-center text-white bg-transparent border-2 border-white rounded-full hover:text-opacity-50 hover:border-opacity-50 active:bg-white active:text-black focus:outline-none">Sign in</a>
            </Link>
          </section>
          <section className="flex flex-col flex-grow justify-start py-20 md:py-10 bg-white rounded-2.5xl lg:px-20 md:px-24 px-0 min-w-70 shadow max-w-3xl">
            <form onSubmit={handleSubmit} className="inline-flex flex-col flex-grow w-full">
              <div className="pb-6">
                <label htmlFor="title" className="text-base font-bold">
                  {i18next.t('yourTitle')}
                  :
                  <div className="relative mt-3 mb-8 font-normal">
                    <Icon ariaLabel="title-input" name="title" size="lg" className="absolute font-bold transform -translate-y-1/2 -left-10 top-1/2" />
                    <input
                      id="title"
                      name="title"
                      type="title"
                      placeholder="Write your title Mr, Mrs..."
                      className={cx('w-full placeholder-gray1 placeholder-opacity-20 focus:placeholder-white',
                        { 'placeholder-opacity-100': credentials.title.length })}
                      value={credentials.title}
                      onChange={(e) => handleChange('title', e)}
                      required
                    />
                    <div className={cx('w-full h-0.7 rounded-sm bg-gray1 bg-opacity-20',
                      { 'bg-gradient-color1': credentials.password.length })}
                    />
                  </div>
                </label>
                <label htmlFor="name" className="text-base font-bold">
                  {i18next.t('yourName')}
                  :
                  <div className="relative mt-3 mb-8 font-normal">
                    <Icon
                      ariaLabel="profile"
                      name="profile"
                      size="lg"
                      className="absolute font-bold transform -translate-y-1/2 -left-10 top-1/2"
                    />
                    <input
                      id="name"
                      name="name"
                      type="name"
                      placeholder="Write your name account"
                      className={cx(
                        'w-full placeholder-gray1 placeholder-opacity-20 focus:placeholder-white',
                        { 'placeholder-opacity-100': credentials.name?.length },
                      )}
                      value={credentials.name}
                      onChange={(e) => handleChange('name', e)}
                      required
                    />
                    <div className={cx('w-full h-0.7 rounded-sm bg-gray1 bg-opacity-20',
                      { 'bg-gradient-color1': credentials.password.length })}
                    />
                  </div>
                </label>
                <label htmlFor="email" className="text-base font-bold">
                  {i18next.t('yourEmail')}
                  :
                  <div className="relative mt-3 mb-8 font-normal">
                    <Icon ariaLabel="mail-input" name="mail" size="lg" className="absolute font-bold transform -translate-y-1/2 -left-10 top-1/2" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Write your email account"
                      className={cx('w-full placeholder-gray1 placeholder-opacity-20 focus:placeholder-white',
                        { 'placeholder-opacity-100': credentials.email.length })}
                      value={credentials.email}
                      onChange={(e) => handleChange('email', e)}
                      required
                    />
                    <div className={cx('w-full h-0.7 rounded-sm bg-gray1 bg-opacity-20',
                      { 'bg-gradient-color1': credentials.password.length })}
                    />
                  </div>
                </label>
                <label htmlFor="organization" className="pb-10 text-base font-bold">
                  {i18next.t('yourOrganization')}
                  :
                  <div className="relative mt-3 mb-8 font-normal">
                    <Icon ariaLabel="organization-input" name="organization" size="lg" className="absolute font-bold transform -translate-y-1/2 -left-10 top-1/2" />
                    <input
                      id="organization"
                      name="organization"
                      type="organization"
                      placeholder="Write your organization name"
                      className={cx('w-full placeholder-gray1 placeholder-opacity-20 focus:placeholder-white',
                        { 'placeholder-opacity-100': credentials.organization.length })}
                      value={credentials.organization}
                      onChange={(e) => handleChange('organization', e)}
                      required
                    />
                    <div className={cx('w-full h-0.7 rounded-sm bg-gray1 bg-opacity-20',
                      { 'bg-gradient-color1': credentials.password.length })}
                    />
                  </div>
                </label>
                <label htmlFor="password" className="pb-10 text-base font-bold">
                  {i18next.t('enterPassword')}

                  <div className="relative mt-3 mb-5 font-normal">
                    <Icon ariaLabel="password-input" name="password" size="lg" className="absolute font-bold transform -translate-y-1/2 -left-10 top-1/2" />
                    <input
                      ref={passwordInputRef}
                      id="password"
                      name="password"
                      type={passwordVisibility ? 'text' : 'password'}
                      placeholder="Write the associated password"
                      className={cx('w-full placeholder-gray1 placeholder-opacity-20 focus:placeholder-white',
                        { 'placeholder-opacity-100': credentials.password.length })}
                      value={credentials.password}
                      onChange={(e) => handleChange('password', e)}
                      required
                    />
                    <Icon ariaLabel="password-input" name={passwordVisibility ? 'hide' : 'view'} size="lg" className="absolute font-bold transform -translate-y-1/2 opacity-25 -right-0 top-1/2" onClick={() => { setPasswordVisibility(!passwordVisibility); }} />
                    <div className={cx('w-full h-0.7 rounded-sm bg-gray1 bg-opacity-20',
                      { 'bg-gradient-color1': credentials.password.length })}
                    />
                  </div>
                </label>
                {!!errorMessage?.length && (
                  <p className="mb-8 text-warning">{errorMessage}</p>
                )}
                <label htmlFor="terms-conditions" className="flex flex-row-reverse items-center justify-end text-sm text-gray1">
                  <span>
                    {`${i18next.t('agreement')} `}

                    <Link href={{ pathname: '/terms-conditions' }} passHref>
                      <a href="/terms-conditions" className="underline">
                        {i18next.t('terms')}
                      </a>
                    </Link>
                  </span>
                  <input
                    id="terms-conditions"
                    name="terms-conditions"
                    type="checkbox"
                    className="mr-3 border border-gray1 appearance-none p-1.5 rounded-sm checked:bg-gray1 cursor-pointer"
                    required
                  />
                </label>
                <label htmlFor="privacy-policy" className="flex flex-row-reverse items-center justify-end text-sm mb-9 text-gray1">
                  <span>
                    {`${i18next.t('agreement')} `}
                    <Link href={{ pathname: '/privacy-policy' }} passHref>
                      <a href="/privacy-policy" className="underline">
                        {i18next.t('privacy')}
                      </a>
                    </Link>
                  </span>
                  <input
                    id="privacy-policy"
                    name="privacy-policy"
                    type="checkbox"
                    className="mr-3 border border-gray1 appearance-none p-1.5 rounded-sm checked:bg-gray1 cursor-pointer"
                    required
                  />
                </label>
              </div>
              <Button
                type="submit"
                aria-label="Sign in"
                theme="secondary-background-dark"
                size="xlg"
              >
                {i18next.t('createAccountShort')}
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
    props: ({}),
  });
};

export default SignupPage;
