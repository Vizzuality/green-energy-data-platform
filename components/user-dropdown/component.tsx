import React, {
  FC,
  useState,
} from 'react';
import Link from 'next/link';
import cx from 'classnames';

import { signOut } from 'next-auth/client';
import { useMe } from 'hooks/auth';

import Icon from 'components/icon';
import Tooltip from 'components/tooltip';

import i18next from 'i18next';

interface UserDropdownProps {
  className?: string,
  theme?: string,
}

const THEME = {
  light: 'border-white text-white border-opacity-30',
  dark: 'border-gray1 text-gray1 border-opacity-20',
};

const UserDropdown: FC<UserDropdownProps> = ({
  className,
  theme = 'light',
}: UserDropdownProps) => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const { data: user } = useMe();
  const handleClick = () => {
    signOut({ callbackUrl: '/signin' });
  };

  if (!user) {
    return (
      <Link href="/signin" passHref>
        <a href="/signin">
          <Icon ariaLabel="sign in" className="cursor-pointer" name="profile" size="xlg" />
        </a>
      </Link>
    );
  }

  const isAdmin = user?.role === 'admin';

  // language keys
  const profile = i18next.t('profile');
  const logout = i18next.t('logout');
  const adminPanel = i18next.t('adminPanel');
  const welcome = i18next.t('welcome');

  return (
    <Tooltip
      visible={visible}
      placement="bottom-start"
      content={(
        <div className="z-10 flex flex-col justify-center w-full divide-y divide-white rounded-xl bg-gray3 divide-opacity-10">
          <Link key="profile-link" href="/profile">
            <a className="px-12 py-2 rounded-t-xl hover:bg-white hover:text-gray3 hover:rounded-t-xl" href="/profile">{profile}</a>
          </Link>
          {isAdmin && (
          <Link key="admin-panel" href={process.env.NEXT_PUBLIC_ADMIN_PANEL}>
            <a className="px-12 py-2 hover:bg-white hover:text-gray3" href={process.env.NEXT_PUBLIC_ADMIN_PANEL}>{adminPanel}</a>
          </Link>
          )}
          <button className="relative flex px-12 py-2 rounded-b-xl hover:bg-white hover:text-gray3 hover:rounded-b-x" type="button" onClick={handleClick}>
            {logout}
            <Icon ariaLabel="Log out" className="absolute right-4" name="logout" size="lg" />
          </button>
        </div>
      )}
    >
      <button
        type="button"
        onClick={toggleVisibility}
        className={cx(`w-max inline-flex items-center text-sm border-box z-index-10 ${THEME[theme]}`,
          { [className]: !!className })}
      >
        <div className="flex flex-col items-end text-base">
          <span>
            {welcome}
            ,
            {' '}
          </span>
          <span className="font-bold">{user.name}</span>
        </div>
        <Icon
          ariaLabel={visible ? 'collapse dropdown' : 'expand dropdown'}
          name="triangle_border"
          size="xlg"
          className={cx(`ml-3 p-2 border-2 rounded-full ${THEME[theme]}`,
            {
              'rotate-180': !!visible,
              'transform -rotate-180 text-gray3': visible,
            })}
        />
      </button>
    </Tooltip>
  );
};

export default UserDropdown;
