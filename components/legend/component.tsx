import React, {
  FC, useState, useCallback,
} from 'react';
import cx from 'classnames';

import { WidgetLegendProps } from './types';

const Legend: FC<WidgetLegendProps> = ({
  className = '',
  payload = [],
  onClick,
  interactive = false,
  singleValueLegendColor,
}: WidgetLegendProps) => {
  const [active, setActive] = useState(null);

  const handleClick = useCallback((label) => {
    onClick(label);
    setActive(label);
  }, [onClick]);

  return (
    <div className="inline-flex flex-col justify-start w-full p-4 text-center bg-white rounded-md max-h-72 border-gray5 border-6 hover:opacity-90 text-gray1">
      <ul className={cx('items-start', { [className]: className })}>
        {payload.map(({ label, color }) => (
          <li key={label}>
            <button
              key={label}
              type="button"
              className={cx('flex items-center rounded-md focus:bg-blue text-left text-sm w-full',
                {
                  'opacity-50': !!active && active !== label,
                  'font-bold': !!active && active === label,
                  // 'cursor': !interactive,
                  'cursor-pointer': !!interactive,
                })}
              disabled={!interactive}
              onClick={() => handleClick(label)}
            >
              <span
                className="flex flex-shrink-0 w-4 h-4 rounded-full"
                style={{ backgroundColor: singleValueLegendColor || color }}
              />
              <span title={label} className="py-1 pl-4 text-left truncate whitespace-nowrap text-ellipsis">{label}</span>
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
                className="flex items-center w-full text-sm text-left rounded-md focus:bg-blue whitespace-nowrap text-ellipsis"
              >
                <span
                  className="flex flex-shrink-0 w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: '#A97500',
                  }}
                />
                <span className="py-1 pl-4 text-left">All categories</span>
              </button>
            </li>
          )}
      </ul>
    </div>
  );
};

export default Legend;
