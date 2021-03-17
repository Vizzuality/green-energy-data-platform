import React, { FC } from 'react';
import { useSelect } from 'downshift';
import cx from 'classnames';

import Icon from 'components/icon';

export interface DropdownSelectProps {
  items: string[]
  label?: string,
  icon?: string
}

export const DropdownSelect: FC<DropdownSelectProps> = ({
  items,
  label = '',
  icon = '',
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
    <div className="realtive">
      <button
        type="button"
        className="inline-flex items-center justify-items-center text-sm border-gray2 border-opacity-20 border-2 rounded-2xl px-4 py-1 border-box"
        {...getToggleButtonProps({
          onMouseEnter: () => {
            openMenu();
          },
        })}
      >
        {label}
        <Icon
          ariaLabel={isOpen ? 'collapse dropdown' : 'expand dropdown'}
          name={icon}
          size="sm"
          className={cx('ml-3', { 'transform -rotate-180': isOpen })}
        />
      </button>
      <ul className="absolute l-0 r-0" {...getMenuProps()}>
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
