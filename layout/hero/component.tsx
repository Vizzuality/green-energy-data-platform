import React, {
  FC,
  ReactNode,
} from 'react';
import cx from 'classnames';
import Link from 'next/link';

import { useSession } from 'next-auth/client';

// components
import Header from 'layout/header';
import UserDropdown from 'components/user-dropdown';
import SignIn from 'components/sign-in';

interface HeroProps {
  children: ReactNode,
  header?: boolean,
  rounded?: boolean,
  theme?: string,
  className?: string,
}

const THEME = {
  light: 'bg-gradient-color2 text-white',
  dark: 'bg-gray1',
};

const Hero: FC<HeroProps> = ({
  children,
  header = true,
  rounded = false,
  theme = 'light',
  className,
}: HeroProps) => {
  const [session, loading] = useSession();
  return (
    <div className={cx(`${THEME[theme]}`,
      { 'pb-44': !rounded },
      { 'rounded-2xl': !!rounded },
      { [className]: !!className })}
    >
      {header && (
        <Header>
          <div className="flex items-center">
            {session && <UserDropdown className="mr-4" />}
            {!session && !loading && <SignIn />}
            <Link href="/indicators" passHref>
              <a href="/indicators" className="ml-3 bg-white border-white text-gray1 flex items-center justify-center text-center rounded-full focus:outline-none py-2.5 px-6 text-sm">
                Browse all data
              </a>
            </Link>
          </div>
        </Header>
      )}
      <div className={cx('container m-auto px-32',
        { [className]: !!className })}
      >
        {children}
      </div>
    </div>
  );
};

export default Hero;
