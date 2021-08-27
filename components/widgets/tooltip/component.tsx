import React, { FC } from 'react';
import cx from 'classnames';

// import { format } from 'd3-format';

type PayloadProps = {
  fill: string,
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
}

// const formatValue = format(',.4p');

const Tooltip: FC<TooltipProps> = ({
  className,
  payload,
}: TooltipProps) => {
  if (!payload) return null;
  return (
    <div className={cx('inline-flex flex-col justify-center text-center bg-gray1 rounded-2xl hover:opacity-90 px-5 py-2',
      { [className]: className })}
    >
      <ul className="flex flex-col items-center text-white text-sm">
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
            <span className="flex-1 py-1 pl-6">{name}</span>
            <span className="flex-1 py-1 pl-6">{value.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tooltip;
