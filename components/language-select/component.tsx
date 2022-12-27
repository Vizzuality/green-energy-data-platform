import React from 'react';
import { useSelect } from 'downshift';
import cx from 'classnames';

import { useDispatch } from 'react-redux';

// language utils
import i18n from 'i18next';
import { languages } from 'utils/translations';
import { setLanguage } from 'store/slices/language';

// components
import Icon from 'components/icon';
import { useRouter } from 'next/router';

// language keys
const language = i18n.t('language');

const LanguageSelect = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;

  const onSelectedItemChange = (item) => {
    const { selectedItem: { code } } = item;
    router.replace({
      query: {
        ...query,
        locale: code,
      },
    });
    dispatch(setLanguage(code));
    i18n.changeLanguage(code);
  };

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({ items: languages, onSelectedItemChange });
  return (
    <div className="relative flex items-center">
      <button
        type="button"
        className="flex items-center"
        {...getToggleButtonProps()}
      >
        <Icon className="text-white" ariaLabel="world ball" name="language" size="lg" />
        <span className="px-3">{language}</span>
        <Icon
          className={cx('fill-current text-white', { 'transform rotate-180': !isOpen })}
          ariaLabel="arrow"
          name="filled_triangle"
          size="sm"
        />
      </button>
      {isOpen && (
      <ul
        className="absolute flex-col w-full border border-white border-opacity-25 divide-y divide-white bg-gray1 bottom-11 rounded-xl divide-opacity-10"
        {...getMenuProps()}
      >
        {languages.map((item, index) => (
          <li
            data-code={item.code}
            style={
                highlightedIndex === index
                  ? { backgroundColor: 'rgba(78, 82, 106, 0.95)' }
                  : {}
              }
            key={`${item.code}`}
            {...getItemProps({ item, index })}
            className="p-2 pl-8 first:rounded-t-xl last:rounded-b-xl "
          >
            {item.name}
          </li>
        ))}
      </ul>
      )}
    </div>
  );
};

export default LanguageSelect;
