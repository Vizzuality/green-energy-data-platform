import React, { useEffect, useState, useCallback } from 'react';
import { useSelect } from 'downshift';
import cx from 'classnames';

// components
import Icon from 'components/icon';

const LanguageSelect = () => {
  const [languages, setLanguages] = useState([]);
  const items = languages;

  const { Transifex } = (window as any);

  const getAllLanguages = useCallback(() => new Promise((resolve, reject) => {
    Transifex.live.onError((err) => reject(err));
    Transifex.live.onFetchLanguages((lan) => resolve(lan));
  }), [Transifex]);

  useEffect(() => {
    if (Transifex && typeof Transifex !== 'undefined') {
      Transifex.live.onReady(() => {
        const langCode = Transifex.live.detectLanguage();
        const { code } = Transifex.live.getSourceLanguage();
        Transifex.live.translateTo(langCode);
        Transifex.live.translateTo(code);
      });
      getAllLanguages()
        .then((lan: object[]) => setLanguages(lan))
        .catch((err) => err);
    }
  }, [Transifex, getAllLanguages]);

  const onSelectedItemChange = (item) => {
    Transifex.live.translateTo(item.selectedItem.code);
  };

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({ items, onSelectedItemChange });

  return (
    <div className="flex items-center relative">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      {/* <label {...getLabelProps()} className="flex items-center">
        <Icon className="text-white" ariaLabel="world ball" name="world" size="lg" />
        <p className="px-3">Select language</p>
        <Icon
          className={cx('fill-current text-white', { 'transform rotate-180': !isOpen })}
          ariaLabel="arrow"
          name="filled_triangle"
          size="sm"
        />
      </label> */}
      <button
        type="button"
        className="flex items-center"
        {...getToggleButtonProps()}
      >
        <Icon className="text-white" ariaLabel="world ball" name="world" size="lg" />
        <p className="px-3">Select language</p>
        <Icon
          className={cx('fill-current text-white', { 'transform rotate-180': !isOpen })}
          ariaLabel="arrow"
          name="filled_triangle"
          size="sm"
        />
      </button>
      <ul
        className="flex-col bg-gray2 absolute bottom-7 w-full pl-8"
        {...getMenuProps()}
      >
        {isOpen && (
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
