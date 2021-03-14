import React, { FC } from 'react';
import cx from 'classnames';

interface IconProps {
  ariaLabel: string,
  name: string,
  className?: string,
  size?: 'sm' | 'md' | 'lg',
  group?: number,
}

const SIZE = {
  sm: 'w-2\.5 h-2\.5',
  md: 'w-3\.5 h-2\.5',
  lg: 'w-6 h-6',
};

const Icon: FC<IconProps> = ({
  ariaLabel,
  name = '',
  size = 'md',
  group = 1,
  className,
}: IconProps) => {
  const classNames = cx(
    SIZE[size],
    { [className]: className },
  );

  return (
    <svg
      aria-label={ariaLabel}
      className={cx(`flex-shrink-0 ${classNames}`, { [`fill-color${group}`]: !!group })}
    >
      <use xlinkHref={`#icon-${name}`} />
    </svg>
  );
};

export default Icon;
