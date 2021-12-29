import React, { FC } from 'react';
import cx from 'classnames';

import { TooltipProps } from '../types';

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
      <ul className="items-center text-white text-sm">
        {payload.map(({
          name, value,
        }) => {
          const nameFormat = name.replace(' - ', ' > ');
          return (
            <li
              key={name}
              className="flex flex-col w-full rounded-md focus:bg-blue items-start text-left"
            >
              <span className="flex-1 py-1 w-full px-6 border-b border-white border-opacity-20">{nameFormat}</span>
              <div className="flex flex-col py-1 px-6">
                <span>{indicatorName}</span>
                <div className="flex items-center">
                  <span className="text-lg mr-2">{value.toFixed(2)}</span>
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