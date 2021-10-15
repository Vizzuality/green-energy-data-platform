import React, { FC, useState } from 'react';
import cx from 'classnames';

import Icon from 'components/icon';

import { useColors } from 'hooks/utils';

interface LegendProps {
  className?: string,
  categories: string[]
}

const Legend: FC<LegendProps> = ({
  className,
  categories,
}: LegendProps) => {
  const [isCollapse, toggleCollapse] = useState(true);
  const [visibility, setVisibility] = useState(true);

  const handleClick = () => {
    toggleCollapse(!isCollapse);
  };

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  const colors = useColors(categories.length);

  return (
    <div className={cx('absolute text-left bottom-2 left-2 w-3/6 bg-gray1 rounded-3xl text-sm text-white',
      {
        'divide-y divide-white divide-opacity-30': isCollapse,
        [className]: !!className,
      })}
    >

      <button
        aria-label="expand/collapse"
        type="button"
        onClick={handleClick}
        className="text-left py-1.5 px-4 relative w-full focus:outline-none"
      >
        Legend
        <Icon
          ariaLabel={isCollapse ? 'expand legend' : 'collapse legend'}
          name="triangle_border"
          className={cx(
            'absolute right-5 top-1/2 transform -translate-y-1/2',
            { 'transform rotate-180': isCollapse },
          )}
        />
      </button>
      <div className={cx('py-1.5 px-4', { hidden: isCollapse })}>
        <div className="flex justify-between py-2">
          <p className="font-bold">Title</p>
          <div className="flex">
            <Icon ariaLabel="view layer" name={visibility ? 'view' : 'hide'} className="mr-3.75 text-white" onClick={handleVisibility} />
            <Icon ariaLabel="layer opacity" name="opacity" className="text-white" />
          </div>
        </div>
        <ul>
          {categories.map((category, index) => (
            <li key={category} className="flex items-center pb-3">
              <span className="w-3.75 h-3.75 rounded-full mr-3" style={{ backgroundColor: colors[index] }} />
              <span>{category}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Legend;
