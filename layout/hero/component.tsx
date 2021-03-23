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
    <div className="container m-auto px-32">
      <Nav items={items} />
      <h1 className="text-5.25xl font-bold">Energy balance</h1>
    </div>
  </div>
);

export default Hero;
