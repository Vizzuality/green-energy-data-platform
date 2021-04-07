import React, {
  FC,
  ReactElement,
} from 'react';

import cx from 'classnames';

// components
import Header from 'layout/header';

interface HeroProps {
  color: string,
  children: ReactElement[] | ReactElement,
  className?: string,
}

const Hero: FC<HeroProps> = ({ color, children, className }: HeroProps) => (
  <div className={`pb-44 bg-gradient-${color} text-white`}>
    <Header />
    <div className={cx('container m-auto px-32 py-8', { [className]: !!className })}>
      {children}
    </div>
  </div>
);

export default Hero;
