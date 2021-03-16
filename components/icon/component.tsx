import React, { FC } from 'react';
import cx from 'classnames';

interface IconProps {
  ariaLabel: string,
  name: string,
  className?: string,
  size?: 'sm' | 'md' | 'lg' | 'xlg',
  color?: string,
}

const SIZE = {
  sm: 'w-2\.5 h-2\.5',
  md: 'w-3.5 h-auto',
  lg: 'w-5 h-5',
  xlg: 'w-6 h-6',
};

const Icon: FC<IconProps> = ({
  ariaLabel,
  name = '',
  size = 'md',
  color,
  className,
}: IconProps) => {
  const classNames = cx(
    SIZE[size],
    { [className]: className },
  );

  return (
    <svg
      aria-label={ariaLabel}
      className={cx(`${classNames} fill-current`, { [`text-${color}`]: !!color })}
    >
      <use xlinkHref={`#icon-${name}`} />
    </svg>
  );
};

export default Icon;
