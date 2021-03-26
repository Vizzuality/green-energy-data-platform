import React, {
  FC,
  useState,
  useRef,
  RefObject,
} from 'react';
import cx from 'classnames';

import { mergeProps } from '@react-aria/utils';
import { useMenuItem } from '@react-aria/menu';
import { useFocus } from '@react-aria/interactions';
import { OverlayTriggerState } from '@react-stately/overlays';

// types
import { FocusStrategy } from '@react-types/shared';
import { MenuTriggerProps } from '@react-types/menu';

interface MenuTriggerState extends OverlayTriggerState {
  readonly focusStrategy: FocusStrategy;
  open(focusStrategy?: FocusStrategy | null): void;
  toggle(focusStrategy?: FocusStrategy | null): void;
}

interface MenuItemProps {
  props: MenuTriggerProps,
  state: MenuTriggerState,
  ref: RefObject<HTMLElement>,
  item: any
}

const MenuItem: FC<MenuItemProps> = (
  { item, state, onAction, onClose }: MenuItemProps) => {
  // Get props for the menu item element
  const ref = useRef();
  const { key, isDisabled, rendered } = item;
  const { menuItemProps } = useMenuItem(
    {
      key,
      isDisabled,
      onAction,
      onClose,
    },
    state,
    ref,
  );
console.log(state, 'state*******')
  const [isFocused, setFocused] = useState(false);
  const { focusProps } = useFocus({ onFocusChange: setFocused });

  return (
    <li
      {...mergeProps(menuItemProps, focusProps)}
      ref={ref}
      className={cx('pointer-events-auto p-2 flex items-center justify-center w-full cursor-pointer hover:bg-white hover:text-gray3',
        { 'bg-white text-gray3': isFocused })}
    >
      {rendered}
    </li>
  );
};

export default MenuItem;
