import React, { FC } from 'react';
import Link from 'next/link';

// components
import LayoutPage from 'layout';
import Head from 'components/head';
import Button from 'components/images';

const ProfilePage: FC = () => (
  <LayoutPage className="text-white bg-color1">
    <Head title="Page not found" />
    <main className="flex flex-col h-full w-full m-auto flex-grow">
      <div className="container m-auto lg:px-10 p-4 w-full h-full flex flex-col flex-grow">
        <img alt="GEDP" src="/images/logo_GEDP.svg" className="w-28 h-auto" />
        <div className="flex flex-col p-10 items-center justify-around">
          <h1 className="text-9xl pb-5">404</h1>
          <h2 className="text-3.5xl pb-5">Oops, sorry we can’t find that page.</h2>
          <p className="text-lg pb-10">Either something went wrong or the page doesn’t exist anymore.</p>
          <div className="h-0.2 w-full bg-gradient-white mb-5" />
        </div>
        <div className="flex justify-center">
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
