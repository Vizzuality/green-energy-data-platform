import React, { FC, forwardRef } from 'react';
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

  const ProfileLink = forwardRef(({ href }) => (
    <a href={href}>
      Profile
    </a>
  ));

  return (
    <MenuButton {...props} onAction="onClick">
      <Item key="profile">
        <Link key="profile-link" href="/profile">
          <ProfileLink href='/profile' />
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
