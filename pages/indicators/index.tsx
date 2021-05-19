import React, {
  FC,
} from 'react';
import Link from 'next/link';
// import cx from 'classnames';

// layout
import LayoutPage from 'layout';
import Hero from 'layout/hero';

// components
import Head from 'components/head';
import Search from 'components/search';
import LoadingSpinner from 'components/loading-spinner';
import Button from 'components/button';

import { useGroups } from 'hooks/groups';

const IndicatorsPage: FC = () => {
  const { groups, isLoading } = useGroups();

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;
  return (
    <LayoutPage className="text-white bg-gradient-gray1">
      <Head title="Green Energy Data Platform" />
      <Hero theme="dark">
        <Search />

        <div className="flex flex-wrap space-x-3 items-center py-6">
          <p>Filter by:</p>
          {groups.map(({ id, title }) => (
            <Button
              key={id}
              size="xlg"
              theme="primary-background"
            >
              {title}
            </Button>
          ))}
        </div>
      </Hero>
      <main className="container m-auto py-6 px-32 text-gray1 divide-y divide-gray1 divide-opacity-20">
        {groups.map(({
          id: groupId,
          title: groupName,
          slug: groupSlug,
          subgroups,
        }) => (
          <div key={groupId} className="flex flex-col">
            <h2 className="text-3.5xl pt-2">{groupName}</h2>
            <div className="flex flex-col text-lg py-10">
              {subgroups.map(({ id: subgroupId, name: subgroupName, slug: subgroupSlug }) => (
                <Link key={subgroupId} href={`/${groupSlug}:${subgroupSlug}`}>{subgroupName}</Link>
              ))}
            </div>
          </div>
        ))}
      </main>
    </LayoutPage>
  );
};

export default IndicatorsPage;
