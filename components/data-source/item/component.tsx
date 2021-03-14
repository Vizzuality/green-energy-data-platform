import React, { FC } from 'react';
import cx from 'classnames';

import Icon from 'components/icon';

interface LinkProps {
  label: string,
  href: string
}

interface ItemProps {
  icon: string,
  name: string,
  links: LinkProps[],
  className?: string,
}

const Item: FC<ItemProps> = ({
  icon,
  name,
  links,
  className = '',
}: ItemProps) => (
  <div className="inline-flex flex-col s-center justify-center text-center rounded rounded-2lg bg-gray1 divide-y divide-gray4 divide-opacity-90 hover:opacity-90">
    <div
      className={cx('flex w-full s-start justify-start p-5',
        { [className]: className })}
    >
      <Icon name={icon} size="lg" className="mr-5" />
      <div className="flex flex-col">
        <p className="inline-flex text-base">{name}</p>
        <ul className="flex">
          {links.map(({ label, href }) => (
            <li className="text-color1 text-sm pr-3.75 underline" key={label}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default Item;
