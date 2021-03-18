import React, {
  FC,
  ReactNode,
} from 'react';
import classnames from 'classnames';

interface LayoutPageProps {
  className?: string,
  children: ReactNode,
}

const LayoutPage: FC<LayoutPageProps> = ({
  className = 'test',
  children,
}: LayoutPageProps) => (
  <div className={classnames({
    'l-simple-page': true,
    [className]: !!className,
  })}
  >
    {children}
  </div>
);

export default LayoutPage;
