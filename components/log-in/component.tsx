import React, { FC } from 'react';
import Link from 'next/link';

import { Item } from '@react-stately/collections';

import Icon from 'components/icon';

import MenuButton from './button';

interface LogInProps {
  user: string
}

const LogIn: FC<LogInProps> = ({ user }: LogInProps) => {
  const handleClick = () => {
    console.log('log out');
  };

  return (
    <MenuButton label={user}>
      <Item key="profile">
        <Link key="profile-link" href="/profile" passHref>
          <a href="/profile">
            Profile
          </a>
        </Link>
      </Item>
      <Item key="action">
        <button key="log-out-btn" className="flex" type="button" onClick={handleClick}>
          Log out
          <Icon ariaLabel="Log out" className="ml-3" name="logout" size="lg" />
        </button>
      </Item>
    </MenuButton>
  );
};

export default LogIn;
