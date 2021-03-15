import React, {
  FC,
  ReactNode,
} from 'react';
import classnames from 'classnames';

interface StaticPageProps {
  className?: string,
  children: ReactNode,
}

const StaticPage: FC<StaticPageProps> = ({
  className = 'test',
  children,
}: StaticPageProps) => (
  <div className={classnames({
    'l-simple-page': true,
    [className]: !!className,
  })}
  >
    {children}
  </div>
);

export default StaticPage;
