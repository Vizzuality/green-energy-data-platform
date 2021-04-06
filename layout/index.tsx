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
    <div className="relative pb-20">
      {children}
    </div>
    <Footer className="absolute -bottom-18" />
  </div>
);

export default LayoutPage;
