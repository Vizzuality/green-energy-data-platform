import React, {
  FC,
  ReactChildren,
  ReactElement,
  ReactNode,
} from 'react';

interface HeaderProps {
  children?: ReactChildren | ReactElement<any, string> & ReactNode;
}

const Header: FC<HeaderProps> = ({ children }: HeaderProps) => (
  <div className="flex justify-between items-center px-12 py-2 border-b border-white border-opacity-30">
    <img alt="GEDP" src="images/logo_GEDP.svg" className="w-36" />
    {children}
  </div>
);

export default Header;
