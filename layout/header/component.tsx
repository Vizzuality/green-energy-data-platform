import React, {
  FC,
} from 'react';
import { useMe } from 'hooks/auth';

// components
import LogIn from 'components/log-in';
import Button from 'components/button';

interface HeaderProps {
  color?: string,
}

const Header: FC<HeaderProps> = ({
  color,
}: HeaderProps) => {
  const { user } = useMe();

  return (
    <div className={`container m-auto flex justify-between items-center px-12 py-8 bg-${color}`}>
      <div className="text-white text-xl font-bold">GEDP LOGO</div>
      {user && user.id && (
        <div className="flex items-center">
          {/* <LogIn /> */}
          <LogIn user={user.name} />
          <Button className="text-gray2 text-sm ml-3" theme="primary-background" size="xlg">Browse all data</Button>
        </div>
      )}
    </div>
  );
};

export default Header;
