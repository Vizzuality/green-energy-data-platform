import React, {
  FC,
  useEffect,
  useState,
} from 'react';
import Link from 'next/link';
import i18next from 'i18next';
import cx from 'classnames';

// layout
import LayoutPage from 'layout';
import Hero from 'layout/hero-search';

// components
import Head from 'components/head';
import Search from 'components/search';
import LoadingSpinner from 'components/loading-spinner';
import Button from 'components/button';
import PreFooter from 'components/pre-footer/component';

// utils
import { Filter } from 'utils';

import { useGroups } from 'hooks/groups';

const IndicatorsPage: FC = () => {
  const { data: groups, isLoading } = useGroups();
  const [disabledGroups, setActive] = useState([]);

  const handleGroups = (slug) => {
    console.log(slug, 'handle');
    const disabledGroupsUpdate = Filter(disabledGroups, slug);
    setActive(disabledGroupsUpdate);
  };
  if (isLoading) return <LoadingSpinner />;

  return (
    <LayoutPage className="text-white bg-gradient-gray1 min-h-screen">
      <Head title="Green Energy Data Platform" />
      <Hero groups={groups}>
        <div className="flex container m-auto py-6 px-32">
          <p className="py-2 mr-5">
            {i18next.t('filterBy')}
            :
          </p>
          <div className="flex flex-wrap flex-1">
            {groups?.map(({ id, slug, name }) => (
              <Button
                key={id}
                size="xlg"
                // theme={disabledGroups.includes(slug) ? 'active' : 'primary'}
                onClick={() => handleGroups(slug)}
                className="mr-5 mb-5"
              >
                {name}
              </Button>
            ))}
            <Button
              key="id"
              size="xlg"
                // theme={disabledGroups.includes(slug) ? 'active' : 'primary'}
              onClick={() => handleGroups('slug')}
              className="mr-5 mb-5"
            >
              slug
            </Button>
          </div>
        </div>
      </Hero>
      <main className="container m-auto py-6 px-32 text-gray1 divide-y divide-gray1 divide-opacity-20">
        {groups?.map(({
          id: groupId,
          name: groupName,
          slug: groupSlug,
          subgroups,
        }) => (
          <div key={groupId} className="flex flex-col">
            <h2 className="text-3.5xl pt-2">{groupName}</h2>
            <div className="flex flex-col text-lg py-10">
              {subgroups.map(({
                id: subgroupId, name: subgroupName, slug: subgroupSlug, default_indicator: { slug: indicatorSlug },
              }) => (
                <Link key={subgroupId} href={`/${groupSlug}/${subgroupSlug}/${indicatorSlug}`}>{subgroupName}</Link>
              ))}
            </div>
          </div>
        ))}
      </main>
      <PreFooter />
    </LayoutPage>
  );
};

export default IndicatorsPage;
