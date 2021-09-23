import React, { FC } from 'react';
import Link from 'next/link';

import cx from 'classnames';

import LanguageSelect from 'components/language-select';
import i18next from 'i18next';

interface FooterProps {
  className?: string,
}

const Footer: FC<FooterProps> = ({
  className = '',
}: FooterProps) => (
  <section className={cx('w-full bg-gray1 text-white absolute bottom-0',
    { [className]: className })}

  >
    <div className="flex w-full justify-around p-3 items-center">
      <Link href="/" passHref>
        <a href="/">
          <img alt="Green Energy Data Platform" src="/images/logo_GEDP.svg" className="w-28 h-auto" />
        </a>
      </Link>
      <div className="flex divide-x">
        <Link href="/privacy-policy" passHref>
          <a href="/privacy-policy" className="px-4 cursor-pointer">{i18next.t('privacy')}</a>
        </Link>
        <Link href="/terms-conditions" passHref>
          <a href="/terms-conditions" className="px-4 cursor-pointer">{i18next.t('terms')}</a>
        </Link>
      </div>
      <>
        <LanguageSelect />
      </>
    </div>
  </section>
);

export default Footer;
