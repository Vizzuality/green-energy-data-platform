import React, {
  FC,
} from 'react';

import { useRouter } from 'next/router';

// components
import LayoutPage from 'layout';
import Head from 'components/head';
import Header from 'layout/header';
import Compare from 'layout/compare';
import LoadingSpinner from 'components/loading-spinner';

const ComparePage: FC = () => {
  const { query } = useRouter();
  const {
    g1, sg1, ind1, g2, sg2, ind2,
  } = query;

  const router = useRouter();

  const handleClose = (groupSlug, subgroupSlug, indicatorSlug) => {
    const url = `${groupSlug}/${subgroupSlug}/${indicatorSlug}`;
    router.push(url, url, { shallow: true });
  };

  if (!g1 || !sg1 || !ind1 || !g2 || !sg2 || !ind2) return <LoadingSpinner />;

  return (
    <LayoutPage className="text-white bg-gradient-gray1">
      <Head title="Green Energy Data Platform" />
      <Header className="border-b border-white border-opacity-30" />
      <section className="w-full flex space-x-3 container">
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

export default ComparePage;
