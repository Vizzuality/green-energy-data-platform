import React, {
  FC,
} from 'react';

// components
import Header from 'layout/header';
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
  <div className={`pb-44 bg-gradient-${color}`}>
    <Header />
    <div className="container m-auto px-32 py-4">
      <Nav items={items} />
      <h1 className="text-5.5xl font-bold">Green Energy Data Platform</h1>
      <p className="text-lg py-7.5">Metadata lorem ipsum sit amet. Donec ullamcorper nulla non metus
      auctor fringilla. Donec ullamcorper nulla non metus auctor fringilla. Vivamus sagittis lacus vel augue laoreet . Donec ullamcorper nulla non metus auctor fringilla.</p>
    </div>
  </div>
);

export default Hero;
