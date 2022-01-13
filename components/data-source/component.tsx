import React, { FC } from 'react';
import cx from 'classnames';

import { useRouter } from 'next/router';

import i18next from 'i18next';
import Item from './item';

interface DataProps {
  className?: string,
  type?: 'vertical' | 'horizontal',
  indicatorSlug: string,
  dataSource: string,
}

const downloadLinks = [
  { label: 'CSV', format: 'csv' },
  { label: 'XML', format: 'xml' },
  { label: 'JSON', format: 'json' },
];

const Card: FC<DataProps> = ({
  className = '',
  type = 'vertical',
  indicatorSlug,
  dataSource,
}: DataProps) => {
  const router = useRouter();
  const { subgroup } = router.query;
  const indSlug = indicatorSlug || subgroup?.[1];

  return (
    <div className={cx('flex divide-gray4 divide-opacity-90 text-center bg-gray5 text-gray1 rounded-2xl',
      { [className]: className },
      { 'divide-y flex-col': type === 'vertical' },
      { 'divide-x flex-row': type === 'horizontal' })}
    >
      <Item
        icon="download"
        name={i18next.t('download')}
        links={downloadLinks}
        className={cx('p-6',
          { 'justify-center rounded-l-2xl': type === 'horizontal' },
          { 'justify-start rounded-t-2xl': type === 'vertical' })}
        indSlug={indSlug}
      />
      <Item
        icon="data"
        name={i18next.t('dataSource')}
        source={dataSource}
        className={cx('p-6',
          { 'justify-center rounded-r-2xl': type === 'horizontal' },
          { 'justify-start rounded-b-2xl': type === 'vertical' })}
        indSlug={indSlug}
      />
    </div>
  );
};

export default Card;
