import React, { FC } from 'react';
import cx from 'classnames';
import Link from 'next/link';

// hooks
import { useRouter } from 'next/router';
import { useGroup } from 'hooks/groups';

import { AxiosRequestConfig } from 'axios';

import GridItem from './item';

interface WidgetsGridProps {
  className?: string,
}

const WidgetsGrid: FC<WidgetsGridProps> = ({
  className,
}: WidgetsGridProps) => {
  const router = useRouter();
  const { query: { group: groupSlug } } = router;
  const { data: group }: AxiosRequestConfig = useGroup(groupSlug as '', {
    refetchOnWindowFocus: false,
    placeholderData: {
      subgroups: [],
    },
  });

  const { subgroups } = group;

  return (
    <section className="grid grid-cols-3 grid-flow gap-x-3 gap-y-6.5 py-11">
      {subgroups.map(({
        slug: subgroupSlug,
        default_indicator,
      }) => {
        const {
          id,
          name,
          slug: indicatorSlug,
          default_visualization: visualization,
        } = default_indicator;
        return (
          <div
            key={id}
            className={cx('cursor-pointer w-full h-72 bg-white rounded-2.5xl shadow text-gray-900 px-7 py-4',
              { [className]: className })}
          >
            <div>{name}</div>
            <GridItem
              group={groupSlug}
              subgroup={subgroupSlug}
              indicator={indicatorSlug}
              visualization={visualization}
            />
          </div>
        );
      })}
      <div
        className={cx('w-full h-72 bg-gradient-color1 rounded-2.5xl',
          { [className]: className })}
      >
        <Link href="/indicators" passHref>
          <a href="/indicators" className="w-full h-full items-center flex justify-center m-auto p-6 text-lg cursor-pointer">
            View datasets for other indicators
          </a>
        </Link>
      </div>
    </section>
  );
};

export default WidgetsGrid;
