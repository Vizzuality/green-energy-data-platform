import React, { useState } from 'react';
import Link from 'next/link';
import i18next from 'i18next';
import Icon from 'components/icon';

const CookieBanner: React.FC<{}> = () => {
  const [loadBanner, setLoadBanner] = useState(true);

  return (
    <>
      {
        loadBanner
        && (
          <div className="sticky bottom-0 z-10 flex justify-between w-full h-16 py-6 px-12 text-center border-b border-white bg-gray1 border-opacity-10">
            <p className="absolute text-sm text-white">
              {i18next.t('siteCookies')}
              {' '}
              <Link href={{ pathname: '/' }} passHref>
                <a href="/" className="underline">{i18next.t('useOfCookies')}</a>
              </Link>
            </p>

            <button
              type="button"
              className="absolute text-white right-14"
              onClick={() => setLoadBanner(false)}
            >
              <Icon
                ariaLabel="close"
                name="close"
                size="md"
              />
            </button>
          </div>
        )
      }
    </>
  );
};

export default CookieBanner;
