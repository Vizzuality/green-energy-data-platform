import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import cx from 'classnames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel: string,
  buttonType?: 'button' | 'submit' | 'reset',
  children?: ReactNode,
  className?: string,
  size?: 'sm' | 'md' | 'lg',
  theme?: 'border' | 'background' | 'info',
}

const THEME = {
  border: 'border-white bg-transparent text-white hover:opacity-50 active:bg-white active:text-black',
  background: 'border-gray2 bg-white hover:bg-gray2 hover:text-white',
  info: 'bg-color2 border-color2 text-white',
};

const SIZE = {
  sm: 'w-7.5 h-7.5 px-0 text-sm font-bold',
  md: 'py-0.5 px-4',
  lg: 'py-0.5 px-6',
};

const Button: FC<ButtonProps> = ({
  ariaLabel,
  buttonType,
  children,
  className,
  theme,
  size,
  disabled,
}: ButtonProps) => (
  <button
    type={buttonType}
    aria-label={ariaLabel}
    className={cx(`flex items-center justify-center text-center border-2 rounded-full bold focus:outline-none
    ${THEME[theme]}
    ${SIZE[size]}`,
    { 'opacity-50': disabled },
    { [className]: className })}
  >
    {children}
  </button>
);

Button.defaultProps = {
  buttonType: 'button',
  children: Button,
  className: '',
  theme: 'border',
  size: 'sm',
};

export default Button;
