import React, { FC } from 'react';

import LayoutPage from 'layout';

// next
import Link from 'next/link';
import Image from 'next/image';

// components
import Head from 'components/head';
import Button from 'components/button';
import i18next from 'i18next';

import { useRouter } from 'next/router';

export const ErrorPage: FC = () => {
  // language keys
  const error = i18next.t('error');
  const errorMessage = i18next.t('errorMessage');
  const homepage = i18next.t('homepage');

  const { query: { locale } } = useRouter();
  return (
    <LayoutPage className="text-white bg-color1">
      <Head title="Error" />
      <main className="flex flex-col flex-grow w-full h-full m-auto">
        <div className="container flex flex-col flex-grow p-4 m-auto lg:px-10">
          <div className="w-full relative h-[100px]">
            <Image
              alt="GEDP"
              src="/images/logo_GEDP.svg"
              fill
              loading="lazy"
            />
          </div>
          <div className="flex flex-col items-center justify-around p-10">
            <h1 className="pb-5 text-9xl">{error}</h1>
            <h2 className="text-3.5xl pb-5">
              {errorMessage}
              .
            </h2>
            <div className="h-0.2 w-full bg-gradient-white mb-5" />
          </div>
          <div className="flex justify-center">
            <Link href={{ pathname: '/', query: { locale } }}>
              <Button theme="primary-background" size="xlg" className="py-20">
                {homepage}
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </LayoutPage>
  );
};

export default ErrorPage;
