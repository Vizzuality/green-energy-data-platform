import React, { FC } from 'react';
import cx from 'classnames';
import { format } from 'd3-format';

import type { LegendTypeChoroplethProps } from './types';

const numberFormat = format(',.0f');

export const LegendTypeChoropleth: FC<LegendTypeChoroplethProps> = ({
  className = '',
  items,
}: LegendTypeChoroplethProps) => (
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

    <ul className="flex justify-between w-full mt-1">
      {items.map(({ color, value }) => (
        value && (
        <li
          key={`${color}-${value}`}
          className="flex-shrink-0 text-xs text-center"
          style={{
            width: `${100 / items.length}%`,
          }}
        >
          {numberFormat(value)}
        </li>
        )
      ))}
    </ul>

  </div>
);

export default LegendTypeChoropleth;
