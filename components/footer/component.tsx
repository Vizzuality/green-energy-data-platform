import React, { FC } from 'react';
import Link from 'next/link';

import cx from 'classnames';

import LanguageSelect from 'components/language-select';
import i18next from 'i18next';

interface FooterProps {
  className?: string,
}

// language keys
const privacy = i18next.t('privacy');
const terms = i18next.t('terms');

const Footer: FC<FooterProps> = ({
  className = '',
}: FooterProps) => (
  <section className={cx('w-full bg-gray1 text-white absolute bottom-0',
    { [className]: className })}

  >
    <div className="flex items-center justify-around w-full p-1">
      <Link href="/" passHref>
        <a href="/">
          <img alt="Green Energy Data Platform" src="/images/logo_GEDP.svg" className="h-auto w-28" />
        </a>
      </Link>
      <div className="flex divide-x">
        <Link href="/privacy-policy" passHref>
          <a href="/privacy-policy" className="px-4 cursor-pointer">{privacy}</a>
        </Link>
        <Link href="/terms-conditions" passHref>
          <a href="/terms-conditions" className="px-4 cursor-pointer">{terms}</a>
        </Link>
      </div>
      <LanguageSelect />
    </div>
  </section>
);

export default Footer;
