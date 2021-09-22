import React, {
  FC,
} from 'react';

import { useRouter } from 'next/router';

// layout
import LayoutPage from 'layout';
import Hero from 'layout/hero';
import Compare from 'layout/compare';

// components
import Head from 'components/head';
import PreFooter from 'components/pre-footer/component';

import { ComparePageProps } from 'types/data';

const ComparePage: FC<ComparePageProps> = ({
  g1, sg1, ind1, g2, sg2, ind2,
}: ComparePageProps) => {
  const router = useRouter();

  const handleClose = (groupSlug, subgroupSlug, indicatorSlug) => {
    const url = `${groupSlug}/${subgroupSlug}/${indicatorSlug}`;
    router.push(url, url, { shallow: true });
  };
  return (
    <LayoutPage className="text-white bg-gradient-gray1 flex flex-col flex-1">
      <Head title="Green Energy Data Platform" />
      <Hero theme="transparent" rounded />
      <section className="w-full flex space-x-3 container m-auto max-w-7xl">
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
      <section className="flex pb-21">
        <PreFooter />
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
