import React, { FC, useState, useEffect } from 'react';
import Link from 'next/link';

import { RootState } from 'store/store';
import { useSelector } from 'react-redux';

// layout
import LayoutPage from 'layout';
import Hero from 'layout/hero-search';

// components
import Head from 'components/head';
import Button from 'components/button';

// utils
import { Filter } from 'utils';

// hooks
import { useSearch } from 'hooks/search';

// services
import { fetchGroups } from 'services/groups';

// types
import { GroupProps } from 'types/data';
import i18next from 'i18next';

interface IndicatorsPageProps {
  groups: GroupProps[]
}

// type ResultsProps

const IndicatorsPage: FC<IndicatorsPageProps> = ({ groups }: IndicatorsPageProps) => {
  const [disabledGroups, setActive] = useState([]);
  const [groupsFiltered, setFilteredGroups] = useState(groups);

  const {
    searchValue,
  } = useSelector(
    (state: RootState) => (state.search),
  );

  useEffect(() => {
    setFilteredGroups(groups);
  }, [groups]);
  const searchResults = useSearch(groupsFiltered, searchValue);

  const handleGroups = (e, slug) => {
    e.preventDefault();
    const disabledGroupsUpdate = Filter(disabledGroups, slug);
    setActive(disabledGroupsUpdate);

    const activeGroups = groups?.filter(
      (g) => (disabledGroups.includes(g.slug) ? g : null),
    );

    setFilteredGroups(!activeGroups.length ? groups : activeGroups);
  };

  const results = searchValue === '' ? groupsFiltered : searchResults;

  return (
    <LayoutPage className="text-white bg-gradient-gray1 overflow-y-auto">
      <Head title="Green Energy Data Platform" />
      <Hero items={groupsFiltered}>
        <div className="flex container m-auto py-6 lg:px-32 md:px-24 px-16">
          <p className="py-2 mr-5">
            {i18next.t('filterBy')}
            :
          </p>
          <div className="flex flex-wrap flex-1">
            {groups.map(({ id, slug, name }) => (
              <Button
                type="button"
                key={id}
                size="xlg"
                theme={disabledGroups.includes(slug) ? 'active' : 'primary'}
                onClick={(e) => handleGroups(e, slug)}
                className="mr-5 mb-5"
              >
                {name}
              </Button>
            ))}
          </div>
        </div>
      </Hero>
      <main className="container m-auto pt-6 pb-40 lg:px-32 md:px-24 px-16 text-gray1 divide-y divide-gray1 divide-opacity-20">
        {results.length && results.map(({
          id: groupId,
          name: groupName,
          slug: groupSlug,
          subgroups,
        }: GroupProps) => (
          <div key={groupId} className="flex flex-col">
            <h2 className="text-3.5xl pt-2">{groupName}</h2>
            <div className="flex flex-col text-lg py-10">
              {subgroups.map(({
                id: subgroupId,
                name: subgroupName,
                slug: subgroupSlug,
                default_indicator,
              }) => {
                const indicatorSlug = !default_indicator
                  ? subgroups[0].slug : default_indicator?.slug;
                return (
                  <Link key={subgroupId} href={`/${groupSlug}/${subgroupSlug}/${indicatorSlug}`}>{subgroupName}</Link>
                );
              })}
            </div>
          </div>
        ))}

      </main>
    </LayoutPage>
  );
};

export const getServerSideProps = async () => fetchGroups().then(
  ({ data }) => ({ props: { groups: data } }),
);

export default IndicatorsPage;
