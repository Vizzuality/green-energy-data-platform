import React, { FC } from 'react';
import cx from 'classnames';

// components
import Icon from 'components/icon';

interface FiltersProps {
  className?: string,
}

const Card: FC<FiltersProps> = ({
  className = '',
}: FiltersProps) => (
  <div className={cx('flex flex-col justify-center text-center bg-gray1 p-5',
    { [className]: className })}
  >
    <div className="flex">
      <Icon ariaLabel="filters" name="Filters" />
      <p>Filters:</p>
      <p className="underline text-sm">Compare</p>
    </div>
    <div className="bg-white rounded">
      Use of Agricultural Machinery
    </div>
    <div>
      <Icon ariaLabel="filter-up" name="triangle_boder" />
      <Icon ariaLabel="filter-down" name="triangle_boder" />
    </div>
  </div>
);

export default Card;
