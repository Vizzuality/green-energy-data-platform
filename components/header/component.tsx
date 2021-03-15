import React, {
  FC,
} from 'react';

// components
import Button from 'components/button';

const Header: FC = () => (
  <div className="flex justify-between items-center  px-12 py-8">
    <div>GEDP LOGO</div>
    <div className="flex items-center">
      <div>Welcome, Henry Mendoza</div>
      <Button theme="background" size="xlg" className="text-gray2">Browse all data</Button>
    </div>
  </div>
);

export default Header;
