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

const FiltersMI: FC<FiltersProps> = ({
  models,
  activeModels,
  className = '',
  onClick,
  height,
}: FiltersProps) => {
  const filtersRef = useRef(null);
  // const handleClick = (direction) => {
  //   if (direction === 'up') {

  //   }
  //   if (direction === 'down') {
  //   }
  // };

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

  return (
    <div
      key={models.length}
      className={cx('inline-flex flex-col justify-start text-center rounded-md bg-gray5 hover:opacity-90 px-1.5 text-gray1 w-full max-h-full',
        { [className]: className })}
      style={{ height }}
    >
      <div className="flex py-3.75 px-6 items-center justify-between w-full">
        <div className="flex">
          <Icon ariaLabel="filters" name="filter" size="lg" className="mr-5" />
          <p>
            {i18next.t('filters')}
            :
          </p>

        </div>
        <label
          htmlFor="select-all"
          className="flex items-center text-left text-sm opacity-20 cursor-pointer"
        >
          {areAllSelected ? i18next.t('history') : i18next.t('selectAll')}
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
      </div>
      <div
        ref={filtersRef}
        className="flex flex-col overflow-y-auto items-start"
      >
        {models.map((category) => (
          <div
            key={category}
            className={cx('flex justify-between cursor-pointer items-center w-full mb-1.5 bg-white active:bg-color1 rounded-md focus:bg-blue text-left text-sm',
              { 'bg-color1 text-white': activeModels.includes(category) })}
          >
            <button
              name={category}
              type="button"
              className="py-3 pl-6 flex-1"
              onClick={() => handleCategories(category)}
            >
              <span className="flex-1 flex text-left">{category}</span>
            </button>
            {activeModels.includes(category) && (
              <div className="h-full flex justify-center items-center border-l border-l-white py-3">
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
