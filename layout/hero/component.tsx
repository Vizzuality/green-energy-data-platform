import React, {
  FC,
  ReactNode,
} from 'react';

import cx from 'classnames';

// components
import UserDropdown from 'components/user-dropdown';
import Button from 'components/button';

// components
import Header from 'layout/header';

interface HeroProps {
  children: ReactNode,
  header?: boolean,
  rounded?: boolean,
  className?: string,
}

const Hero: FC<HeroProps> = ({
  children,
  header = true,
  rounded = false,
  className,
}: HeroProps) => (
  <div className={cx(
    'bg-gradient-color2 text-white',
    { 'pb-44': !rounded },
    { 'rounded-2xl': !!rounded },
  )}
  >
    {header && (
      <Header>
        <div className="flex items-center">
          <UserDropdown className="mr-4" />
          <Button className="ml-3" theme="primary-background" size="xlg">Browse all data</Button>
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

export default Hero;
