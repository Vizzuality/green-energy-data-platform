import React, {
  FC,
} from 'react';

import { useRouter } from 'next/router';

// authentication
import {
  withAuthentication,
  withUser,
} from 'hoc/auth';

// components
import LayoutPage from 'layout';
import Head from 'components/head';
import Header from 'layout/header';
import Compare from 'layout/compare';

// services
import { fetchSubgroup } from 'services/subgroups';

import { getSession } from 'next-auth/client';

import { useGroup } from 'hooks/groups';
import { useSubgroup } from 'hooks/subgroups';

interface CompareProps {
  subgroup1: string,
  subgroup2: string,
}

const ComparePage: FC<CompareProps> = ({
  subgroup1,
  subgroup2,
}: CompareProps) => {
  const { query } = useRouter();
  const { sgInd1, sgInd2 } = query;

  const router = useRouter();
  const { data } = useSubgroup(sgInd1);

  const { data: dataGroup1 } = useGroup((data && data.group));

  const { data: dataCompare } = useSubgroup(sgInd2);
  const { data: dataGroup2 } = useGroup((dataCompare && dataCompare.group));

  if (!dataGroup1 || !dataGroup2) return null;

  const handleClose = (group, slug) => {
    const { slug: groupSlug } = group;
    const url = `${groupSlug}/${slug}`;
    router.push(url, url, { shallow: true });
  };

  return (
    <LayoutPage className="text-white bg-gradient-gray1">
      <Head title="Green Energy Data Platform" />
      <Header className="border-b border-white border-opacity-30" />
      <section className="flex space-x-3">
        <Compare
          id={1}
          subgroup={sgInd1}
          group={dataGroup1}
          onClose={handleClose}
        />
        <Compare
          id={2}
          subgroup={sgInd2}
          group={dataGroup2}
          onClose={handleClose}
        />
      </section>
    </LayoutPage>
  );
};

const customServerSideProps = async (req) => {
  const {
    subgroup1: subgroupQueryParam1,
    subgroup2: subgroupQueryParam2,
  } = req.query;
  const session = await getSession(req);
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
