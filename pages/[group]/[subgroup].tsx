import React, {
  FC,
} from 'react';


// components
import LayoutPage from 'layout';
import Head from 'components/head';
import Hero from 'layout/hero';
import Nav from 'components/nav';
import Dropdown from 'components/select';
import IndicatorsData from 'layout/indicator-data';
import WidgetsGrid from 'layout/widgets-grid';

// services
import { fetchGroup, fetchGroups } from 'services/groups';
import { fetchSubgroup } from 'services/subgroups';

import { GroupProps, SubgroupProps } from 'types/data';

import {
  GROUPS,
  SUBGROUPS,
} from 'constants/api-payloads';

import { relatedIndicators } from '../../constants';

interface GroupPageProps {
  group: GroupProps,
  groups: GroupProps[],
  subgroup: SubgroupProps
}

const GroupPage: FC<GroupPageProps> = ({
  groups,
  group,
  subgroup,
}: GroupPageProps) => {
  const { title: groupName } = group;

  return (
    <LayoutPage className="text-white bg-gradient-gray1 pb-20">
      <Head title={`${groupName} analysis`} />
      <Hero>
            {/* <Nav items={groups} className="pt-10" /> */}
        <div className="flex items-center">
          <h1 className="text-5.5xl pt-3">{subgroup.name}</h1>
          <Dropdown
            menuElements={group.subgroups}
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
          <IndicatorsData />
          <WidgetsGrid items={relatedIndicators} />
        </section>
      </div>

    </LayoutPage>
  );
};

export const getServerSideProps = async (req) => {
  const {
    group: groupQueryParam,
    subgroup: subgroupQueryParam,
  } = req.query;

  // enable when we rely on an external API, not NextJS API
  // const groups = await fetchGroups();
  // const group = await fetchGroup(groupQueryParam);
  // const subgroup = await fetchSubgroup(subgroupQueryParam);

  // temporary workaround to work with NextJS API. Remove when external API is used.
  const group = GROUPS.find(({ slug }) => groupQueryParam === slug);
  const subgroup = SUBGROUPS.find(({ slug }) => subgroupQueryParam === slug);

  return ({
    props: {
      groups: GROUPS,
      group,
      subgroup,
    },
  });
};

export default GroupPage;
