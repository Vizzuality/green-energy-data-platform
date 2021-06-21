import React, {
  FC,
  ReactChildren,
  ReactElement,
  ReactNode,
} from 'react';

import cx from 'classnames';

interface HeaderProps {
  children?: ReactChildren | ReactElement<any, string> & ReactNode,
  className?: string
}

const Header: FC<HeaderProps> = ({ children, className }: HeaderProps) => (
  <div className={cx('flex justify-between items-center px-12 py-2 border-b border-white border-opacity-30',
    { [className]: !!className })}
  >
    <img alt="GEDP" src="/images/logo_GEDP.svg" className="w-36" />
    { children }
  </div>
);

export default Header;
