import React from 'react';
import { useSelect } from 'downshift';
import cx from 'classnames';

import i18n from 'i18next';

// components
import Icon from 'components/icon';

const LanguageSelect = () => {
  const onSelectedItemChange = (item) => {
    const { selectedItem: { code } } = item;
    i18n.changeLanguage(code);
  };

  const items = [{
    name: 'English',
    code: 'en',
  },
  {
    name: 'Chinese',
    code: 'zh_CN',
  }];

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({ items, onSelectedItemChange });

  return (
    <div className="flex items-center relative">
      <button
        type="button"
        className="flex items-center"
        {...getToggleButtonProps()}
      >
        <Icon className="text-white" ariaLabel="world ball" name="language" size="lg" />
        <span className="px-3">Select language</span>
        <Icon
          className={cx('fill-current text-white', { 'transform rotate-180': !isOpen })}
          ariaLabel="arrow"
          name="filled_triangle"
          size="sm"
        />
      </button>
      <ul
        className="flex-col bg-gray1 absolute bottom-7 w-full pl-8 rounded p-2 border border-white border-opacity-25"
        {...getMenuProps()}
      >
        {(
          items.map((item, index) => (
            <li
              data-code={item.code}
              style={
                highlightedIndex === index
                  ? { backgroundColor: '#bde4ff' }
                  : {}
              }
              key={`${item.code}`}
              {...getItemProps({ item: item.name, index })}
            >
              {item.name}
            </li>
          )))}
      </ul>
    </div>
  );
};

export default LanguageSelect;
