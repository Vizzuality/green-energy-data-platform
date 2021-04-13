import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import cx from 'classnames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode | string,
  className?: string,
  onClick?: (evt: any | '') => void,
  size?: 'sm' | 'md' | 'lg' | 'xlg',
  theme?: 'primary' | 'primary-background' | 'secondary' | 'secondary-background' | 'info'
}

const THEME = {
  primary:
    'border-white bg-transparent text-white hover:text-opacity-50 hover:border-opacity-50 active:bg-white active:text-black',
  'primary-background': 'bg-white border-white',
  secondary:
    'border-gray2 hover:bg-gray2 hover:text-white',
  'secondary-background-dark': 'bg-button border-gray2 text-white',
  'secondary-background-light': 'bg-white',
  info: 'bg-color2 border-color2 text-white',
};

const SIZE = {
  sm: 'w-7.5 h-7.5 px-0 text-sm',
  md: 'py-0.5 px-4',
  lg: 'py-0.5 px-6',
  xlg: 'py-2.5 px-6 text-sm',
};

const Button: FC<ButtonProps> = ({
  children,
  className,
  theme = 'primary-background',
  size = 'md',
  disabled,
  onClick,
}: ButtonProps) => (
  <button
    type="button"
    className={cx(`flex items-center justify-center text-center rounded-full focus:outline-none
    ${THEME[theme]}
    ${SIZE[size]}`,
    { 'font-bold': size === 'sm' && theme === 'primary' },
    { 'border-opacity-50 text-opacity-50': disabled },
    { [className]: className })}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
