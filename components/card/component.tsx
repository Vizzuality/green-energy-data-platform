import React, { FC, ReactNode } from 'react';
import cx from 'classnames';

interface CardProps {
  children: ReactNode,
  className?: string,
  theme?: 'dark' | 'light',
}

const THEME = {
  dark: 'bg-gray2 text-white divide-y divide-white divide-opacity-10',
  light: 'bg-gray1 divide-y divide-gray4 divide-opacity-90',
};

const Card: FC<CardProps> = ({
  children,
  className,
  theme,
}: CardProps) => (
  <div
    className={cx(`inline-flex flex-col items-center justify-center text-center rounded rounded-2lg hover:opacity-90
      ${THEME[theme]}`,
    { [className]: className })}
  >
    {children}
  </div>

);

Card.defaultProps = {
  className: '',
  theme: 'dark',
};

export default Card;
