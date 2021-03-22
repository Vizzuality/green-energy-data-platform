import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import cx from 'classnames';

interface FooterProps {
  className?: string,
}

const LanguageSelect = dynamic(() => import('components/language-select'), { ssr: false });

const Footer: FC<FooterProps> = ({
  className = '',
}: FooterProps) => (
  <section className={cx('bg-gray2 text-white divide-y divide-white divide-opacity-10',
    { [className]: className })}

  >
    <div className="text-xl flex w-full justify-center">
      <Link href="/energy" passHref>
        <a className="p-12" href="/energy">Energy</a>
      </Link>
      <Link href="/socio-economic" passHref>
        <a className="p-12" href="/socio-economic">Socio-economic</a>
      </Link>
      <Link href="/coal-power-plants" passHref>
        <a className="p-12" href="/coal-power-plants">Coal Power Plants</a>
      </Link>
    </div>
    <div className="flex w-full justify-around p-6 items-center">
      <div className="text-xl">GEDP LOGO</div>
      <div className="flex divide-x">
        <p className="px-4">Privacy Policy</p>
        <p className="px-4">Terms of Service</p>
      </div>
      <div>
        <LanguageSelect />
      </div>
    </div>
  </section>
);

export default Footer;
