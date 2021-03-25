import React, {
  FC,
  ReactNode,
} from 'react';
import cx from 'classnames';

import Footer from 'components/footer';

interface LayoutPageProps {
  className?: string,
  children: ReactNode,
}

const LayoutPage: FC<LayoutPageProps> = ({
  className = 'test',
  children,
}: LayoutPageProps) => (
  <div className={cx('min-h-screen relative', {
    [className]: !!className,
  })}
  >
    {children}
    <Footer className="absolute bottom-0 left-0 right-0" />
  </div>
);

export default LayoutPage;
