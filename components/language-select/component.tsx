import React, { useEffect, useState, useCallback } from 'react';
import { useSelect } from 'downshift';

const LanguageSelect = () => {
  const [languages, setLanguages] = useState([]);
  const items = languages;

  const { Transifex } = window;

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
    <div>
      <label {...getLabelProps()}>Select language</label>
      <button type="button" {...getToggleButtonProps()}>
        {(selectedItem && selectedItem.name) || ''}
      </button>
      <ul {...getMenuProps()}>
        {isOpen && (
          items.map((item, index) => (
            <li
              data-code={item.code}
              style={
                highlightedIndex === index
                  ? { backgroundColor: '#bde4ff' }
                  : {}
              }
              key={`${item.code}${index}`}
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
