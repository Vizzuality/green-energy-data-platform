import React, { FC, ReactNode } from 'react';
import { useSelect } from 'downshift';
import cx from 'classnames';

import Icon from 'components/icon';

export interface DropdownSelectProps {
  menuElements: { id: (string | number), name: string }[],
  border?: boolean,
  label?: string | boolean,
  icon?: string,
  iconColor?: string,
  iconSize?: 'sm' | 'md' | 'lg' | 'xlg',
  iconRotable?: boolean,
  className?: string,
  classNameMenu?: string,
  children?: ReactNode | boolean,
  handleSelectedItemChange?: () => void | boolean,
  theme?: string
  shape?: string
}

const SHAPE = {
  rectangle: 'rounded-2xl px-4 py-1 border',
  circle: 'rounded-full p-4 border-2',
};

const THEME = {
  light: 'text-white border-white',
  dark: 'text-color1 border-gray1',
};

export const DropdownSelect: FC<DropdownSelectProps> = ({
  menuElements,
  label,
  icon = '',
  iconSize,
  iconColor,
  iconRotable = true,
  className = '',
  classNameMenu = '',
  children = false,
  shape = 'rectangle',
  theme = 'dark',
  // handleSelectedItemChange,
}: DropdownSelectProps) => {
  const items = menuElements;
  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    openMenu,
    selectedItem,
  } = useSelect({ items: menuElements });
  return (
    <div className={cx('relative w-max', { [className]: !!className })}>
      <button
        type="button"
        className={cx('inline-flex items-center justify-items-center text-sm border-box border-opacity-30',
          `${SHAPE[shape]}`,
          `${THEME[theme]}`)}
        {...getToggleButtonProps({
          onMouseEnter: () => {
            openMenu();
          },
        })}
      >
        {children}
        {!children && (
          <>
            {(selectedItem && label && selectedItem.name) || label || ''}
            <Icon
              ariaLabel={isOpen ? 'collapse dropdown' : 'expand dropdown'}
              name={icon}
              size={iconSize}
              className={cx(
                { iconColor: !!iconColor },
                { 'transform -rotate-180': isOpen && iconRotable },
                { 'ml-3': (selectedItem && selectedItem.name && label) || label },
              )}
            />
          </>
        )}
      </button>
      <ul
        className={cx('absolute left-0 top-0 min-w-min flex flex-col w-full z-50 rounded-xl divide-y divide-white divide-opacity-10',
          { 'bg-gray1 text-white shadow-xsm': isOpen },
          { [classNameMenu]: !!classNameMenu })}
        {...getMenuProps()}
      >
        {isOpen && (
          items.map((item, index) => (
            <li
              data-code={item.id}
              className={cx('px-4 py-2 first:rounded-t-xl last:rounded-b-xl',
                { 'bg-white text-gray3 first:rounded-t-xl last:rounded-b-xl': highlightedIndex === index })}
              key={item.id}
              {...getItemProps({ item, index, key: item.id })}
            >
              {item.name}
            </li>
          )))}
      </ul>
    </div>
  );
};

export default DropdownSelect;
