import React, { FC } from 'react';
import cx from 'classnames';

import i18next from 'i18next';

type PayloadProps = {
  fill: string,
  unit?: string
};

type CategoriesProps = {
  name: string,
  value: number,
  color: string,
  fill: string,
  payload?: PayloadProps
};

interface TooltipProps {
  className?: string,
  payload?: CategoriesProps[],
  label?: string | number
}

const Tooltip: FC<TooltipProps> = ({
  className,
  label,
  payload,
}: TooltipProps) => {
  if (!payload) return null;

  const unit = payload[0]?.payload?.unit;

  return (
    <div className={cx('inline-flex flex-col justify-center text-white text-center bg-gray1 rounded-2xl hover:opacity-90 px-5 py-2 z-50',
      { [className]: className })}
    >
      {label && unit && (
      <div className="flex-1 py-1 border-b border-opacity-50 mb-2">
        <span className="pl-6">
          {i18next.t('year')}
          :
          {' '}
          {label}
        </span>
        <span className="pl-6">
          {i18next.t('unit')}
          :
          {' '}
          {unit}
        </span>
      </div>
      )}
      <ul className="flex flex-col items-center  text-sm">
        {payload.map(({
          name, value, color, payload: { fill },
        }) => (
          <li
            key={name}
            className="flex items-center w-full active:bg-color1 rounded-md focus:bg-blue text-left text-sm"
          >
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: color || fill }}
            />
            <span className="py-1 pl-6">{name}</span>
            <span className="py-1 pl-6">{value.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tooltip;
