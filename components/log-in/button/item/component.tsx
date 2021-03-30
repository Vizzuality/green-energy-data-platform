import React, {
  FC,
  useState,
  useRef,
  MutableRefObject,
} from 'react';
import cx from 'classnames';

import { mergeProps } from '@react-aria/utils';
import { useMenuItem } from '@react-aria/menu';
import { useFocus } from '@react-aria/interactions';

// types
import { MenuItemProps } from './types';

const MenuItem: FC<MenuItemProps> = ({
  item,
  state,
  onAction,
  onClose,
}: MenuItemProps) => {
  // Get props for the menu item element
  const ref: MutableRefObject<HTMLLIElement | null> = useRef(null);
  const { menuItemProps } = useMenuItem(
    {
      key: item.key,
      onAction,
      onClose,
    },
    state,
    ref,
  );
  const [isFocused, setFocused] = useState(false);
  const { focusProps } = useFocus({ onFocusChange: setFocused });

  return (
    <li
      {...mergeProps(menuItemProps, focusProps)}
      ref={ref}
      className={cx('flex justify-center pointer-events-auto p-2  w-full cursor-pointer hover:bg-white hover:text-gray3',
        { 'bg-white text-gray3 first:rounded-t-2xl last:rounded-b-2xl': isFocused })}
    >
      {item.rendered}
    </li>
  );
};

export default MenuItem;
