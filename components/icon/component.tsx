import React, { FC } from 'react';
import cx from 'classnames';

interface IconProps {
  name: string,
  className?: string,
  size?: 'sm' | 'md' | 'lg',
  style?: object,
}

const SIZE = {
  sm: 'w-2\.5 h-2\.5',
  md: 'w-3\.5 h-2\.5',
  lg: 'w-6 h-6',
};

const Icon: FC<IconProps> = ({
  name,
  size,
  className,
  style,
}: IconProps) => {
  const classNames = cx(
    SIZE[size],
    { [className]: className },
  );

  return (
    <svg className={`flex-shrink-0 ${classNames}`} style={style}>
      <use xlinkHref={`#icon-${name}`} />
    </svg>
  );
};

Icon.defaultProps = {
  className: '',
  size: 'md',
  style: {},
};

export default Icon;
