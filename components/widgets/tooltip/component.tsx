import React, { FC } from 'react';
import cx from 'classnames';

import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

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
  label?: string | number,
}

const Tooltip: FC<TooltipProps> = ({
  className,
  label,
  payload,
}: TooltipProps) => {
  const filters = useSelector((state: RootState) => (state.indicator));

  if (!payload) return null;

  const unit = payload[0]?.payload?.unit;
  const { visualization } = filters;
  const labelSlug = visualization === 'bar' ? 'province' : 'year';

  return (
    <div className={cx('inline-flex flex-col justify-center text-white text-center text-sm bg-gray1 rounded-2xl hover:opacity-90 px-5 py-2',
      { [className]: className })}
    >
      {(label || unit) && (
        <div className="flex-1 py-1 border-b border-opacity-50 mb-2 px-2 space-x-6">
          {label && (
            <span>
              {i18next.t(labelSlug)}
              :
              {' '}
              {label}
            </span>
          )}
          {unit && (
            <span>
              {i18next.t('unit')}
              :
              {' '}
              {unit}
            </span>
          )}
        </div>
      )}
      <ul className="flex flex-col items-center text-xs max-h-128 overflow-y-auto pointer-events-auto">
        {payload.map(({
          name, value, color, payload: { fill },
        }) => (
          <li
            key={name}
            className="flex items-center w-full active:bg-color1 rounded-md focus:bg-blue"
          >
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color || fill }}
            />
            <span className="flex flex-1 justify-between max-w-[300px]">
              <p className="text-left py-1 pl-2 truncate text-ellipsis overflow-hidden">{name}</p>
              <span className="py-1 pl-4 font-bold">{value.toFixed(2)}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tooltip;
