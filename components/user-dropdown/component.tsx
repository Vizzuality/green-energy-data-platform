import React, { FC, useState } from 'react';
import Link from 'next/link';
import cx from 'classnames';

import { signOut } from 'next-auth/client';
import { useMe } from 'hooks/auth';

import Icon from 'components/icon';

import Tooltip from 'components/tooltip';

interface UserDropdownProps {
  className?: string
}

const UserDropdown: FC<UserDropdownProps> = ({
  className,
}: UserDropdownProps) => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const { data: user } = useMe();

  const handleClick = () => {
    signOut({ callbackUrl: 'http://localhost:3000/signin' });
  };

  if (!user) return null;

  return (
    <Tooltip
      visible={visible}
      placement="bottom-start"
      content={(
        <div className="justify-center flex flex-col w-full z-10 rounded-xl bg-gray3 divide-y divide-white divide-opacity-10">
          <Link key="profile-link" href="/profile">
            <a className="px-12 py-2 rounded-t-xl hover:bg-white hover:text-gray3 hover:rounded-t-xl" href="/profile">Profile</a>
          </Link>

          <button className="flex relative px-12 py-2 rounded-b-xl hover:bg-white hover:text-gray3 hover:rounded-b-x" type="button" onClick={handleClick}>
            Log out
            <Icon ariaLabel="Log out" className="absolute right-4" name="logout" size="lg" />
          </button>
        </div>
      )}
    >
      <button
        type="button"
        onClick={toggleVisibility}
        className={cx('w-max inline-flex items-center text-sm border-box z-index-10',
          { [className]: !!className })}
      >
        <div className="flex flex-col items-start text-base">
          <span>Welcome,</span>
          <span className="font-bold">{user.name}</span>
        </div>
        <Icon
          ariaLabel={visible ? 'collapse dropdown' : 'expand dropdown'}
          name="triangle_border"
          size="xlg"
          className={cx('ml-3 p-2 border-2 border-white border-opacity-30 text-white rounded-full',
            { 'rotate-180': !!visible },
            { 'transform -rotate-180 text-gray3': visible })}
        />
      </button>
    </Tooltip>
  );
};

export default UserDropdown;
