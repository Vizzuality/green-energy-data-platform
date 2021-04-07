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
import PreFooter from 'components/pre-footer';
import Hero from 'layout/hero';
import GroupCard from 'components/group-cards';

const HomePage: FC = () => {
  const [session] = useSession();

  return (
    <LayoutPage className="h-full">
      <Head title="Welcome to Green Energy Data Platform" />
      <Hero color="color1" className="flex flex-col text-center">
        <h1 className="text-5.5xl py-7.5">Discover data insights for a sustainable future.</h1>
        <h3 className="text-lg">Longer description about the site and benefits, lorem ipsum sit amet. Donec ullamcorper nulla non metus auctor fringilla.</h3>
      </Hero>
      <GroupCard className="container m-auto" />
      <PreFooter />

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
    </LayoutPage>
  );
};

export const getServerSideProps = withAuthentication(withUser());

export default HomePage;
