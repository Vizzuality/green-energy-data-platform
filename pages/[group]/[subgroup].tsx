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

// import { GroupProps, SubgroupProps, IndicatorsProps } from 'types/data';

import { useGroups, useGroup } from 'hooks/groups';
import { useSubgroup } from 'hooks/subgroups';
import { useIndicators, useIndicator, useIndicatorData } from 'hooks/indicators';
import { useRecord } from 'hooks/records';

import { RELATED_INDICATORS } from 'constants/api-payloads';
import { useRouter } from 'next/router';

// interface GroupPageProps {
//   group: GroupProps,
//   groups: GroupProps[],
//   subgroup: SubgroupProps,
//   indicators: IndicatorsProps[],
// }

const GroupPage: FC = () => {
  // get slugs, ids for hook TO - DO - change when API works by slugs

  // const router = useRouter();
  // const { group: groupId, subgroup: subgroupId } = router.query;

  const groupId = '066bc939-a3cb-40f3-a4b3-21ad8fe9aef9';
  const subgroupId = '69598aad-9db8-4e7a-9594-7125fc3a4d20';
  const indicatorId = '3efd7616-8833-4c31-a070-3000796f3597';

  const { groups } = useGroups();
  const { data: group } = useGroup(groupId);
  const { data: subgroup } = useSubgroup(groupId, subgroupId);
  const { data: indicators } = useIndicators(groupId, subgroupId);


  const indicatorData = useIndicatorData(groupId, subgroupId);

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
          <WidgetsGrid items={RELATED_INDICATORS} />
        </section>
      </div>

    </LayoutPage>
  );
};

export default GroupPage;
