import React, { FC } from 'react';
import cx from 'classnames';

import Link from 'next/link';
import { useGroups } from 'hooks/groups';

interface GroupCardProps {
  className?: string;
}

const GroupCard: FC<GroupCardProps> = ({
  className,
}: GroupCardProps) => {
  const { groups } = useGroups();
  if (!groups) return null;
  return (
    <div className={cx('w-full', { [className]: className })}>
      {groups.map(({
        id,
        slug,
        title,
        subtitle,
        description,
        subgroups,
      }, index) => (
        <div key={id} className={cx('flex justify-around', { 'flex-row-reverse': index % 2 !== 0 })}>
          <div className="m-16 max-w-md">
            <h3 className="text-3.5xl text-gray3">{title}</h3>
            <h4 className="text-2.5xl text-color1 pb-2 text-bold leading-loose">{subtitle}</h4>
            <p className="text-sm leading-7 my-9">{description}</p>
            <Link href={`/${slug}/${subgroups[0].slug}`} passHref>
              <a href={`/${slug}/${subgroups[0].slug}`} className="py-3 px-6 text-sm text-white rounded-full bg-gradient-color1">Discover</a>
            </Link>
          </div>
          <img src={`/images/landing/${slug}.png`} alt={id} className="rounded-4xl bg-shadow max-w-md m-16" />
        </div>
      ))}
    </div>
  );
};

export default GroupCard;
