import React, { FC, useRef } from 'react';
import cx from 'classnames';

import { useMe } from 'hooks/auth';
import { useMenuTriggerState } from '@react-stately/menu';
import { useMenuTrigger } from '@react-aria/menu';
import { useButton } from '@react-aria/button';

import Icon from 'components/icon';

import MenuPopup from './pop-up';

import { MenuButtonProps } from './types';

const MenuButton: FC<MenuButtonProps> = ({
  children,
  onAction,
  ...props
}: MenuButtonProps) => {
  const { user } = useMe();

  // Create state based on the incoming props
  const state = useMenuTriggerState(props);

  // Get props for the menu trigger and menu elements
  const ref = useRef(null);
  const { menuTriggerProps, menuProps } = useMenuTrigger({}, state, ref);

  // Get props for the button based on the trigger props from useMenuTrigger
  const { buttonProps } = useButton(menuTriggerProps, ref);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        {...buttonProps}
        ref={ref}
        className="w-max inline-flex items-center text-sm border-box z-index-10"
      >
        <div className="flex flex-col items-start text-base">
          <span>Welcome,</span>
          <span className="font-bold">{user.name}</span>
        </div>
        <Icon
          ariaLabel={state.isOpen ? 'collapse dropdown' : 'expand dropdown'}
          name="triangle_border"
          size="xlg"
          className={cx('ml-3 p-2 border-2 border-white border-opacity-50 text-white rounded-full',
            { 'rotate-180': !!state.isOpen },
            { 'transform -rotate-180': state.isOpen })}
        />
      </button>
      {state.isOpen && (
        <MenuPopup
          domProps={menuProps}
          autoFocus={state.focusStrategy}
          onClose={() => state.close()}
          onAction={onAction}
        >
          {children}
        </MenuPopup>
      )}
    </div>
  );
};

export default MenuButton;
