import React, {
  FC,
} from 'react';

// components
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
    {user && (
      <div className="flex items-center">
        <p className="mr-6.5">
          Welcome,
          <br />
          {user}
        </p>
        <Button theme="primary-background" size="xlg" className="text-gray2">Browse all data</Button>
      </div>
    )}
  </div>
);

export default Header;
