import React, { FC, useState } from 'react';
import cx from 'classnames';

interface LegendProps {
  className?: string,
}

const Legend: FC<LegendProps> = ({
  className,
}: LegendProps) => {
  const [isCollapse, toggleCollapse] = useState(true);

  const handleClick = () => {
    toggleCollapse(!isCollapse);
  };

  return (
    <div className={cx('absolute bottom-10 left-2',
      {
        '-collapse': isCollapse,
        [className]: !!className,
      })}
    >

      <button
        aria-label="expand/collapse"
        type="button"
        onClick={handleClick}
        className={cx('focus:outline-none',
          { 'text-white': isCollapse },
          { 'text-color1': !isCollapse })}
      >
        Legend
      </button>
    </div>
  );
};

export default Legend;
