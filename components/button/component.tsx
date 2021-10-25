import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import cx from 'classnames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode | string,
  className?: string,
  type?: 'reset' | 'button' | 'submit',
  onClick?: (evt: any | '') => void,
  size?: 'sm' | 'md' | 'lg' | 'xlg',
  theme?: 'primary' | 'primary-background' | 'secondary' | 'secondary-background-dark' | 'secondary-background-light' | 'warning' | 'border-light' | 'border-dark' | 'active' | 'info'
  disabled?: boolean
}

const THEME = {
  primary:
    'border border-white bg-transparent text-white hover:text-opacity-50 hover:border-opacity-50 active:bg-white active:text-black',
  'primary-background': 'bg-white border-white text-gray1',
  secondary:
    'border border-gray2 hover:bg-gray2 hover:text-white',
  'secondary-background-dark': 'bg-gray1 text-white',
  'secondary-background-light': 'bg-white',

  // border
  warning: 'border border-warning text-warning',
  'border-light': 'border border-color-white text-white',
  'border-dark': 'border border-color-gray1 text-gray1',
  active: 'bg-gradient-color1',
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
  disabled = false,
  onClick,
  type = 'button',
}: ButtonProps) => (
  <button
    type={type}
    className={cx(`cursor-auto flex items-center justify-center text-center rounded-full focus:outline-none
    ${THEME[theme]}
    ${SIZE[size]}`,
    { 'font-bold': size === 'sm' && theme === 'primary' },
    { 'border-opacity-50 text-opacity-50': disabled },
    { 'cursor-pointer': !disabled },
    { [className]: className })}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
