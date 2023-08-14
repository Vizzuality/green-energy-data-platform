import React, {
  FC,
} from 'react';
import Link from 'next/link';

// components
import LayoutPage from 'layout';
import Head from 'components/head';
import Header from 'layout/header';
import Icon from 'components/icon';

const SuccessEmailPage: FC<{ locale: 'en' | 'cn' }> = ({ locale }) => (
  <LayoutPage className="m-auto bg-gradient-color1">
    <Head title="Welcome to Green Energy Data Platform" />
    <main className="flex flex-col w-full h-full min-h-screen m-auto">
      <Header />
      <div className="flex flex-col items-center max-w-md pb-[300px] m-auto text-center text-white">
        <h2>Check your email</h2>
        <div className="my-20 bg-transparent border-2 border-white rounded-full">

          <Icon
            ariaLabel="success"
            name="check"
            size="xlg"
            className="stroke-white w-36 h-36"
          />
        </div>
        <p className="text-sm">We have sent you a reset password link on your registered email address.</p>
        <div className="h-0.2 bg-gradient-to-r from-color1 via-white to-color1 my-7 w-full" />
        <p className="text-sm">Did not receive the email? Check your spam filter, or try another email address.</p>
        <Link href={{ pathname: "/signin", query: { locale }}} className="my-7 w-full ml-3 bg-white border-white text-gray1 flex items-center justify-center text-center rounded-full focus:outline-none py-2.5 px-6 text-sm">
          Back to Sign in
        </Link>
      </div>
    </main>
  </LayoutPage>
);

export const getServerSideProps = async (context) => ({
  props: ({
    locale: context.query?.locale ?? 'en',
  }),
});

export default SuccessEmailPage;
