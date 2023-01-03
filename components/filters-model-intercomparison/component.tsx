import React, {
  FC, useCallback, useRef,
} from 'react';
import cx from 'classnames';
import i18next from 'i18next';

// components
import Icon from 'components/icon';

interface FiltersProps {
  models: string[],
  activeModels: string[],
  className?: string,
  onClick: (activeModels: string[]) => void,
  height: number
}

// strings translations
const filtersLang = i18next.t('filters');
const history = i18next.t('history');
const selectAll = i18next.t('selectAll');

const FiltersMI: FC<FiltersProps> = ({
  models,
  activeModels,
  className = '',
  onClick,
  height,
}: FiltersProps) => {
  const filtersRef = useRef(null);

  const handleCategories = useCallback((value) => {
    const position = activeModels.indexOf(value);
    let updatedActiveModels;
    if (position === -1) {
      updatedActiveModels = [...activeModels, value];
      onClick(updatedActiveModels);
    } else {
      updatedActiveModels = activeModels.filter((model) => model !== value);
      onClick(updatedActiveModels);
    }
  }, [onClick, activeModels]);

  const historic = models.filter((model) => model.toLowerCase().includes('history'));
  const areAllSelected = models.length === activeModels.length;
  const modelsHeight = models.length * 50;
  const maxHeight = modelsHeight + 100;

  return (
    <div
      key={models.length}
      className={cx('inline-flex flex-col justify-start text-center rounded-md bg-gray5 hover:opacity-90 px-1.5 text-gray1 w-full',
        { [className]: className })}
      style={{ height, maxHeight }}
    >
      <div className="flex py-3.75 px-6 items-center justify-between w-full">
        <div className="flex">
          <Icon ariaLabel="filters" name="filter" size="lg" className="mr-5" />
          <p>
            {filtersLang}
            :
          </p>

        </div>
        {models.length > 0 && (
        <label
          htmlFor="select-all"
          className="flex items-center text-sm text-left cursor-pointer opacity-20"
        >
          {areAllSelected ? history : selectAll}
          <input
            id="select-all"
            name="select-all"
            type="checkbox"
            className="ml-2 w-7 h-7"
            checked={areAllSelected}
            onClick={areAllSelected
              ? () => onClick(historic)
              : () => onClick(models)}
          />
        </label>
        )}
      </div>
      <div
        ref={filtersRef}
        className="flex flex-col items-start overflow-y-auto"
      >
        {models.map((category) => (
          <div
            key={category}
            className={cx('flex justify-between cursor-pointer items-center w-full mb-1.5  active:bg-color1 rounded-md focus:bg-blue text-left text-sm',
              (activeModels.includes(category) || models.length === 1) ? 'bg-color1 text-white' : 'bg-white')}
          >
            <button
              name={category}
              type="button"
              className="flex-1 py-3 pl-6"
              onClick={() => handleCategories(category)}
            >
              <span className="flex flex-1 pr-2 text-left">{category}</span>
            </button>
            {(activeModels.includes(category) && models.length > 1) && (
              <div className="flex items-center justify-center h-full py-3 border-l border-l-white">
                <Icon
                  ariaLabel="close"
                  name="close"
                  size="sm"
                  className="mx-3"
                  onClick={() => handleCategories(category)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default FiltersMI;
