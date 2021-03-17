import React, { FC } from 'react';
import cx from 'classnames';

import Item from './item';

interface DataProps {
  className?: string,
  color?: string,
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
  color = '',
}: DataProps) => (
  <div className={cx('inline-flex flex-col s-center justify-center text-center bg-gray1 hover:opacity-90 rounded-2xl',
    { [className]: className })}
  >
    <Item ariaLabel="download" color={color} className="rounded-t-2xl border-b border-gray4 border-opacity-90" icon="download" name="Download" links={downloadLinks} />
    <Item ariaLabel="data-source" color={color} className=" rounded-b-2xl" icon="data" name="Data Source" links={dataSourceLinks} />
  </div>
);

export default Card;
