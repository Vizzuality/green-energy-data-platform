import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import cx from 'classnames';

interface FooterProps {
  className?: string,
}

const LanguageSelect = dynamic(() => import('components/language-select'), { ssr: false });

const Footer: FC<FooterProps> = ({
  className = '',
}: FooterProps) => (
  <section className={cx('w-full bg-gray1 text-white absolute bottom-0',
    { [className]: className })}

  >
    <div className="flex w-full justify-around p-2 items-center">
      <img alt="GEDP" src="/images/logo_GEDP.svg" className="w-28 h-auto" />
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
