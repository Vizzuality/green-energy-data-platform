import React, { FC } from 'react';
import cx from 'classnames';

import { useColors } from 'hooks/utils';

interface WidgetLegendProps {
  categories: string[],
  className?: string,
}

const Legend: FC<WidgetLegendProps> = ({
  categories = [],
  className = '',
}: WidgetLegendProps) => {
  const colors = useColors(categories.length);
  return (
    <div className={cx('inline-flex flex-col justify-start text-center bg-white rounded-md border-gray5 border-6 hover:opacity-90 px-1.5 text-gray1 max-h-64',
      { [className]: className })}
    >
      <ul className="flex flex-col items-center my-2.5 py-2.5">
        {categories.map((item, index) => (
          <li
            key={item}
            className="flex items-center w-full active:bg-color1 rounded-md focus:bg-blue text-left text-sm"
          >
            <span
              className="w-4 h-4 ml-3 rounded-full"
              style={{ backgroundColor: !!colors && colors[index] }}
            />
            <span className="flex-1 py-1 pl-6 text-left">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Legend;
