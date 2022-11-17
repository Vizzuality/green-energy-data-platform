import React, {
  FC, useEffect, useCallback, useMemo,
} from 'react';
import cx from 'classnames';
import i18next from 'i18next';

import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'store/store';

// components
import Icon from 'components/icon';

interface FiltersProps {
  visualization: string;
  categories: string[];
  hasSubcategories: boolean;
  className?: string;
  onClick: (category: Record<string, any>) => void;
  height?: number;
  indicator?: string;
}

const Filters: FC<FiltersProps> = ({
  visualization,
  categories,
  hasSubcategories,
  className = '',
  onClick,
  height,
  indicator = null,
}: FiltersProps) => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.indicator);

  const categorySelected = useMemo(
    () => categories.find((c) => c === filters.category?.value),
    [categories, filters.category?.value],
  );

  useEffect(() => {
    if (categories.length === 1 && indicator === 'scenarios') {
      const value = categories[0];
      dispatch(onClick({ category: { label: 'category_2', value } }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, onClick, visualization, categories.length]);

  const handleClick = (direction) => {
    const index = categories.indexOf(categorySelected);
    if (hasSubcategories && direction === 'up' && index > 0) {
      dispatch(
        onClick({
          category: { label: 'category_2', value: categories[index - 1] },
          uiCategory: { label: 'category_2', value: categories[index - 1] },
        }),
      );
    }
    if (hasSubcategories && direction === 'down' && index < categories.length - 1) {
      dispatch(
        onClick({
          category: { label: 'category_2', value: categories[index + 1] },
          uiCategory: { label: 'category_2', value: categories[index + 1] },
        }),
      );
    }
  };

  const handleCategories = useCallback(
    (value) => {
      dispatch(onClick({ category: { label: 'category_2', value }, uiCategory: { label: 'category_2', value } }));
    },
    [dispatch, onClick],
  );

  const handleRemoveCategory = () => {
    dispatch(onClick({ category: { label: 'category_1' }, uiCategory: { label: 'category_1' } }));
  };

  const categoriesHeight = categories.length * 50;
  const maxHeight = categoriesHeight + 110;

  return (
    <div
      className={cx(
        'inline-flex flex-col justify-start text-center rounded-md bg-gray5 hover:opacity-90 px-1.5 text-gray1 w-full',
        { [className]: className },
      )}
      style={{ height, maxHeight }}
    >
      <div className="flex justify-start py-3.75 px-6 ">
        <div className="flex">
          <Icon ariaLabel="filters" name="filter" size="lg" className="mr-5" />
          <p>
            {i18next.t('filters')}
            :
          </p>
        </div>
      </div>
      <div
        className={cx('flex flex-col overflow-y-auto items-start', {
          'max-h-36': !height,
        })}
      >

        {categories.map((category) => (
          <div
            key={category}
            className={cx(
              'flex justify-between items-center w-full mb-1.5 rounded-md text-left text-sm',
              {
                'active:bg-color1 focus:bg-blue cursor-pointer': hasSubcategories,
                'bg-color1 text-white clear:bg-white': categorySelected === category,
                'bg-white': categorySelected !== category,
              },
            )}
          >
            <button
              name={category}
              type="button"
              className={cx('py-3 pl-6 flex-1', {
                cursor: hasSubcategories || categories.length !== 1,
              })}
              onClick={() => handleCategories(category)}
              disabled={!hasSubcategories || categories.length === 1}
            >
              <span className="flex flex-1 pr-2 text-left">{category}</span>
            </button>
            {categorySelected === category && hasSubcategories && categories.length > 1 && (
              <div className="flex items-center justify-center h-full py-3 border-l border-l-white">
                <Icon
                  ariaLabel="close"
                  name="close"
                  size="sm"
                  className="mx-3"
                  onClick={handleRemoveCategory}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      {categories.length > 1 && (
        <div className="flex items-center justify-center p-3">
          <Icon
            ariaLabel="category-up"
            name="triangle_border"
            size="xlg"
            onClick={() => handleClick('down')}
            className={cx('p-2 mr-3 border-2 rounded-full border-gray1 border-opacity-30 text-gray1', {
              'cursor-pointer hover:bg-gray1 hover:bg-opacity-90 hover:text-white': hasSubcategories,
            })}
          />
          <Icon
            ariaLabel="category-down"
            name="triangle_border"
            size="xlg"
            onClick={() => handleClick('up')}
            className={cx('p-2 transform rotate-180 border-2 rounded-full border-gray1 border-opacity-30', {
              'cursor-pointer hover:bg-gray1 hover:bg-opacity-90 hover:text-white': hasSubcategories,
            })}
          />
        </div>
      )}
    </div>
  );
};
export default Filters;
