import React, { FC, useState, useCallback } from 'react';
import cx from 'classnames';

import { WidgetLegendProps } from './types';

const Legend: FC<WidgetLegendProps> = ({
  className = '',
  payload = [],
  onClick,
  interactive = false,
}: WidgetLegendProps) => {
  const [active, setActive] = useState(null);

  const handleClick = useCallback((label) => {
    onClick(label);
    setActive(label);
  }, [onClick]);

  return (
    <div className="w-full max-h-72 inline-flex flex-col justify-start text-center bg-white rounded-md border-gray5 border-6 hover:opacity-90 px-1.5 text-gray1">
      <ul className={cx('items-start my-2.5 py-2.5', { [className]: className })}>
        {payload.map(({ label, color }) => (
          <li key={label}>
            <button
              key={label}
              type="button"
              className={cx('flex items-center rounded-md focus:bg-blue text-left text-sm whitespace-nowrap w-full',
                {
                  'opacity-50': !!active && active !== label,
                  'font-bold': !!active && active === label,
                  'cursor-none': !interactive,
                  'cursor-pointer': !!interactive,
                })}
              disabled={!interactive}
              onClick={() => handleClick(label)}
            >
              <span
                className="flex w-4 h-4 ml-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: color }}
              />
              <span className="py-1 pl-6 text-left truncate">{label}</span>
            </button>
          </li>
        ))}
        {!!active
          && (
            <li key="all">
              <button
                key="all-button"
                type="button"
                disabled={!interactive}
                onClick={() => handleClick(null)}
                className="flex items-center rounded-md focus:bg-blue text-left text-sm whitespace-nowrap w-full text-ellipsis"
              >
                <span
                  className="flex w-4 h-4 ml-3 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: '#A97500',
                  }}
                />
                <span className="py-1 pl-6 text-left">All categories</span>
              </button>
            </li>
          )}
      </ul>
    </div>
  );
};

export default Legend;
