import React, {
  FC,
  ReactNode,
} from 'react';
import cx from 'classnames';
import Link from 'next/link';

// components
import UserDropdown from 'components/user-dropdown';

// components
import Header from 'layout/header';

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
}: HeroProps) => (
  <div className={cx(`${THEME[theme]}`,
    { 'pb-44': !rounded },
    { 'rounded-2xl': !!rounded },
    { [className]: !!className })}
  >
    {header && (
      <Header>
        <div className="flex items-center">
          <UserDropdown className="mr-4" />
          <Link href="/indicators" passHref>
            <a href="/indicators" className="ml-3 bg-white border-white text-gray1 flex items-center justify-center text-center rounded-full focus:outline-none py-2.5 px-6 text-sm">
              Browse all data
            </a>
          </Link>
        </div>
      </Header>
    )}
    <div className={cx('container m-auto lg:px-32 md:px-20',
      { [className]: !!className })}
    >
      {children}
    </div>
  </div>
);

export default Hero;
