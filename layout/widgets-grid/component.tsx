import React, { FC } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import { InView } from 'react-intersection-observer';

// hooks
import { useRouter } from 'next/router';
import { useGroup } from 'hooks/groups';

import { AxiosRequestConfig } from 'axios';

import i18next from 'i18next';
import GridItem from './item';

interface WidgetsGridProps {
  className?: string,
}

const WidgetsGrid: FC<WidgetsGridProps> = ({
  className,
}: WidgetsGridProps) => {
  const router = useRouter();
  const { query: { group: groupSlug } } = router;
  const { data: group }: AxiosRequestConfig = useGroup(groupSlug, {
    refetchOnWindowFocus: false,
    placeholderData: {
      subgroups: [],
    },
  });

  const { subgroups } = group;

  return (
    <section className="grid grid-cols-3 grid-flow gap-x-3 gap-y-6.5 py-11">
      {subgroups?.map(({
        slug: subgroupSlug,
        default_indicator,
      }) => {
        const {
          id,
          name,
          slug: indicatorSlug,
          default_visualization: defaultVisualization,
        } = default_indicator;

        return (
          <InView key={id} triggerOnce>
            {({ ref, inView }) => (
              <div
                key={`${groupSlug}-${indicatorSlug}`}
                ref={ref}
                className={cx('cursor-pointer w-full h-72 bg-white rounded-2.5xl shadow text-gray-900 px-7 py-4',
                  { [className]: className })}
              >
                {(inView && (
                  <Link href={`/${groupSlug}/${subgroupSlug}/${indicatorSlug}`} passHref>
                    <a key={`${groupSlug}-${indicatorSlug}`} href={`/${groupSlug}/${subgroupSlug}/${indicatorSlug}`}>
                      <span key={`${groupSlug}-${indicatorSlug}`}>{name}</span>
                      <GridItem
                        key={`${groupSlug}-${indicatorSlug}`}
                        group={groupSlug}
                        subgroup={subgroupSlug}
                        indicator={indicatorSlug}
                        indicatorId={id}
                        defaultVisualization={defaultVisualization}
                      />
                    </a>
                  </Link>
                ))}
              </div>
            )}
          </InView>
        );
      })}
      <div
        key="other-indicators"
        className={cx('w-full h-72 bg-gradient-color1 rounded-2.5xl',
          { [className]: className })}
      >
        <Link key="other-indicators" href="/indicators" passHref>
          <a key="other-indicators" href="/indicators" className="w-full h-full items-center flex justify-center m-auto p-6 text-lg">
            {i18next.t('otherIndicators')}
          </a>
        </Link>
      </div>
    </section>
  );
};

export default WidgetsGrid;
