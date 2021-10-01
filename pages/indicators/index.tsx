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
  const noResults = !results.length;

  return (
    <LayoutPage className="text-white bg-gradient-gray1 overflow-y-auto">
      <Head title="Green Energy Data Platform" />
      <Hero items={groupsFiltered}>
        <div className="flex container m-auto py-6 lg:px-32 md:px-24 px-16">
          <p className="py-2 mr-5">Filter by:</p>
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
                const indicatorSlug = default_indicator ? default_indicator.slug : subgroups[0];
                return (
                  <Link key={subgroupId} href={`/${groupSlug}/${subgroupSlug}/${indicatorSlug}`}>{subgroupName}</Link>
                );
              })}
            </div>
          </div>
        ))}

        {noResults && searchValue.length > 1
          && (
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl box-border py-16 flex flex-col justify-center m-auto items-center lg:px-48 md:px-32 sm:px-8 ">
              <img alt="No data" src="/images/illus_nodata.svg" className="w-28 h-auto mx-16" />
              <p className="text-gray1">Data not found</p>
            </div>
          )}
      </main>
    </LayoutPage>
  );
};

export const getServerSideProps = async () => fetchGroups().then(
  ({ data }) => ({ props: { groups: data } }),
);

export default IndicatorsPage;
