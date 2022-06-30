import React, {
  FC,
  useCallback,
  useState,
} from 'react';
import cx from 'classnames';
import {
  QueryClient,
  useQueryClient,
} from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { useRouter } from 'next/router';
import store from 'store/store';

// components
import Head from 'components/head';
import Nav from 'components/nav';
import Tooltip from 'components/tooltip';
import Icon from 'components/icon';
import PreFooter from 'components/pre-footer/component';

// services
import { fetchIndicator } from 'services/indicators';

// layout
import LayoutPage from 'layout';
import Hero from 'layout/hero';
import IndicatorData from 'layout/indicator-data';
import WidgetsGrid from 'layout/widgets-grid';

// hooks
import { useGroup } from 'hooks/groups';
import { useIndicator } from 'hooks/indicators';

// types
import { AxiosRequestConfig } from 'axios';

const GroupPage: FC = () => {
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { query: { group: groupSlug, subgroup: subgroupQuery } } = router;
  const subgroupSlug = subgroupQuery?.[0];
  const indicatorSlug = subgroupQuery?.[1];

  const handleSubgroupChange = useCallback((url) => {
    setDropdownVisibility(false);
    router.push(url);
  }, [router]);

  const { data: group } = useGroup(groupSlug, {
    refetchOnWindowFocus: false,
    placeholderData: {
      subgroups: [],
    },
  });

  const {
    data,
  }: AxiosRequestConfig = useIndicator(groupSlug, subgroupSlug, indicatorSlug, ({
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
      visualization_types: [],
      group: null,
      subgroup: null,
    },
    refetchOnWindowFocus: false,
  }));

  const { default_visualization: defaultVisualization } = data;

  return (
    <LayoutPage className="text-white bg-gradient-gray1">
      <Head title={`${data?.name} analysis`} />
      <Hero className="px-8 lg:px-32 md:px-24 sm:px-16">
        <Nav className="mt-10" />
        {group.subgroups.length > 1 ? (
          <Tooltip
            placement="bottom-start"
            visible={dropdownVisibility}
            interactive
            onClickOutside={() => { setDropdownVisibility(false); }}
            content={(
              <ul
                className="z-10 flex flex-col justify-center w-full divide-y divide-white shadow-sm rounded-xl bg-gray3 divide-opacity-10"
              >
                {group.subgroups.map(({
                  slug: sgSlug, id, name, default_indicator,
                }) => {
                  const indSlug = default_indicator?.slug || group.subgroups[0].slug;
                  return (
                    <li
                      key={id}
                      className="text-white divide-y divide-white first:rounded-t-xl last:rounded-b-xl hover:bg-white hover:text-gray3 divide-opacity-10"
                    >
                      <button
                        type="button"
                        className="flex w-full px-5 py-2 cursor-pointer"
                        onClick={() => handleSubgroupChange(`/${group.slug}/${sgSlug}/${indSlug}`)}
                      >
                        {name}
                      </button>
                    </li>
                  );
                })}
              </ul>
          )}
          >
            <button
              type="button"
              className="flex items-center pt-3"
              onClick={() => { setDropdownVisibility(!dropdownVisibility); }}
            >
              <h1 className="text-5.5xl text-left">
                {data?.subgroup?.name}
              </h1>
              <Icon
                ariaLabel="collapse dropdown"
                name="triangle_border"
                size="3xlg"
                className={cx('ml-3 border-2 text-white border-white border-opacity-30 hover:bg-color1 rounded-full p-4',
                  { 'transform -rotate-180': false })}
              />
            </button>
          </Tooltip>
        ) : (
          <h1 className="text-5.5xl text-left">
            {data?.subgroup?.name}
          </h1>
        )}
      </Hero>
      <div className="container pb-20 m-auto">
        <section className="z-10 max-w-6xl m-auto -mt-40">
          <IndicatorData />
          {!defaultVisualization?.includes('sankey') && <WidgetsGrid />}
        </section>
      </div>

      <PreFooter />

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

  const { language: { current } } = store.getState();
  const queryClient = new QueryClient();
  // prefetch indicator
  await queryClient.prefetchQuery(
    ['indicator', indicatorSlug, current],
    () => fetchIndicator(groupSlug, subgroupSlug, indicatorSlug, { locale: current }),
  );

  return ({
    props: ({
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    }),
  });
};

export default GroupPage;
