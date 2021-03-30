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
  <section className={cx('bg-gray2 text-white',
    { [className]: className })}

  >
    <div className="flex w-full justify-around p-6 items-center">
      <img alt="GEDP" src="images/logo_GEDP.svg" />
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
