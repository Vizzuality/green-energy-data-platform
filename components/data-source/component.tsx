import React, { FC } from 'react';
import cx from 'classnames';

import Item from './item';

interface DataProps {
  className?: string,
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
}: DataProps) => (
  <div className={cx('inline-flex flex-col s-center justify-center text-center bg-gray1 divide-y divide-gray4 divide-opacity-90 hover:opacity-90',
    { [className]: className })}
  >
    <Item className="rounded-t-2xl" icon="download" name="Download" links={downloadLinks} />
    <Item className="rounded-b-2xl" icon="download" name="Download" links={dataSourceLinks} />
  </div>
);

export default Card;
