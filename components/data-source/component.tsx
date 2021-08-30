import React, { FC } from 'react';
import cx from 'classnames';

import Item from './item';

interface DataProps {
  className?: string,
  type?: 'vertical' | 'horizontal',
  indicatorSlug?: string
}

const downloadLinks = [
  { label: 'CSV', format: 'csv' },
  { label: 'XML', format: 'xml' },
  { label: 'JSON', format: 'json' },
];

const dataSourceLinks = [
  { label: 'Data Source', format: '' },
];

const Card: FC<DataProps> = ({
  className = '',
  type = 'vertical',
  indicatorSlug,
}: DataProps) => (
  <div className={cx('flex divide-gray4 divide-opacity-90 text-center bg-gray5 text-gray1 rounded-2xl',
    { [className]: className },
    { 'divide-y flex-col': type === 'vertical' },
    { 'divide-x flex-row': type === 'horizontal' })}
  >
    <Item
      icon="download"
      name="Download"
      links={downloadLinks}
      className={cx('p-6',
        { 'justify-center rounded-l-2xl': type === 'horizontal' },
        { 'justify-start rounded-t-2xl': type === 'vertical' })}
      indSlug={indicatorSlug}

    />
    <Item
      icon="data"
      name="Data
      Source"
      links={dataSourceLinks}
      className={cx('p-6',
        { 'justify-center rounded-r-2xl': type === 'horizontal' },
        { 'justify-start rounded-b-2xl': type === 'vertical' })}
    />
  </div>
);

export default Card;
