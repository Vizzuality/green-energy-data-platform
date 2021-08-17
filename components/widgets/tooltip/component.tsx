import React, { FC } from 'react';
import cx from 'classnames';

// import { format } from 'd3-format';

type PayloadProps = {
  fill: string,
};

type CategoriesProps = {
  name: string,
  value: number,
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
    <div className={cx('inline-flex flex-col justify-center text-center bg-white rounded-md border-gray5 border-6 hover:opacity-90 px-1.5 text-gray1 max-h-64',
      { [className]: className })}
    >
      <ul className="flex flex-col items-center my-2.5 py-2.5">
        {payload.map(({ name, value, payload: { fill } }) => (
          <li
            key={name}
            className="flex items-center w-full active:bg-color1 rounded-md focus:bg-blue text-left text-sm"
          >
            <span
              className="w-4 h-4 ml-3 rounded-full"
              style={{ backgroundColor: fill }}
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
