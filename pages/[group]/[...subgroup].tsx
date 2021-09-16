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

  const { data: group } = useGroup(groupSlug as '', {
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
      visualizationTypes: [],
      group: null,
      subgroup: null,
    },
    refetchOnWindowFocus: false,
  }));

  return (
    <LayoutPage className="text-white bg-gradient-gray1">
      <Head title={`${data?.name} analysis`} />
      <Hero className="lg:px-32 md:px-20">
        <Nav className="pt-10" />
        <Tooltip
          placement="bottom-start"
          className=""
          visible={dropdownVisibility}
          interactive
          onClickOutside={() => { setDropdownVisibility(false); }}
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
                  <button
                    type="button"
                    className="px-5 cursor-pointer w-full py-2 flex"
                    onClick={() => handleSubgroupChange(`/${group.slug}/${sgSlug}/${_indicatorSlug}`)}
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        >
          <button
            type="button"
            className="flex items-center"
            onClick={() => { setDropdownVisibility(!dropdownVisibility); }}
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
      <div className="container m-auto pb-20">
        <section className="max-w-6xl m-auto -mt-40 ">
          <IndicatorData />
          <WidgetsGrid />
        </section>
      </div>

      <section className="flex pb-23">
        <PreFooter />
      </section>
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
