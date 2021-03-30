import React, { FC, forwardRef } from 'react';
import Link from 'next/link';

import { Item } from '@react-stately/collections';

import Icon from 'components/icon';

import MenuButton from './button';
import { MenuButtonProps } from './button/types';

const LogIn: FC<MenuButtonProps> = (props: MenuButtonProps) => {
  const handleClick = () => {
    console.log('log out');
  };

  const ProfileButton = forwardRef(({ href }) => (
    <a href={href}>
      Profile
    </a>
  ));

  return (
    <MenuButton {...props} onAction="onAction">
      <Item key="profile">
        <Link key="profile-link" href="/profile">
          <ProfileButton href='/profile' />
        </Link>
      </Item>
      <Item key="Log out">
        <button className="flex" type="button" onClick={handleClick}>
          Log out
          <Icon ariaLabel="Log out" className="ml-3" name="logout" size="lg" />
        </button>
      </Item>
    </MenuButton>
  );
};

export default LogIn;
