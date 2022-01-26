import React, { FC } from 'react';
import cx from 'classnames';

import { TooltipProps } from '../types';

const Tooltip: FC<TooltipProps> = ({
  className,
  data,
  indicatorName,
  unit,
}: TooltipProps) => {
  if (!data) return null;
  const { source, target, value } = data;

  return (
    <div className={cx('h-full w-full inline-flex flex-col justify-center text-center bg-gray1 rounded-2xl hover:opacity-90 z-50 text-white',
      { [className]: className })}
    >
      <span className="flex-1 py-1 w-full px-6 border-b border-white border-opacity-20">
        {source.name}
        {' > '}
        {target.name}
      </span>
      <div className="flex flex-col py-1 px-6">
        <span>{indicatorName}</span>
        <div className="flex items-center">
          <span className="text-lg mr-2">{value.toFixed(2)}</span>
          <span className="text-sm">{unit}</span>
        </div>
      </div>
    </div>

  );
};

export default Tooltip;
