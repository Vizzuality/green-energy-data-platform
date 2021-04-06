import React, {
  FC,
  ReactChildren,
} from 'react';

import cx from 'classnames';

// components
import Header from 'layout/header';

interface HeroProps {
  children: ReactChildren,
  className?: string,
}

const Hero: FC<HeroProps> = ({ children, className }: HeroProps) => (
  <div className="pb-44 bg-gradient-color1 text-white">
    <Header />
    <div className={cx('container m-auto px-32',
      { [className]: !!className })}
    >
      {children}
    </div>
  </div>
);

export default Hero;
