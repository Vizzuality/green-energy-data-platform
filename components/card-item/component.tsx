import React, { FC } from 'react';
import cx from 'classnames';

import Icon from 'components/icon';

interface LinkProps {
  label: string,
  href: string
}

interface CardItemProps {
  icon: string,
  name: string,
  links: LinkProps[],
  className?: string,
}

const CardItem: FC<CardItemProps> = ({
  icon,
  name,
  links,
  className,
}: CardItemProps) => (
  <div
    className={cx('flex w-full items-start justify-start p-5',
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

);

CardItem.defaultProps = {
  className: '',
};

export default CardItem;
