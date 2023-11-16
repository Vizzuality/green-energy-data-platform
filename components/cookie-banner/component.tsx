import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import i18next from 'i18next';
import Icon from 'components/icon';

const CookieBanner: React.FC<{}> = () => {
  const [loadBanner, setLoadBanner] = useState(true);
  const siteCookies = i18next.t('siteCookies');
  return <>
    {
      loadBanner
      && (
        <div className="m-auto sticky items-center bottom-0 z-10 flex justify-between w-full h-16 text-center border-b border-white bg-gray1 border-opacity-10">
          <p className="py-2.5 inline flex-wrap px-32 h-full items-center justify-center m-auto w-full absolute text-sm text-white">
            {siteCookies}
          </p>

          <button
            type="button"
            className="absolute text-white right-14 top-1/2 -translate-y-[50%]"
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
  </>;
};

export default CookieBanner;
