import React, { FC } from 'react';
import cx from 'classnames';

import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from 'store/slices/indicator';

import { colors } from '../../constants';

interface LegendProps {
  categories: string[],
  subcategories: string[],
  className?: string,
}

const Legend: FC<LegendProps> = ({
  categories = [],
  subcategories = [],
  className = '',
}: LegendProps) => {
  const dispatch = useDispatch();

  const handleCategories = (value) => {
    dispatch(setFilters({ category: { label: 'category_2', value } }));
  };

  const { category } = useSelector((state) => state.indicator);
  const label = category?.label;
  const items = label === 'category_1' ? categories : subcategories;

  return (
    <div className={cx('inline-flex flex-col justify-center text-center bg-white rounded-md border-gray5 border-6 hover:opacity-90 px-1.5 text-gray1 max-h-64',
      { [className]: className })}
    >
      <ul className="flex flex-col items-center my-2.5 py-2.5">
        {items.map((item, index) => (
          <li
            key={category}
            className="flex items-center w-full active:bg-color1 rounded-md focus:bg-blue text-left text-sm"
          >
            <button
              type="button"
              className={cx('flex items-center',
                { 'cursor-auto': !subcategories.length })}
              onClick={() => handleCategories(item)}
              disabled={!subcategories.length}
            >
              <span
                className="w-4 h-4 ml-3 rounded-full"
                style={{ backgroundColor: colors[index] }}
              />
              <span className="flex-1 py-1 pl-6 text-left">{item}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Legend;
