import React, { FC, useState, useCallback } from 'react';
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
  const [activeCategories, setActives] = useState(categories);
  const handleClick = (direction) => {
    direction === 'up' ? console.log('scroll up') : console.log('scroll down');
  };

  const handleFilter = useCallback((id: number) => {
    const categoriesUpdate = activeCategories.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          active: !c.active,
        };
      }
      return {
        ...c,
      };
    });
    setActives(categoriesUpdate);
  }, [activeCategories]);

  return (
    <div className={cx('inline-flex flex-col justify-center text-center rounded-md bg-gray5 hover:opacity-90 px-1.5 text-gray1',
      { [className]: className })}
    >
      <div className="flex justify-start py-3.5 px-6 ">
        <div className="flex">
          <Icon ariaLabel="filters" name="filter" size="lg" className="mr-5" />
          <p>Filters:</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        {activeCategories.map(({ id, name, active }) => (
          <button
            key={`${id}`}
            name={name}
            type="button"
            className={cx('flex justify-between cursor-pointer w-full mb-1.5 bg-white active:bg-color1 rounded-md focus:bg-blue text-left text-sm items-center',
              { 'bg-color1 text-white': active })}
            onClick={() => handleFilter(id)}
          >
            <span className="flex-1 py-2 pl-6 border-r border-r-white">{name}</span>
            {active && (
              <div className="h-full flex justify-center items-center">
                <Icon
                  ariaLabel="close"
                  name="close"
                  size="sm"
                  className="mx-3"
                />
              </div>
            )}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-center p-3">
        <Icon
          ariaLabel="category-up"
          name="triangle_border"
          size="xlg"
          onClick={() => handleClick('up')}
          className="cursor-pointer p-2 mr-3 border-gray2 border-2 border-opacity-70 rounded-full hover:bg-gray1 hover:bg-opacity-90 hover:text-white"
        />
        <Icon
          ariaLabel="category-down"
          name="triangle_border"
          size="xlg"
          onClick={() => handleClick('down')}
          className="cursor-pointer p-2 border-gray2 border-2 border-opacity-70 rounded-full transform rotate-180 hover:bg-gray1 hover:bg-opacity-90 hover:text-white"
        />
      </div>
    </div>
  );
};
export default Filters;
