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

  // language keys
  const labelSlugLang = i18next.t(labelSlug);
  const unitLang = i18next.t('unit');

  return (
    <div className={cx('inline-flex flex-col justify-center text-white text-center text-sm bg-gray1 rounded-2xl hover:opacity-90 px-5 py-2',
      { [className]: className })}
    >
      {(label || unit) && (
        <div className="flex-1 px-2 py-1 mb-2 space-x-6 border-b border-opacity-50">
          {label && (
            <span>
              {labelSlugLang}
              :
              {' '}
              {label}
            </span>
          )}
          {unit && (
            <span>
              {unitLang}
              :
              {' '}
              {unit}
            </span>
          )}
        </div>
      )}
      <ul className="flex flex-col items-center overflow-y-auto text-xs pointer-events-auto max-h-128">
        {payload.map(({
          name, value, color, payload: { fill },
        }) => (
          <li
            key={name}
            className="flex items-center w-full rounded-md active:bg-color1 focus:bg-blue"
          >
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color || fill }}
            />
            <span className="flex flex-1 justify-between max-w-[300px] items-center">
              <p title={name} className="py-1 pl-2 overflow-hidden text-left truncate whitespace-normal text-ellipsis">{name}</p>
              {typeof value === 'number' && <span className="py-1 pl-4 font-bold">{value.toFixed(2)}</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tooltip;
