import React, { FC } from 'react';
import cx from 'classnames';

interface IconProps {
  ariaLabel: string,
  name: string,
  className?: string,
  size?: 'sm' | 'md' | 'lg' | 'xlg' | '2xlg',
  color?: string,
  onClick?: (evt:any) => void,
}

const SIZE = {
  sm: 'w-2.5 h-2.5',
  md: 'w-3.5 h-3.5',
  lg: 'w-5 h-5',
  xlg: 'w-8 h-8',
  '2xlg': 'w-12 h-12',
};

const Icon: FC<IconProps> = ({
  ariaLabel,
  name = '',
  size = 'md',
  color,
  className,
  onClick,
}: IconProps) => {
  const classNames = cx(
    SIZE[size],
    { [className]: className },
  );

  return (
    <svg
      aria-label={ariaLabel}
      className={cx(`flex-shrink-0 w- ${classNames} fill-current`, { [`text-${color}`]: color && !!color.length })}
      onClick={onClick}
    >
      <use xlinkHref={`#icon-${name}`} />
    </svg>
  );
};

export default Icon;
