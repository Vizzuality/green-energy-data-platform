import React, { FC } from 'react';

import cx from 'classnames';

import type { LegendTypeChoroplethProps } from './types';

export const LegendTypeChoropleth: FC<LegendTypeChoroplethProps> = ({
  className = '',
  items,
}: LegendTypeChoroplethProps) => {
  const itemsFiltered = items.filter(({ value }) => !!value || value === 0);
  return (
    <div
      className={cx({
        [className]: !!className,
      })}
    >
      <ul className="flex w-full">
        {items.map(({ color }) => (
          <li
            key={`${color}`}
            className="flex-shrink-0 h-2"
            style={{
              width: `${100 / items.length}%`,
              backgroundColor: color,
            }}
          />
        ))}
      </ul>

      <ul className="flex justify-between">
        {itemsFiltered.map(({ color, value }) => (
          <li
            key={`${color}-${value}`}
            className="text-xs mt-1"
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LegendTypeChoropleth;
