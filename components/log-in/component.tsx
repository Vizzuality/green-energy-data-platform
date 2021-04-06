import React, { FC } from 'react';
import Link from 'next/link';

import { Item } from '@react-stately/collections';

import { signOut } from 'next-auth/client';

import Icon from 'components/icon';

import MenuButton from './button';
import { MenuButtonProps } from './button/types';

const UserDropdown: FC<MenuButtonProps> = (props: MenuButtonProps) => {
  const handleClick = () => {
    signOut({ callbackUrl: 'http://localhost:3000/signin' });
  };

  return (
    <MenuButton {...props} onAction="onClick">
      <Item key="profile">
        <Link key="profile-link" href="/profile">
          <a href="/profile">
            Profile
          </a>
        </Link>
      </Item>
      <Item key="Log out">
        <button className="flex relative" type="button" onClick={handleClick}>
          Log out
          <Icon ariaLabel="Log out" className="ml-3 absolute -right-8" name="logout" size="lg" />
        </button>
      </Item>
    </MenuButton>
  );
};

export default UserDropdown;
