import React, { FC, useRef } from 'react';
import cx from 'classnames';

import { useMenuTriggerState } from '@react-stately/menu';
import { useMenuTrigger } from '@react-aria/menu';
import { useButton } from '@react-aria/button';

import Icon from 'components/icon';
import MenuPopup from '../pop-up';

interface MenuButtonProps {
  label: string
}

const MenuButton: FC<MenuButtonProps> = ({ label, ...props }: MenuButtonProps) => {
  // Create state based on the incoming props
  const state = useMenuTriggerState(props);

  // Get props for the menu trigger and menu elements
  const ref = useRef();
  const { menuTriggerProps, menuProps } = useMenuTrigger({}, state, ref);

  // Get props for the button based on the trigger props from useMenuTrigger
  const { buttonProps } = useButton(menuTriggerProps, ref);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        {...buttonProps}
        ref={ref}
        className="w-max inline-flex items-center text-sm border-box"
      >
        <div className="flex flex-col items-start text-base">
          <span>Welcome,</span>
          <span className="font-bold">{label}</span>
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
          {...props}
          domProps={menuProps}
          autoFocus={state.focusStrategy}
          onClose={() => state.close()}
        />
      )}
    </div>
  );
};

export default MenuButton;
