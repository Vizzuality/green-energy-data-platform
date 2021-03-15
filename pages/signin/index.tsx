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

// components
import StaticPage from 'layout/static-page';
import Head from 'components/head';
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
    <StaticPage className="h-screen static-custom p-10 bg-sign-in bg-cover">
      <Head title="Welcome to Green Energy Data Platform" />
      <div className="flex flex-col h-full">
        <div>GEDP LOGO</div>
        <div className="flex p-1 justify-center m-auto items-center">
          <section className="flex flex-col text-white bold py-24 mr-20 justify-start h-full max-w-xs">
            <h1 className="text-5xl bold  py-7">Sign in</h1>
            <p className="text-lg pb-40">Create an account to explore more about GEDP data insights</p>
            <div className="w-full h-0.2 bg-gradient-to-r from-white to-white-50" />
            <p className="mt-10">Don&apos;t have an account?</p>
            <div className="py-10">
              <Link href={{ pathname: '/sign-up' }}>
                <Button theme="primary">Sign up</Button>
              </Link>
            </div>
          </section>
          <section className="bg-white rounded-2.5xl p-10 md:p-24 min-w-70">
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
                  <Icon ariaLabel="email-input" name="email" size="lg" className="absolute -left-44 transform -translate-y-1/2 top-1/2 bold" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Write your email account"
                    className="w-full border-b-2 placeholder-gray-300 placeholder-opacity-50 "
                    value={credentials.email}
                    onChange={(e) => handleChange('email', e)}
                    required
                  />
                </div>
              </label>
              <label htmlFor="password" className="text-2.5xl py-10">
                Enter your password:
                <div className="relative">
                  <Icon ariaLabel="password-input" name="password" size="lg" className="absolute -left-44 transform -translate-y-1/2 top-1/2 bold" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Write the associated password"
                    className="w-full border-b-2 placeholder-gray-300 placeholder-opacity-50 "
                    value={credentials.password}
                    onChange={(e) => handleChange('password', e)}
                    required
                  />
                </div>
              </label>
              <a href="" className="underline pb-10">I don&apos;t remember my password</a>
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
            </form>
          </section>
        </div>
      </div>
    </StaticPage>
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
