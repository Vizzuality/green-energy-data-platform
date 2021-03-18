import React, { FC } from 'react';
import cx from 'classnames';

// components
import Icon from 'components/icon';

interface FiltersProps {
  color: string,
  className?: string,
}

const Card: FC<FiltersProps> = ({
  color,
  className = '',
}: FiltersProps) => (
  <div className={cx('flex flex-col justify-center text-center bg-gray1 p-5',
    { [className]: className })}
  >
    <div className="flex items-center justify-between">
      <div className="flex">
        <Icon ariaLabel="filters" name="filter" size="lg" className="mr-5" />
        <p>Filters:</p>
      </div>
      <p className={`underline text-sm text-${color}`}>Compare</p>
    </div>
    <div className="bg-white rounded">
      Use of Agricultural Machinery
    </div>
    <div className="flex">
      <Icon ariaLabel="filter-up" name="triangle_border" />
      <Icon ariaLabel="filter-down" name="triangle_border" className="transform -rotate-180" />
    </div>
  </div>
);

export default Card;
