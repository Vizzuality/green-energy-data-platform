import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import cx from 'classnames';

import LanguageSelect from 'components/language-select';
import i18next from 'i18next';

interface FooterProps {
  className?: string,
}

const Footer: FC<FooterProps> = ({
  className = '',
}: FooterProps) => {
  const router = useRouter();
  const { query: { locale } } = router;
  // language keys
  const privacy = i18next.t('privacy');
  const terms = i18next.t('terms');
  return (
    <section className={cx('w-full bg-gray1 text-white absolute bottom-0',
      { [className]: className })}
    >
      <div className="flex items-center justify-around w-full p-1">
        <Link href={{ pathname: '/', query: { locale } }}>
          <img alt="Green Energy Data Platform" src="/images/logo_GEDP.svg" className="h-auto w-28" />
        </Link>
        <div className="flex divide-x">
          <Link
            href={{ pathname: '/privacy-policy', query: { locale } }}
            className="px-4 cursor-pointer"
          >
            {privacy}
          </Link>
          <Link href={{ pathname: '/terms-conditions', query: { locale } }} className="px-4 cursor-pointer">
            {terms}
          </Link>
        </div>
        <LanguageSelect />
      </div>
    </section>
  );
};

export default Footer;
