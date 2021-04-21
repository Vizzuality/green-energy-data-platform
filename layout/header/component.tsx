import React, {
  FC,
  ReactChildren,
  ReactElement,
  ReactNode,
} from 'react';

interface HeaderProps {
  children?: ReactChildren | ReactElement<any, string> & ReactNode;
}

<<<<<<< HEAD
const Header: FC<HeaderProps> = ({ children }: HeaderProps) => (
  <div className="flex justify-between items-center px-12 py-2 border-b border-white border-opacity-30">
    <img alt="GEDP" src="/images/logo_GEDP.svg" className="w-36" />
    {children}
  </div>
);
=======
type HeaderProps = {
  className?: string,
};

const Header: FC<HeaderProps> = ({ className }: HeaderProps) => {
  const { user } = useMe();

  return (
    <div className={cx('flex justify-between items-center px-12 py-2',
      { [className]: !!className })}
    >
      <img alt="GEDP" src="/images/logo_GEDP.svg" className="w-32" />
      {user && user.id && (
        <div className="flex items-center">
          <UserDropdown className="mr-4" />
          <Button className="text-gray1 text-sm ml-3" theme="primary-background" size="xlg">Browse all data</Button>
        </div>
      )}
    </div>
  );
};
>>>>>>> WIP

export default Header;
