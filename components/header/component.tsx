import React, {
  FC,
} from 'react';

// components
import Button from 'components/button';

interface HeaderProps {
  color: string
}

const Header: FC<HeaderProps> = ({ color }: HeaderProps) => (
  <div className={`flex justify-between items-center px-12 py-8 bg-${color}`}>
    <div>GEDP LOGO</div>
    <div className="flex items-center">
      <div>Welcome,<br/> Henry Mendoza</div>
      <Button theme="primary-background" size="lg" className="text-gray2">Browse all data</Button>
    </div>
  </div>
);

export default Header;
