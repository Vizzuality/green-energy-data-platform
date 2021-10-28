import React, {
  FC, useState, useEffect, useCallback,
} from 'react';
import cx from 'classnames';
import i18next from 'i18next';

import { useDispatch } from 'react-redux';

// components
import Icon from 'components/icon';

interface FiltersProps {
  visualizationType: string,
  categories: string[]
  hasSubcategories: boolean,
  className?: string,
  onClick: (category: Record<string, unknown>) => void,
}

const Filters: FC<FiltersProps> = ({
  visualizationType,
  categories,
  hasSubcategories,
  className = '',
  onClick,
}: FiltersProps) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState('');
  // const {
  //   current,
  // } = useSelector(
  //   (state: RootState) => (state.language),
  // );

  // useEffect(() => {
  //   if (visualizationType === 'choropleth') {
  //     const hasTotal = categories.includes('Total' || '全部的');
  //     if (hasTotal) {
  //       const value = current === 'cn' ? '全部的' : 'Total';
  //       setActive(value);
  //       dispatch(onClick({ category: { label: 'category_2', value } }));
  //     } else {
  //       const value = categories[0];
  //       setActive(value);
  //       dispatch(onClick({ category: { label: 'category_2', value } }));
  //     }
  //   }
  // }, [dispatch, onClick, categories, visualizationType, current]);

  useEffect(() => {
    if (visualizationType === 'choropleth') {
      const value = categories[0];
      setActive(value);
      dispatch(onClick({ category: { label: 'category_2', value } }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, onClick, visualizationType]);

  const handleClick = (direction) => {
    const index = categories.indexOf(active);
    if (direction === 'up' && index > 0) {
      dispatch(onClick({ category: { label: 'category_2', value: categories[index - 1] } }));
      return setActive(categories[index - 1]);
    }
    if (direction === 'down' && index < categories.length - 1) {
      dispatch(onClick({ category: { label: 'category_2', value: categories[index + 1] } }));
      return setActive(categories[index + 1]);
    }
    return setActive(categories[index]);
  };

  const handleCategories = useCallback((value) => {
    dispatch(onClick({ category: { label: 'category_2', value } }));
    setActive(value);
  }, [dispatch, onClick]);

  const handleRemoveCategory = () => {
    dispatch(onClick({ category: { label: 'category_1' } }));
    setActive('');
  };

  return (
    <div className={cx('inline-flex flex-col justify-start text-center rounded-md bg-gray5 hover:opacity-90 px-1.5 text-gray1 w-full',
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
      <div className="flex flex-col max-h-36 overflow-y-auto items-start">
        {categories.map((category) => (
          <div
            key={category}
            className={cx('flex justify-between cursor-pointer items-center w-full mb-1.5 bg-white active:bg-color1 rounded-md focus:bg-blue text-left text-sm',
              { 'bg-color1 text-white': active === category })}
          >
            <button
              name={category}
              type="button"
              className={cx('py-3 pl-6 flex-1',
                { 'cursor-none': !hasSubcategories })}
              onClick={() => handleCategories(category)}
              disabled={!hasSubcategories}
            >
              <span className="flex-1 flex text-left">{category}</span>
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
