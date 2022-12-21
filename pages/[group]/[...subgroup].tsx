import React, {
  FC,
} from 'react';
import {
  QueryClient,
  useQueryClient,
} from 'react-query';
import { useRouter } from 'next/router';
import { dehydrate } from 'react-query/hydration';
import store from 'store/store';

// hooks
import { useIndicator } from 'hooks/indicators';
import { useGroup } from 'hooks/groups';
import { useSubgroup } from 'hooks/subgroups';

// components
import Head from 'components/head';
import Nav from 'components/nav';
import SubgroupsDropdown from 'components/subgroups-dropdown';
import EnergyBalanceSubgroupsDropdown from 'components/energy-balance-subgroups-dropdown';
import PreFooter from 'components/pre-footer/component';

// services
import { fetchIndicator } from 'services/indicators';

// layout
import LayoutPage from 'layout';
import Hero from 'layout/hero';
import IndicatorData from 'layout/indicator-data';
import EnergyBalanceIndicatorData from 'layout/energy-balance-indicator-data';
import WidgetsGrid from 'layout/widgets-grid';

// types
import type { AxiosRequestConfig } from 'axios';

interface GroupPageTypes {
  groupSlug: string,
}

const GroupPage: FC<GroupPageTypes> = ({ groupSlug }: GroupPageTypes) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { query: { subgroup: subgroupQuery, locale } } = router;
  const lang = locale || 'en';
  const subgroupSlug = subgroupQuery?.[0];
  const indicatorSlug = subgroupQuery?.[1];

  const { data: group } = useGroup(groupSlug, {
    refetchOnWindowFocus: false,
    placeholderData: [],
  },
  {
    locale: lang,
  });
  const {
    data,
  }: AxiosRequestConfig = useIndicator(groupSlug, subgroupSlug, indicatorSlug, {
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
  }, {
    locale: lang,
  });

  const { data: subgroup } = useSubgroup(groupSlug, subgroupSlug, {
    refetchOnWindowFocus: false,
  });

  return (
    <LayoutPage className="text-white bg-gradient-gray1">
      <Head title={`${groupSlug} analysis`} />
      <Hero className="px-8 lg:px-32 md:px-24 sm:px-16">
        <Nav className="mt-6" />
        {groupSlug !== 'energy-balance' && <SubgroupsDropdown group={group} data={data} subgroup={subgroup} />}
        {groupSlug === 'energy-balance' && <EnergyBalanceSubgroupsDropdown group={group} data={data} />}
      </Hero>
      <div className="container pb-20 m-auto">
        <section className="z-10 max-w-6xl m-auto -mt-40">
          {groupSlug !== 'energy-balance' && <IndicatorData />}
          {groupSlug === 'energy-balance' && <EnergyBalanceIndicatorData />}
          {/* {groupSlug !== 'energy-flows' && groupSlug !== 'energy-balance' && <WidgetsGrid />} */}
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
    locale,
  } = query;
  const subgroupSlug = subgroup?.[0];
  const indicatorSlug = subgroup?.[1];

  const queryClient = new QueryClient();
  // prefetch indicator
  await queryClient.prefetchQuery(
    ['indicator', indicatorSlug, locale],
    () => fetchIndicator(
      groupSlug, subgroupSlug, 'indicatorSlug',
      { locale },
      { enabled: indicatorSlug },
    ),
  );

  return ({
    props: ({
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      groupSlug,
    }),
  });
};

export default GroupPage;
