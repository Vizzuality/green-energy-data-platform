import React, { FC } from 'react';
import cx from 'classnames';

import Icon from 'components/icon';

interface LinkProps {
  label: string,
  href: string,
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
  <div className={cx('w-full m-auto cursor-pointer inline-flex flex-grow text-center divide-y divide-gray4 divide-opacity-90 hover:bg-gray1 hover:bg-opacity-90 hover:text-white',
    { [className]: className })}
  >
    <div className="items-center inline-flex w-full lg:px-10 md:p-5">
      <Icon ariaLabel={name} color="text-color1" name={icon} size="lg" className="mr-5" />
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
