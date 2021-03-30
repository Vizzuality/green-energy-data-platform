import React, { FC } from 'react';
import cx from 'classnames';

// components
import Icon from 'components/icon';

import { filtersList } from '../../constants';

interface FiltersProps {
  className?: string,
}

const Card: FC<FiltersProps> = ({
  className = '',
}: FiltersProps) => (
  <div className={cx('inline-flex flex-col justify-center text-center rounded-md bg-gray1 hover:opacity-90',
    { [className]: className })}
  >
    <div className="flex items-center justify-around py-3.5">
      <div className="flex">
        <Icon ariaLabel="filters" name="filter" size="lg" className="mr-5" />
        <p>Filters:</p>
      </div>
      <p className="underline text-sm text-color1">Compare</p>
    </div>
    <ul className="px-1.5">
      {filtersList.map((filter) => (
        <li key={filter} className="mb-1.5 py-2 px-6 bg-white active:bg-color1 rounded-md text-sm text-left">{filter}</li>
      ))}
    </ul>
  </div>
);

export default Card;
