import React, {
  FC,
} from 'react';
import { useMe } from 'hooks/auth';
import cx from 'classnames';

// components
import UserDropdown from 'components/user-dropdown';
import Button from 'components/button';

type HeaderProps = {
  className?: string,
};

const Header: FC<HeaderProps> = ({ className }: HeaderProps) => {
  const { user } = useMe();

  return (
    <div className={cx('flex justify-between items-center px-12 py-2',
      { [className]: !!className })}
    >
      <img alt="GEDP" src="images/logo_GEDP.svg" className="w-32" />
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
