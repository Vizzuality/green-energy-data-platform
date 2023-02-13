import React, {
  FC,
  ReactChildren,
  ReactElement,
  ReactNode,
} from 'react';
import Link from 'next/link';
import cx from 'classnames';
import { useRouter } from 'next/router';

interface HeaderProps {
  children?: ReactChildren | ReactElement<any, string> & ReactNode | ReactElement,
  className?: string,
  theme?: string
}

const THEME = {
  light: 'logo_GEDP.svg',
  dark: 'logo_GEDP_dark.svg',
};

const Header: FC<HeaderProps> = ({ children, className, theme = 'light' }: HeaderProps) => {
  const { query: { locale } } = useRouter();
  return (
    <div className={cx('flex justify-between items-center px-12 py-2 border-b border-white border-opacity-30 relative',
      { [className]: !!className })}
    >
      <>
        <Link href={{ pathname: '/', query: { locale } }}>
          <img
            alt="GEDP"
            src={`/images/${THEME[theme]}`}
            className="w-36"
          />
        </Link>

        { children }
      </>
    </div>
  );
};

export default Header;
