import React, { FC, ReactNode } from 'react';
import { useSelect } from 'downshift';
import cx from 'classnames';

import Icon from 'components/icon';

export interface DropdownSelectProps {
  menuElements: string[],
  border?: boolean,
  label?: string,
  icon?: string,
  iconSize?: string,
  iconRotable?: boolean,
  className?: string,
  classNameMenu?: string,
  children?: ReactNode | boolean,
  handleSelectedItemChange?: () => void | boolean,
}

export const DropdownSelect: FC<DropdownSelectProps> = ({
  menuElements,
  border = false,
  label = '',
  icon = '',
  iconSize,
  iconRotable = true,
  className = '',
  classNameMenu = '',
  children = false,
  handleSelectedItemChange,
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
  } = useSelect({ items });

  return (
    <div className={cx('relative z-50 w-max', { [className]: !!className })}>
      <button
        type="button"
        className={cx('w-max inline-flex items-center text-sm border-gray2 border-box',
          { 'border-opacity-20 border-2 rounded-2xl px-4 py-1': border })}
        {...getToggleButtonProps({
          onMouseEnter: () => {
            openMenu();
          },
          onClick: () => handleSelectedItemChange(),
        })}
      >
        {children}
        {!children && (
          <>
            {selectedItem || label}
            <Icon
              ariaLabel={isOpen ? 'collapse dropdown' : 'expand dropdown'}
              name={icon}
              size={iconSize}
              className={cx('ml-3', { 'transform -rotate-180': isOpen && iconRotable })}
            />
          </>
        )}
      </button>
      <ul
        className={cx('absolute left-0 right-0 top-8 flex flex-col w-full z-50 bg-white rounded-xl',
          { [classNameMenu]: !!classNameMenu })}
        {...getMenuProps()}
      >
        {isOpen && (
          items.map((item, index) => (
            <li
              data-code={item}
              className={cx('px-4 py-2 first:rounded-t-xl last:rounded-b-xl', { 'bg-white text-gray3': highlightedIndex === index })}
              key={item}
              {...getItemProps({ item, index })}
            >
              {item}
            </li>
          )))}
      </ul>
    </div>
  );
};

export default DropdownSelect;
