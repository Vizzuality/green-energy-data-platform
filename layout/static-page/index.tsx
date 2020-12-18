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
  className,
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

StaticPage.defaultProps = { className: 'test' };

export default StaticPage;
