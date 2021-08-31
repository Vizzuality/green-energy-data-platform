import React, {
  FC,
  ReactChildren,
  ReactElement,
  ReactNode,
} from 'react';
import Link from 'next/link';
import cx from 'classnames';

interface HeaderProps {
  children?: ReactChildren | ReactElement<any, string> & ReactNode,
  className?: string,
  theme?: string
}

const THEME = {
  light: 'logo_GEDP.svg',
  dark: 'logo_GEDP_dark.svg',
};

const Header: FC<HeaderProps> = ({ children, className, theme = 'light' }: HeaderProps) => (
  <div className={cx('flex justify-between items-center px-12 py-2 border-b border-white border-opacity-30',
    { [className]: !!className })}
  >
    <Link href="/" passHref>
      <a href="/">
        <img
          alt="GEDP"
          src={`/images/${THEME[theme]}`}
          className="w-36"
        />
      </a>
    </Link>

    { children }
  </div>
);

export default Header;
