import React, {
  FC,
} from 'react';

// components
import LogIn from 'components/log-in';
import Button from 'components/button';

interface HeaderProps {
  color?: string,
  user?: string
}

const Header: FC<HeaderProps> = ({
  color,
  user,
}: HeaderProps) => (
  <div className={`flex justify-between items-center px-12 py-8 bg-${color}`}>
    <div className="text-white text-xl font-bold">GEDP LOGO</div>
    {(
      <div className="flex items-center">
        <LogIn user="Henri Mendoza" />
        <Button theme="primary-background" size="xlg" className="text-gray2">Browse all data</Button>
      </div>
    )}
  </div>
);

export default Header;
