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
import Disclaimer from 'components/disclaimer';

const ComparePage: FC<ComparePageProps> = ({
  g1, sg1, ind1, g2, sg2, ind2,
}: ComparePageProps) => {
  const router = useRouter();

  const handleClose = (groupSlug, subgroupSlug, indicatorSlug) => {
    const url = `${groupSlug}/${subgroupSlug}/${indicatorSlug}`;
    router.push(url, url, { shallow: true });
  };

  return (
    <LayoutPage className="flex flex-col flex-1 text-white bg-gradient-gray1">
      <Head title="Green Energy Data Platform" />
      <Hero theme="transparent" rounded className="px-8 lg:px-32 md:px-24 sm:px-16" />
      <div className="container flex flex-col w-full m-auto pb-[300px]">
        <section className="flex space-x-3 max-w-7xl">
          <div className="w-1/2">
            <Compare
              groupSlug={g1}
              subgroupSlug={sg1}
              indicatorSlug={ind1}
              onClose={() => handleClose(g2, sg2, ind2)}
              compareIndex={1}
            />
          </div>
          <div className="w-1/2">
            <Compare
              groupSlug={g2}
              subgroupSlug={sg2}
              indicatorSlug={ind2}
              onClose={() => handleClose(g1, sg1, ind1)}
              compareIndex={2}
            />
          </div>
        </section>
        <Disclaimer />
      </div>
      <PreFooter />

    </LayoutPage>
  );
};

export const getServerSideProps = async ({ query }) => {
  const {
    g1, sg1, ind1, g2, sg2, ind2,
  } = query;

  return ({
    props: {
      g1,
      sg1,
      ind1,
      g2,
      sg2,
      ind2,
      locale: query?.locale ?? 'en',
    },
  });
};

export default ComparePage;
