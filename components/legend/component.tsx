import React, { FC } from 'react';
import cx from 'classnames';
import { colors } from '../../constants';

interface LegendProps {
  categories: { id: number, name: string, default?: boolean }[]
  className?: string,
}

const Legend: FC<LegendProps> = ({
  categories,
  className = '',
}: LegendProps) => (
  <div className={cx('inline-flex flex-col justify-center text-center rounded-md bg-gray1 hover:opacity-90 px-1.5',
    { [className]: className })}
  >

    <ul className="flex flex-col items-center">
      {categories.map(({ id, name }, index) => (
        <li
          key={id}
          className="flex justify-between cursor-pointer w-full mb-1.5 bg-white active:bg-color1 rounded-md focus:bg-blue text-left text-sm"
        >
          <span className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: colors[index] }} />
          <span className="flex-1 py-2 pl-6">{name}</span>

        </li>
      ))}
    </ul>
  </div>
);

export default Legend;
