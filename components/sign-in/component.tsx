import React, { FC } from 'react';
import cx from 'classnames';

import { signOut } from 'next-auth/client';

import Button from 'components/button';
import Icon from 'components/icon';

interface SignInProps {
  className?: string
}

const SignIn: FC<SignInProps> = ({
  className,
}: SignInProps) => {
  const handleClick = () => {
    signOut({ callbackUrl: 'http://localhost:3000/signin' });
  };
  return (
    <Button
      type="button"
      theme="primary"
      size="xlg"
      onClick={handleClick}
      className={cx('w-max inline-flex items-center text-sm border-box z-index-10',
        { [className]: !!className })}
    >
      Sign in
      <Icon
        ariaLabel="sign-in"
        name="profile"
        className="ml-3"
      />
    </Button>
  );
};

export default SignIn;
