import React, {
  FC,
  useState,
  InputHTMLAttributes,
  FormEvent,
} from 'react';

import Link from 'next/link';

// components
import StaticPage from 'layout';
import Head from 'components/head';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {

}

type LoginProps = {
  onChange: (type: string, e: string) => void;
};

const LoginPage: FC<LoginProps> = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  }),

  const handleSubmit = (credentials): void => {
    console.log(credentials);
  };

  const handleChange = (type: string, e: FormEvent<HTMLInputElement>): void => {
    setCredentials({
      ...credentials,
      [type]: e.currentTarget.value,
    });
  };

  return (
    <StaticPage className="static-custom">
      <Head title="Welcome to Green Energy Data Platform" />
      <div className="inline-flex">
        <section>
          <h1>Sign in</h1>
          <p>Create an account to explore more about GEDP data insights</p>
          <p>Don't have an account?</p>
          <Link href={{ pathname: '/sign-up' }}>Sign up</Link>
        </section>
        <section className="inline-flex flex-col">
          <form>
            <label htmlFor="email">Your email is:</label>
            <input
              id="email"
              type="email"
              value={credentials.email}
              onChange={(e) => handleChange('email', e)}
              required
            />
            <label htmlFor="password">Enter your password:</label>
            <input
              id="password"
              type="password"
              value={credentials.password}
              onChange={(e) => handleChange('password', e)}
              required
            />
            <div>
              <button
                type="button"
                value="Log in"
                onClick={handleSubmit}
              >
                Access with this account
              </button>
            </div>
          </form>
        </section>
      </div>
    </StaticPage>
  )
};

export default LoginPage;
