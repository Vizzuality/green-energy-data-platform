import React, {
  FC,
} from 'react';
import Link from 'next/link';
// import cx from 'classnames';
import { useRouter } from 'next/router';

// authentication
import {
  withAuthentication,
  withUser,
} from 'hoc/auth';

// components
import LayoutPage from 'layout';
import Head from 'components/head';
import Hero from 'layout/hero';
import Button from 'components/button';

// services
import { fetchSubgroup } from 'services/subgroups';

import { getSession } from 'next-auth/client';

import { useGroups } from 'hooks/groups';

const ComparePage: FC = ({
  subgroup1,
  subgroup2
}) => {
  const { groups } = useGroups();

  if (!groups) return null;

  console.log(subgroup1, subgroup2, 'subgrupos')
  return (
    <LayoutPage className="text-white bg-gradient-gray1">
      hola
      {/* <Head title="Green Energy Data Platform" />
      <Hero>
        <div className="flex flex-wrap space-x-3 items-center">
          <p>Filter by:</p>
          {groups.map(({ id, name }) => (
            <Button
              key={id}
              size="xlg"
              theme="primary"
            >
              {name}
            </Button>
          ))}
        </div>
      </Hero>
      <main className="container text-gray1 divide-y divide-gray1 divide-opacity-20">
        {groups.map(({ id: group_id, name, subgroups }) => (
          <div key={group_id} className="flex flex-col">
            <h2 className="text-3.5xl pt-2">{name}</h2>
            <div className="flex flex-col text-lg py-10">
              {subgroups.map(({ id, subgroup }) => (
                <Link key={id} href={`/${group_id}:${id}`}>{subgroup}</Link>
              ))}
            </div>
          </div>
        ))}
      </main> */}
    </LayoutPage>
  );
};

const customServerSideProps = async (req) => {
  console.log(req.query, req, '******')
  const {
    subgroup1: subgroupQueryParam1,
    subgroup2: subgroupQueryParam2,
  } = req.query;
  const session = await getSession(req);
  console.log(session)
console.log(req.query, req)
  const subgroup1 = await fetchSubgroup(subgroupQueryParam1, `Bearer ${session.accessToken}`);
  const subgroup2 = await fetchSubgroup(subgroupQueryParam2, `Bearer ${session.accessToken}`);

  return ({
    props: {
      subgroup1,
      subgroup2,
    },
  });
};

export const getServerSideProps = withAuthentication(withUser(customServerSideProps));

export default ComparePage;
