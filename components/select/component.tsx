import React, { FC, ReactNode } from 'react';
import { useSelect } from 'downshift';
import cx from 'classnames';

import Icon from 'components/icon';

export interface DropdownSelectProps {
  items: string[]
  label?: string,
  icon?: string,
  className?: string,
  children?: ReactNode,
  handleSelectedItemChange?: () => void
}

export const DropdownSelect: FC<DropdownSelectProps> = ({
  items,
  label = '',
  icon = '',
  className = '',
  children = {},
  handleSelectedItemChange,
}: DropdownSelectProps) => {
  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    openMenu,
    selectItem,

  } = useSelect({ items });

  return (
    <div className={cx('realtive', { [className]: !!className })}>
      <button
        type="button"
        className="inline-flex items-center justify-items-center text-sm border-gray2 border-opacity-20 border-2 rounded-2xl px-4 py-1 border-box"
        {...getToggleButtonProps({
          onClick: () => { handleSelectedItemChange(); },
          onMouseEnter: () => {
            openMenu();
          },
        })}
      >
        {!!children && children}
        {!children && (
          <>
            {label}
            <Icon
              ariaLabel={isOpen ? 'collapse dropdown' : 'expand dropdown'}
              name={icon}
              size="sm"
              className={cx('ml-3', { 'transform -rotate-180': isOpen })}
            />
          </>
        )}
      </button>
      <ul
        className={cx('absolute l-0 r-0',
          { [className]: !!className })}
        {...getMenuProps()}
      >
        {isOpen && (
          items.map((item, index) => (
            <li
              data-code={item}
              style={
                highlightedIndex === index
                  ? { backgroundColor: '#bde4ff' }
                  : {}
              }
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
