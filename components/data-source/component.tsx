import React, { FC } from 'react';
import cx from 'classnames';

import Item from './item';

interface DataProps {
  className?: string,
  type?: 'vertical' | 'horizontal'
}

const downloadLinks = [
  { label: 'CSV', href: '' },
  { label: 'XML', href: '' },
  { label: 'EXCEL', href: '' },
];

const dataSourceLinks = [
  { label: 'Data Source', href: '' },
];

const Card: FC<DataProps> = ({
  className = '',
  type = 'vertical',
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
      className={cx(
        { 'justify-center rounded-l-2xl': type === 'horizontal' },
        { 'justify-start rounded-t-2xl': type === 'vertical' },
      )}
    />
    <Item
      icon="data"
      name="Data
      Source"
      links={dataSourceLinks}
      className={cx(
        { 'justify-center rounded-r-2xl': type === 'horizontal' },
        { 'justify-start rounded-b-2xl': type === 'vertical' },
      )}
    />
  </div>
);

export default Card;
