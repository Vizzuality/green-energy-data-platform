import React, { FC } from 'react';
import cx from 'classnames';

import { WidgetLegendProps } from './types';

const Legend: FC<WidgetLegendProps> = ({
  className = '',
  payload = [],
}: WidgetLegendProps) => (
  <div className={cx('inline-flex flex-col justify-start text-center bg-white rounded-md border-gray5 border-6 hover:opacity-90 px-1.5 text-gray1 max-h-28 overflow-y-auto',
    { [className]: className })}
  >
    <ul className="flex flex-col items-center my-2.5">
      {payload.map(({ label, color }) => (
        <li
          key={label}
          className="flex items-center active:bg-color1 rounded-md focus:bg-blue text-left text-sm"
        >
          <span
            className="w-4 h-4 ml-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="flex-1 py-1 pl-6 text-left">{label}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default Legend;
