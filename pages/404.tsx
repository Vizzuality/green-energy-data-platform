import React, { FC } from 'react';
import Link from 'next/link';

// components
import LayoutPage from 'layout';
import Head from 'components/head';
import Header from 'layout/header';
import Button from 'components/button';

const ProfilePage: FC = () => (
  <LayoutPage className="text-white bg-color1">
    <Head title="Green Energy Data Platform" />
    <main className="flex flex-col h-full w-full m-auto">
      <Header />

      <div className="m-auto h-full flex-1 py-20">
        <div className="flex flex-col px-10 items-center justify-around border-b border-b-gradient-white">
          <h1 className="text-9xl pb-10">404</h1>
          <h2 className="text-3.5xl pb-10">Oops, sorry we can’t find that page.</h2>
          <p className="text-lg pb-20">Either something went wrong or the page doesn’t exist anymore.</p>
          <div className="h-0.2 bg-gradient-white" />
        </div>
        <div className="flex justify-center py-10">
          <Link href="/">
            <Button theme="primary-background" size="xlg" className="py-20">
              Homepage
            </Button>
          </Link>
        </div>
      </div>
    </main>
  </LayoutPage>
);

export default ProfilePage;
