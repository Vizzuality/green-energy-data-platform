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
  className?: string;
}

const WidgetsGrid: FC<WidgetsGridProps> = ({ className }: WidgetsGridProps) => {

  // language keys
  const otherIndicators = i18next.t('otherIndicators');

  const router = useRouter();
  const {
    query: { group: groupSlug, locale },
  } = router;
  const lang = locale || 'en';
  const { data: group }: AxiosRequestConfig = useGroup(groupSlug, {
    refetchOnWindowFocus: false,
    placeholderData: {
      subgroups: [],
    },

  },
  {
    locale: lang,
  });

  const { subgroups } = group;

  return (
    <section className="grid grid-cols-3 grid-flow gap-x-3 gap-y-6.5 py-11">
      {subgroups?.map(({ slug: subgroupSlug, default_indicator }) => {
        if (!default_indicator) return null;
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
                className={cx(
                  'cursor-pointer w-full h-72 bg-white rounded-2.5xl shadow text-gray-900 px-7 py-4',
                  { [className]: className },
                )}
              >
                {inView && (
                  <Link
                    key={`${groupSlug}-${indicatorSlug}`}
                    href={{ pathname: `/${groupSlug}/${subgroupSlug}/${indicatorSlug}`, query: { locale } }}
                  >
                    <>
                      <p
                        title={name}
                        className="max-w-[100%] max-h-[50px] inline-block text-ellipsis overflow-hidden whitespace-nowrap"
                        key={`${groupSlug}-${indicatorSlug}`}
                      >
                        {name}
                      </p>
                      <GridItem
                        key={`${groupSlug}-${indicatorSlug}`}
                        group={groupSlug}
                        subgroup={subgroupSlug}
                        indicator={indicatorSlug}
                        indicatorId={id}
                        defaultVisualization={defaultVisualization}
                      />
                    </>
                  </Link>
                )}
              </div>
            )}
          </InView>
        );
      })}
      <div
        key="other-indicators"
        className={cx('w-full h-72 bg-gradient-color1 rounded-2.5xl', {
          [className]: className,
        })}
      >
        <Link
          key="other-indicators"
          className="flex items-center justify-center w-full h-full p-6 m-auto text-lg"
          href={{ pathname: '/indicators', query: { locale } }}
        >
          {otherIndicators}
        </Link>
      </div>
    </section>
  );
};

export default WidgetsGrid;
