import React, {
  FC,
} from 'react';

// components
import Head from 'components/head';
import Dropdown from 'components/select';
import Nav from 'components/nav';
import LoadingSpinner from 'components/loading-spinner';

// layout
import LayoutPage from 'layout';
import Hero from 'layout/hero';
import IndicatorData from 'layout/indicator-data';
import WidgetsGrid from 'layout/widgets-grid';

// services
import { fetchGroup, fetchGroups } from 'services/groups';
import { fetchSubgroup } from 'services/subgroups';
import { fetchIndicators } from 'services/indicators';

import { GroupProps, SubgroupProps, IndicatorsProps } from 'types/data';

import { relatedIndicators } from '../../constants';

interface GroupPageProps {
  group: GroupProps,
  groups: GroupProps[],
  subgroup: SubgroupProps,
  indicators: IndicatorsProps[],
}

const GroupPage: FC<GroupPageProps> = ({
  groups,
  group,
  subgroup,
  indicators,
}: GroupPageProps) => {
  if (!groups || !group || !subgroup || !indicators) return <LoadingSpinner />;

  const {
    default_subgroup,
    subgroups,
  } = group;

  return (
    <LayoutPage className="text-white bg-gradient-gray1 pb-20">
      <Head title={`${group.name} analysis`} />
      <Hero>
        <Nav items={groups} className="pt-10" />
        <div className="flex items-center">
          <h1 className="text-5.5xl pt-3">{default_subgroup}</h1>
          <Dropdown
            menuElements={subgroups}
            border
            className="ml-3"
            icon="triangle_border"
            iconSize="lg"
            shape="circle"
            theme="light"
          />
        </div>
      </Hero>
      <div className="container m-auto">
        <section className="-mt-40">
          <IndicatorData
            defaultIndicator={subgroup?.default_indicator || subgroup?.indicators[0]}
            groups={groups}
            subgroups={subgroups}
            subgroup={subgroup}
          />
          <WidgetsGrid items={relatedIndicators} />
        </section>
      </div>

    </LayoutPage>
  );
};

export const getServerSideProps = async (req) => {
  // TO DO - update when API gets ready to search by slug
  // const {
  //   group: groupQueryParam,
  //   subgroup: subgroupQueryParam,
  // } = req.query;

  const groupQueryParam = '066bc939-a3cb-40f3-a4b3-21ad8fe9aef9';
  const subgroupQueryParam = '69598aad-9db8-4e7a-9594-7125fc3a4d20';
  // enable when we rely on an external API, not NextJS API
  const groups = await fetchGroups();
  const group = await fetchGroup(groupQueryParam);
  const subgroup = await fetchSubgroup(groupQueryParam, subgroupQueryParam);
  const indicators = await fetchIndicators(groupQueryParam, subgroupQueryParam);

  // temporary workaround to work with NextJS API. Remove when external API is used.
  // const group = GROUPS.find(({ slug }) => groupQueryParam === slug);
  // const subgroup = SUBGROUPS.find(({ slug }) => subgroupQueryParam === slug);

  return ({
    props: {
      groups,
      group,
      subgroup,
      indicators,
    },
  });
};

export default GroupPage;
