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
  <div className={cx('relative', {
    [className]: !!className,
  })}
  >
    <>
      {children}
    </>
    <Footer />
  </div>
);

export default LayoutPage;
