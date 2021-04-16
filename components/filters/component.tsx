import React, { FC, useState } from 'react';
import cx from 'classnames';

// components
import Icon from 'components/icon';

interface FiltersProps {
  categories: { id: number, name: string, active?: boolean }[]
  className?: string,
}

const Filters: FC<FiltersProps> = ({
  categories,
  className = '',
}: FiltersProps) => {
  const active = categories.map((c) => (
    {
      ...c,
      active: c.default,
    }));
  const handleClick = () => {
    console.log('click scroll');
  };
  const handleFilter = (id: number) => {
    console.log(id, 'filters');
  };
  return (
    <div className={cx('inline-flex flex-col justify-center text-center rounded-md bg-gray5 hover:opacity-90 px-1.5',
      { [className]: className })}
    >
      <div className="flex justify-start py-3.5 px-6 ">
        <div className="flex">
          <Icon ariaLabel="filters" name="filter" size="lg" className="mr-5" />
          <p>Filters:</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        {categories.map(({ id, name, active }) => (
          <button
            key={id}
            name={name}
            type="button"
            className={cx('flex justify-between cursor-pointer w-full mb-1.5 bg-white active:bg-color1 rounded-md focus:bg-blue text-left text-sm',
              { 'bg-color1 divide-x divide-x-white text-white ': active })}
            onClick={() => handleFilter(id)}
          >
            <span className="flex-1 py-2 pl-6">{name}</span>
            {active && (
              <Icon
                ariaLabel="close"
                name="close"
                size="sm"
                className="ml-3 h-full"
              />
            )}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-center p-3">
        <Icon
          ariaLabel="category-up"
          name="triangle_border"
          size="xlg"
          onClick={handleClick}
          className="p-2 mr-3 border-gray2 border-2 border-opacity-70 rounded-full"
        />
        <Icon
          ariaLabel="category-down"
          name="triangle_border"
          size="xlg"
          onClick={handleClick}
          className="p-2 border-gray2 border-2 border-opacity-70 rounded-full transform rotate-180"
        />
      </div>
    </div>
  );
};
export default Filters;
