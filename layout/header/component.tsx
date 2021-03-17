import React, {
  FC,
} from 'react';

// components
import Button from 'components/button';

const Header: FC = () => (
  <div className="container m-auto flex justify-between items-center py-8">
    <div className="font-bold">GEDP LOGO</div>
    <div className="flex items-center">
      <div>Welcome,<br/> Henry Mendoza</div>
      <Button theme="primary-background" size="lg" className="text-gray2">Browse all data</Button>
    </div>
  </div>
);

export default Header;
