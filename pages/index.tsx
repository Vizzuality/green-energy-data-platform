import React, {
  FC,
} from 'react';

import {
  signIn,
  signOut,
  useSession,
} from 'next-auth/client';

// authentication
import {
  withAuthentication,
  withUser,
} from 'hoc/auth';

// components
import LayoutPage from 'layout';
import Head from 'components/head';
import Footer from 'components/footer';

const HomePage: FC = () => {
  const [session] = useSession();

  return (
    <LayoutPage className="static-custom">
      <Head title="Welcome to Green Energy Data Platform" />
      <p className="text-green-600">Home</p>

      {(session) && (
        <button
          type="button"
          onClick={() => {
            signOut({ callbackUrl: 'http://localhost:3000/signin' });
          }}
        >
          Sign Out
        </button>
      )}

      {(!session) && (
        <button
          type="button"
          onClick={() => {
            signIn('credentials');
          }}
        >
          Sign In
        </button>
      )}
      <Footer />
    </LayoutPage>
  );
};

export const getServerSideProps = withAuthentication(withUser());

export default HomePage;
