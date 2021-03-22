import React, {
  FC,
} from 'react';

import {
  signIn,
  signOut,
  useSession,
  getSession,
} from 'next-auth/client';

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
            signOut();
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

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default HomePage;
