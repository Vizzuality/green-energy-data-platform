import React, {
  FC,
} from 'react';

// authentication
import {
  withAuthentication,
  withUser,
} from 'hoc/auth';

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

import { getSession } from 'next-auth/client';
import { GroupProps, SubgroupProps } from 'types/data';

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
        <Nav items={groups} className="py-7.5" />
        <div className="flex items-center">
          <h1 className="text-5.5xl py-6">{subgroup.name}</h1>
          <Dropdown
            menuElements={group.subgroups}
            border
            className="ml-3"
            icon="triangle_border"
            iconSize="lg"
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

const customServerSideProps = async (req) => {
  const {
    group: groupQueryParam,
    subgroup: subgroupQueryParam,
  } = req.query;
  const session = await getSession(req);
  const groups = await fetchGroups(`Bearer ${session.accessToken}`);
  const group = await fetchGroup(groupQueryParam, `Bearer ${session.accessToken}`);
  const subgroup = await fetchSubgroup(subgroupQueryParam, `Bearer ${session.accessToken}`);

  return ({
    props: {
      groups,
      group,
      subgroup,
    },
  });
};

export const getServerSideProps = withAuthentication(withUser(customServerSideProps));

export default GroupPage;
