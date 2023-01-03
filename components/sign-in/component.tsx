import React, { FC } from 'react';
import cx from 'classnames';

import { signOut } from 'next-auth/client';

import Button from 'components/button';
import Icon from 'components/icon';

import i18next from 'i18next';

interface SignInProps {
  className?: string
}

// language keys
const signin = i18next.t('signin');

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
      {signin}
      <Icon
        ariaLabel="sign-in"
        name="profile"
        className="ml-3"
      />
    </Button>
  );
};

export default SignIn;
