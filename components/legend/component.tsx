import React, { FC } from 'react';
import cx from 'classnames';

import { colors } from '../../constants';

interface LegendProps {
  categories: { id: number, name: string, active?: boolean }[]
  className?: string,
}

const Legend: FC<LegendProps> = ({
  categories,
  className = '',
}: LegendProps) => (
  <div className={cx('inline-flex flex-col justify-center text-center bg-white rounded-md border-gray5 border-6 hover:opacity-90 px-1.5 text-gray1',
    { [className]: className })}
  >
    <ul className="flex flex-col items-center my-2.5">
      {categories.map(({ id, name }, index) => (
        <li
          key={id}
          className="flex items-center w-full active:bg-color1 rounded-md focus:bg-blue text-left text-sm"
        >
          <span
            className="w-4 h-4 ml-3 rounded-full"
            style={{ backgroundColor: colors[index] }}
          />
          <span className="flex-1 py-1 pl-6">{name}</span>
        </li>
      ))}
    </ul>
  </div>
);
export default Legend;
