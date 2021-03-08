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
    <StaticPage className="h-screen static-custom p-10 bg-sign-up">
      <Head title="Welcome to Green Energy Data Platform" />
      <div className="inline-flex">
        <section className="text-white">
          <h1>Sign in</h1>
          <p>Create an account to explore more about GEDP data insights</p>
          <div className="w-full h-0.2 bg-gradient-to-r from-white to-white-50" />
          <p>Don&apos;t have an account?</p>
          <Link href={{ pathname: '/sign-up' }}>
            <a href="/sign-up" className="border rounded-lg border-white">Sign up</a>
          </Link>
        </section>
        <section className="bg-white rounded px-5 py-8">
          <form method="post" className="inline-flex flex-col p4">
            <input
              name="csrfToken"
              type="hidden"
              defaultValue={csrfToken}
              className="placeholder-gray-300 placeholder-opacity-50 border-gradient-to-r from-white to-white-50 focus:border-b-2"
            />
            <label htmlFor="email">
              Your email is:
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Write your email account"
                className="border-b-2"
                value={credentials.email}
                onChange={(e) => handleChange('email', e)}
                required
              />
            </label>
            <label htmlFor="password">
              Enter your password:
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Write the associated password"
                className="w-full placeholder-transparent border-b-2"
                value={credentials.password}
                onChange={(e) => handleChange('password', e)}
                required
              />
            </label>
            <a href="" className="underline">I don't remember my password</a>
            <div>
              <button
                type="submit"
                aria-label="Sign in"
                className="text-white border rounded-lg bg-black"
                onClick={(evt) => {
                  evt.preventDefault();
                  signIn('credentials');
                }}
              >
                Access with this account
              </button>
            </div>
          </form>
        </section>
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
