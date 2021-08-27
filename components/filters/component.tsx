import React, { FC, useState, useCallback } from 'react';
import cx from 'classnames';
import i18next from 'i18next';

// components
import Icon from 'components/icon';
import { setFilters } from 'store/slices/indicator';
import { useDispatch } from 'react-redux';

interface FiltersProps {
  categories: string[]
  className?: string,
}

const Filters: FC<FiltersProps> = ({
  categories,
  className = '',
}: FiltersProps) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState('');
  const handleClick = (direction) => {
    const index = categories.indexOf(active);
    if (direction === 'up' && index > 0) {
      return setActive(categories[index - 1]);
    }
    if (direction === 'down' && index < categories.length - 1) {
      return setActive(categories[index + 1]);
    }
    return setActive(categories[index]);
  };

  const handleCategories = useCallback((value) => {
    dispatch(setFilters({ category: { label: 'category_2', value } }));
    setActive(value);
  }, [dispatch]);

  const handleRemoveCategory = () => {
    dispatch(setFilters({ category: { label: 'category_1' } }));
    setActive('');
  };

  return (
    <div className={cx('inline-flex flex-col justify-center text-center rounded-md bg-gray5 hover:opacity-90 px-1.5 text-gray1',
      { [className]: className })}
    >
      <div className="flex justify-start py-3.5 px-6 ">
        <div className="flex">
          <Icon ariaLabel="filters" name="filter" size="lg" className="mr-5" />
          <p>
            {i18next.t('filters')}
            :
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        {categories.map((category) => (
          <div
            key={category}
            className={cx('flex justify-between cursor-pointer  items-center w-full mb-1.5 bg-white active:bg-color1 rounded-md focus:bg-blue text-left text-sm',
              { 'bg-color1 text-white': active === category })}
          >
            <button
              name={category}
              type="button"
              className="items-center py-3 pl-6 "
              onClick={() => handleCategories(category)}
            >
              <span className="flex-1">{category}</span>
            </button>
            {active === category && (
              <div className="h-full flex justify-center items-center border-l border-l-white py-3">
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
      <div className="flex items-center justify-center p-3">
        <Icon
          ariaLabel="category-up"
          name="triangle_border"
          size="xlg"
          onClick={() => handleClick('down')}
          className="cursor-pointer p-2 mr-3 border-gray1 border-2 border-opacity-30 rounded-full hover:bg-gray1 hover:bg-opacity-90 hover:text-white text-gray1"
        />
        <Icon
          ariaLabel="category-down"
          name="triangle_border"
          size="xlg"
          onClick={() => handleClick('up')}
          className="cursor-pointer p-2 border-gray1 border-2 border-opacity-30 rounded-full transform rotate-180 hover:bg-gray1 hover:bg-opacity-90 hover:text-white"
        />
      </div>
    </div>
  );
};
export default Filters;
