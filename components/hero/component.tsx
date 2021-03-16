import React, {
  FC,
} from 'react';

// components
import Nav from './nav';

interface NavigationItem {
  id: string,
  name: string,
  status: string,
  color: string,
}

interface HeroProps {
  color: string,
  items: NavigationItem[]
}

const Hero: FC<HeroProps> = ({ color, items }: HeroProps) => (
  <div className={`px-44 pb-44 bg-${color}`}>
    <Nav items={items} />
    <h1 className="text-5.25xl">Energy balance</h1>
    <p className="text-lg py-7.5">Metadata lorem ipsum sit amet. Donec ullamcorper nulla non metus
    auctor fringilla. Donec ullamcorper nulla non metus auctor fringilla. Vivamus sagittis lacus vel augue laoreet . Donec ullamcorper nulla non metus auctor fringilla.</p>
  </div>
);

export default Hero;
