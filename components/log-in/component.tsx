import React, { FC, useState } from 'react';
import cx from 'classnames';

import Icon from 'components/icon';
import DropdownSelect from 'components/select';

export interface LogInProps {
  user: string,
}

export const LogIn: FC<LogInProps> = ({
  user,
}: LogInProps) => {
  const [isOpen, toggleDropdown] = useState(false);

  return (
    <div className="bg-transparent">
      <DropdownSelect
        className="border-0 text-white bg-transparent mr-3"
        classNameMenu="mt-4 bg-gray3 divide-y divide-white divide-opacity-10"
        menuElements={['Profile', 'Log out']}
        iconRotable={false}
        handleSelectedItemChange={() => {
          console.log('hola', isOpen)
          return toggleDropdown(!isOpen)}}
      >
        <>
          <div className="flex flex-col items-start">
            <span>Welcome,</span>
            <span className="font-bold">{user}</span>
          </div>
          <Icon
            ariaLabel={isOpen ? 'collapse dropdown' : 'expand dropdown'}
            name="triangle_border"
            size="xlg"
            className={cx('ml-3 p-2 bg-white text-gray2 rounded-full',
              { 'rotate-180': !!isOpen },
              { 'transform -rotate-180': isOpen })}
          />
        </>
      </DropdownSelect>
    </div>
  );
};

export default LogIn;
