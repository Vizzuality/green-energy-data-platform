import React, {
  FC,
} from 'react';

import { useRouter } from 'next/router';

// components
import LayoutPage from 'layout';
import Head from 'components/head';
import Hero from 'layout/hero';
import Compare from 'layout/compare';

import { CompareProps } from './types';

const ComparePage: FC<CompareProps> = ({
  g1, sg1, ind1, g2, sg2, ind2,
}: CompareProps) => {
  const router = useRouter();

  const handleClose = (groupSlug, subgroupSlug, indicatorSlug) => {
    const url = `${groupSlug}/${subgroupSlug}/${indicatorSlug}`;
    router.push(url, url, { shallow: true });
  };
  return (
    <LayoutPage className="text-white bg-gradient-gray1 flex flex-col">
      <Head title="Green Energy Data Platform" />
      <Hero theme="transparent" rounded />
      <section className="w-full flex space-x-3 container m-auto">
        <Compare
          groupSlug={g1}
          subgroupSlug={sg1}
          indicatorSlug={ind1}
          onClose={handleClose}
          compareIndex={1}
        />
        <Compare
          groupSlug={g2}
          subgroupSlug={sg2}
          indicatorSlug={ind2}
          onClose={handleClose}
          compareIndex={2}
        />
      </section>
    </LayoutPage>
  );
};

export const getServerSideProps = async ({ query }) => {
  const {
    g1, sg1, ind1, g2, sg2, ind2,
  } = query;

  return ({
    props: {
      g1, sg1, ind1, g2, sg2, ind2,
    },
  });
};

export default ComparePage;
