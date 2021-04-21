import React, { FC } from 'react';

import cx from 'classnames';

// components
import Header from 'layout/header';

interface HeroProps {
  children: any, // TO DO - review children: ReactChildren | ReactElement<any, string> & ReactNode,
  className?: string,
}

const Hero: FC<HeroProps> = ({ children, className }: HeroProps) => (
  <div className="pb-44 bg-gradient-color2 text-white">
    <Header className="border-b border-white border-opacity-30" />
    <div className={cx('container m-auto px-32',
      { [className]: !!className })}
    >
      {children}
    </div>
  </div>
);

export default Hero;
