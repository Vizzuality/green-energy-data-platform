import React, { FC } from 'react';
import cx from 'classnames';

import { WidgetLegendProps } from './types';

const Legend: FC<WidgetLegendProps> = ({
  className = '',
  payload = [],
}: WidgetLegendProps) => (
  <div className="w-full max-h-72 inline-flex flex-col justify-start text-center bg-white rounded-md border-gray5 border-6 hover:opacity-90 px-1.5 text-gray1">
    <ul className={cx('items-start my-2.5 py-2.5', { [className]: className })}>
      {payload.map(({ label, color }) => (
        <li
          key={label}
          className="flex items-center rounded-md focus:bg-blue text-left text-sm whitespace-nowrap w-full text-ellipsis"
        >
          <span
            className="flex w-4 h-4 ml-3 rounded-full shrink"
            style={{ backgroundColor: color }}
          />
          <span className="py-1 pl-6 text-left">{label}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default Legend;
