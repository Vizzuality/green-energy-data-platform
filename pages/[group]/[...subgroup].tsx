import React, {
  FC,
} from 'react';
import cx from 'classnames';
import {
  QueryClient,
  useQueryClient,
} from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { useRouter } from 'next/router';
import Link from 'next/link';

// components
import Head from 'components/head';
import Nav from 'components/nav';
import Tooltip from 'components/tooltip';
import Icon from 'components/icon';

// services
import { fetchIndicator } from 'services/indicators';

// layout
import LayoutPage from 'layout';
import Hero from 'layout/hero';
import IndicatorData from 'layout/indicator-data';
import WidgetsGrid from 'layout/widgets-grid';

// hooks
import { useGroup } from 'hooks/groups';
import { useSubgroup } from 'hooks/subgroups';
import { useIndicator } from 'hooks/indicators';

const GroupPage: FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { query: { group: groupQuery, subgroup: subgroupQuery } } = router;
  const subgroupSlug = subgroupQuery?.[0];
  const indicatorSlug = subgroupQuery?.[1];

  const { data: group } = useGroup(groupQuery, {
    refetchOnWindowFocus: false,
    placeholderData: {
      subgroups: [],
    },
  });
  const { data: subgroup } = useSubgroup(groupQuery, subgroupSlug, {
    refetchOnWindowFocus: false,
  });

  const {
    data,
  } = useIndicator(groupQuery, subgroupSlug, indicatorSlug, ({
    placeholderData: queryClient.getQueryData(`indicator-${indicatorSlug}`) || {
      records: [],
      categories: [],
      category_filters: {},
      default_visualization: null,
      description: null,
      end_date: null,
      id: null,
      name: null,
      published: false,
      start_date: null,
      visualizationTypes: [],
      group: null,
      subgroup: null,
    },
    refetchOnWindowFocus: false,
  }));

  return (
    <LayoutPage className="text-white bg-gradient-gray1 pb-20">
      <Head title={`${data?.group?.name} analysis`} />
      <Hero>
        <Nav className="pt-10" />
        <Tooltip
          trigger="click"
          placement="bottom-start"
          content={(
            <ul
              className="justify-center flex flex-col w-full z-10 rounded-xl bg-gray3 divide-y divide-white divide-opacity-10"
            >
              {group.subgroups.map(({
                slug: sgSlug, id, name, default_indicator: { slug: _indicatorSlug },
              }) => (
                <li
                  key={id}
                  className="text-white first:rounded-t-xl last:rounded-b-xl hover:bg-white hover:text-gray3 divide-y divide-white divide-opacity-10"
                >
                  <Link href={`/${group.slug}/${sgSlug}/${_indicatorSlug}`} passHref>
                    <a href={`/${group.slug}/${sgSlug}/${_indicatorSlug}`} className="px-5 cursor-pointer w-full py-2 flex">{name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        >
          <button
            type="button"
            className="flex items-center"
          >
            <h1 className="text-5.5xl pt-3">
              {data?.subgroup?.name}
            </h1>
            <Icon
              ariaLabel="collapse dropdown"
              name="triangle_border"
              size="2xlg"
              className={cx('ml-3 border-2 text-white border-white border-opacity-30 hover:bg-color1 rounded-full p-4',
                { 'transform -rotate-180': false })}
            />
          </button>
        </Tooltip>
      </Hero>
      <div className="container m-auto">
        <section className="-mt-40">
          <IndicatorData />

          <WidgetsGrid items={subgroup?.relatedIndicators} />
        </section>
      </div>

    </LayoutPage>
  );
};

export const getServerSideProps = async ({ query }) => {
  const {
    group: groupSlug,
    subgroup,
  } = query;

  const subgroupSlug = subgroup?.[0];
  const indicatorSlug = subgroup?.[1];

  if (!indicatorSlug) {
    return ({
      notFound: true,
    });
  }

  const queryClient = new QueryClient();

  // prefetch indicator
  await queryClient.prefetchQuery(
    `indicator-${indicatorSlug}`,
    () => fetchIndicator(groupSlug, subgroupSlug, indicatorSlug),
  );

  return ({
    props: ({
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    }),
  });
};

export default GroupPage;
