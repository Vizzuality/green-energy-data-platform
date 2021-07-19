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
    gInd1, sgInd1, gInd2, sgInd2,
  } = query;

  const router = useRouter();

  const handleClose = (groupSlug, subgroupSlug) => {
    const url = `${groupSlug}/${subgroupSlug}`;
    router.push(url, url, { shallow: true });
  };

  if (!gInd1 || !sgInd1 || !sgInd2 || !sgInd2) return <LoadingSpinner />;

  return (
    <LayoutPage className="text-white bg-gradient-gray1">
      <Head title="Green Energy Data Platform" />
      <Header className="border-b border-white border-opacity-30" />
      <section className="flex space-x-3">
        <Compare
          groupSlug={gInd1}
          subgroupSlug={sgInd1}
          onClose={handleClose}
        />
        <Compare
          groupSlug={gInd2}
          subgroupSlug={sgInd2}
          onClose={handleClose}
        />
      </section>
    </LayoutPage>
  );
};

export default ComparePage;
