import React, { useState } from 'react';
import Link from 'next/link';
import i18next from 'i18next';

const CookieBanner: React.FC<{}> = () => {
  const [loadBanner, setLoadBanner] = useState(true);

  return (
    <>
      {
        loadBanner
        && (
          <div className="sticky bottom-0 z-10 flex justify-center w-full h-16 p-6 text-center bg-gray1">
            <p className="absolute text-sm text-white left-14">
              {i18next.t('siteCookies')}
              {' '}
              <Link href={{ pathname: '/' }} passHref>
                <a href="/" className="underline">{i18next.t('useOfCookies')}</a>
              </Link>
            </p>

            <button type="button" onClick={() => setLoadBanner(false)} className="absolute text-lg text-white transform right-14">X</button>
          </div>
        )
      }
    </>
  );
};

export default CookieBanner;
