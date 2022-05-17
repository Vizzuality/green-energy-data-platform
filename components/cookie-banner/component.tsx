import React, { useState } from 'react';
import Link from 'next/link';

const CookieBanner: React.FC<{}> = () => {
  const [loadBanner, setLoadBanner] = useState(true);
  return (
    <>
      {
        loadBanner
        && (
          <div className="sticky bottom-0 z-10 flex justify-center w-full h-16 p-6 text-center bg-gray1">
            <p className="text-white">
              This site uses cookies to provide you with a great user experience.
              By using this platform, you accept our
              {' '}
              <Link href={{ pathname: '/' }} passHref>
                <a href="/" className="underline">use of cookies.</a>
              </Link>
            </p>

            <button type="button" onClick={() => setLoadBanner(false)} className="absolute text-white transform right-14 ">X</button>
          </div>
        )
      }
    </>
  );
};

export default CookieBanner;
