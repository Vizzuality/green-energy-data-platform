import React, { FC } from 'react';
import Link from 'next/link';
import cx from 'classnames';

interface PreFooterProps {
  className?: string,
}

const PreFooter: FC<PreFooterProps> = ({
  className = '',
}: PreFooterProps) => (
  <div className={cx('bg-gray1 text-white border-b border-white border-opacity-10',
    { [className]: className })}
  >
    <div className="text-xl flex w-full justify-center">
      <Link href="/energy" passHref>
        <a className="p-12" href="/energy">Energy</a>
      </Link>
      <Link href="/socio-economic" passHref>
        <a className="p-12" href="/socio-economic">Socio-economic</a>
      </Link>
      <Link href="/coal-power-plant" passHref>
        <a className="p-12" href="/coal-power-plant">Coal Power Plants</a>
      </Link>
    </div>
  </div>
);

export default PreFooter;
