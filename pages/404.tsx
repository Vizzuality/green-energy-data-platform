import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// components
import LayoutPage from 'layout';
import Head from 'components/head';
import Button from 'components/button';
import i18next from 'i18next';
import { useRouter } from 'next/router';

const NotFoundPage: FC = () => {
  const { query: { locale } } = useRouter();

  // language keys
  const notFound = i18next.t('notFound');
  const notFoundMessage = i18next.t('notFoundMessage');
  const homepage = i18next.t('homepage');

  return (
    <LayoutPage className="min-h-screen text-white bg-color1">
      <Head title="Page not found" />
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
            <h1 className="pb-5 text-9xl">404</h1>
            <h2 className="text-3.5xl pb-5">{notFound}</h2>
            <p className="pb-10 text-lg">{notFoundMessage}</p>
            <div className="h-0.2 w-full bg-gradient-white mb-5" />
          </div>
          <div className="flex justify-center">
            <Link href={{ pathname: '/', query: { locale:  locale || 'en' } }} className="py-20">
              <Button theme="primary-background" size="xlg">
                {homepage}
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </LayoutPage>
  );
};

export default NotFoundPage;
