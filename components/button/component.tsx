import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import cx from 'classnames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: 'button' | 'submit' | 'reset',
  children?: ReactNode,
  className?: string,
  size?: 'sm' | 'md' | 'lg',
  theme?: 'primary' | 'secondary' | 'tertiary' | 'info',
}

const THEME = {
  primary: 'border-white bg-transparent text-white hover:opacity-50 hover:bg-white active:bg-white active:text-black',
  secondary: 'border-gray2 bg-white hover:bg-gray2 hover:text-white',
  tertiary: 'bg-white border-white',
  info: 'bg-color2 border-color2 text-white',
};

const SIZE = {
  sm: 'w-7.5 h-7.5 px-0 text-sm',
  md: 'py-0.5 px-4',
  lg: 'py-0.5 px-6',
};

const Button: FC<ButtonProps> = ({
  buttonType = 'button',
  children = Button,
  className,
  theme = 'primary',
  size = 'md',
  disabled,
}: ButtonProps) => (
  <button
    type={buttonType}
    className={cx(`flex items-center justify-center text-center border-2 rounded-full bold focus:outline-none
    ${THEME[theme]}
    ${SIZE[size]}`,
    { 'font-bold': size === 'sm' && theme === 'primary' },
    { 'border-opacity-50 text-opacity-50': disabled },
    { [className]: className })}
  >
    {children}
  </button>
);

export default Button;
