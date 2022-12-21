import React, { FC } from 'react';
import cx from 'classnames';
import { format } from 'd3-format';

import { TooltipProps } from '../types';

const numberFormat = format(',.2f');

const Tooltip: FC<TooltipProps> = ({
  className,
  payload,
  indicatorName,
  unit,
}: TooltipProps) => {
  if (!payload) return null;
  return (
    <div className={cx('inline-flex flex-col justify-center text-center bg-gray1 rounded-2xl hover:opacity-90 z-50',
      { [className]: className })}
    >
      <ul className="items-center text-sm text-white">
        {payload.map(({
          name, value,
        }) => {
          const nameFormat = name.replace(' - ', ' > ');
          return (
            <li
              key={name}
              className="flex flex-col items-start w-full text-left rounded-md focus:bg-blue"
            >
              <span className="flex-1 w-full px-6 py-1 border-b border-white border-opacity-20">{nameFormat}</span>
              <div className="flex flex-col px-6 py-1">
                <span>{indicatorName}</span>
                <div className="flex items-center">
                  <span className="mr-2 text-lg">{numberFormat(value)}</span>
                  <span className="text-sm">{unit}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Tooltip;
