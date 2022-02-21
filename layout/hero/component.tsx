import React, {
  FC,
  ReactNode,
} from 'react';
import cx from 'classnames';
import Link from 'next/link';
import i18next from 'i18next';

import { useRouter } from 'next/router';

// components
import UserDropdown from 'components/user-dropdown';

import Header from 'layout/header';

interface HeroProps {
  children?: ReactNode,
  header?: boolean,
  rounded?: boolean,
  theme?: string,
  className?: string,
}

const THEME = {
  light: 'bg-gradient-color2 text-white',
  dark: 'bg-gray1',
  transparent: 'bg-transparent border-gray1 text-gray1 border-opacity-20',
};

const Hero: FC<HeroProps> = ({
  children,
  header = true,
  rounded = false,
  className,
  theme = 'light',
}: HeroProps) => {
  const { asPath } = useRouter();
  return (
    <div className={cx(`w-full ${THEME[theme]}`,
      { 'pb-44': !rounded },
      { 'rounded-t-2xl': !!rounded })}
    >
      {header && (
        <Header theme={theme === 'transparent' ? 'dark' : 'light'}>
          <div className="flex items-center">
            <UserDropdown theme={theme} className="mr-4" />
            <Link href={{ pathname: "/indicators", query: { fallbackUrl: encodeURIComponent(asPath) } }} passHref>
              <a
                href="/indicators"
                className={cx('ml-3 flex items-center justify-center text-center rounded-full focus:outline-none py-2.5 px-6 text-sm',
                  {
                    'bg-gray1 text-white': theme === 'transparent',
                    'bg-white text-gray1': theme !== 'transparent',
                  })}
              >
                {i18next.t('browse')}
              </a>
            </Link>
          </div>
        </Header>
      )}
      <div className={cx('max-w-6xl container m-auto',
        { [className]: !!className })}
      >
        {children}
      </div>
    </div>
  );
};

export default Hero;
