import React, {
  FC,
  ReactNode,
} from 'react';
import cx from 'classnames';

import Footer from 'components/footer';
import PreFooter from 'components/pre-footer/component';

interface LayoutPageProps {
  className?: string,
  children: ReactNode,
}

const LayoutPage: FC<LayoutPageProps> = ({
  className = 'test',
  children,
}: LayoutPageProps) => (
  <div className={cx('relative min-h-screen', {
    [className]: !!className,
  })}
  >
    <>
      {children}
    </>
    <PreFooter />
    <Footer />
  </div>
);

export default LayoutPage;
