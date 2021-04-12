import React, {
  FC,
} from 'react';
import { useMe } from 'hooks/auth';

// components
import UserDropdown from 'components/user-dropdown';
import Button from 'components/button';

const Header: FC = () => {
  const { user } = useMe();

  return (
    <div className="flex justify-between items-center px-12 py-2 border-b border-white border-opacity-30">
      <img alt="GEDP" src="images/logo_GEDP.svg" className="w-36" />
      {user && user.id && (
        <div className="flex items-center">
          <UserDropdown className="mr-4" />
          <Button className="text-gray1 text-sm ml-3" theme="primary-background" size="xlg">Browse all data</Button>
        </div>
      )}
    </div>
  );
};

export default Header;
