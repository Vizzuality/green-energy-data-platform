import React, { FC } from 'react';
import cx from 'classnames';

import Link from 'next/link';

import { useDefaultIndicator } from 'hooks/indicators';

interface GroupProps {
  description: string,
  id: string,
  name: string,
  slug: string,
  subtitle: string,
}

interface GroupCardProps {
  index?: number,
  group: GroupProps,
  className?: string,
}

const GroupCard: FC<GroupCardProps> = ({
  index,
  group,
  className,
}: GroupCardProps) => {
  const {
    id,
    slug,
    name,
    subtitle,
    description,
  } = group;

  const defaultData = useDefaultIndicator(group);
  const { default_indicator: { slug: indicatorSlug }, slug: subgroupSlug } = defaultData;

  return (
    <div className={cx('w-full', { [className]: className })}>
      <div key={id} className={cx('flex justify-around', { 'flex-row-reverse': index % 2 !== 0 })}>
        <div className="m-16 max-w-md">
          <h3 className="text-3.5xl text-gray3">{name}</h3>
          <h4 className="text-2.5xl text-color1 pb-2 text-bold leading-loose">{subtitle}</h4>
          <p className="text-sm leading-7 my-9">{description}</p>
          <Link href={`/${slug}/${subgroupSlug}/${indicatorSlug}`} passHref>
            <a href={`/${slug}/${subgroupSlug}/${indicatorSlug}`} className="py-3 px-6 text-sm text-white rounded-full bg-gradient-color1">Discover</a>
          </Link>
        </div>
        <img src={`/images/landing/${slug}.png`} alt={slug} className="rounded-4xl bg-shadow max-w-md m-16" />
      </div>

    </div>
  );
};

export default GroupCard;
