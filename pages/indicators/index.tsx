import React, { FC, useState, useMemo } from 'react';
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
import { GroupProps, Language } from 'types/data';
import i18next from 'i18next';

interface IndicatorsPageProps {
  groups: GroupProps[]
}

const IndicatorsPage: FC<IndicatorsPageProps & Language> = ({ groups, locale }: IndicatorsPageProps & Language) => {

  // language keys
  const filterBy = i18next.t('filterBy');

  const [disabledGroups, setActive] = useState([]);
  const [groupsFiltered, setFilteredGroups] = useState(groups);
  const lang = useMemo(() => locale || 'en', [locale]);

  const {
    searchValue,
  } = useSelector(
    (state: RootState) => (state.search),
  );

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
    <LayoutPage className="overflow-y-auto text-white bg-gradient-gray1">
      <Head title="Green Energy Data Platform" />
      <Hero items={groupsFiltered}>
        <div className="container flex px-16 py-6 m-auto lg:px-32 md:px-24">
          <p className="py-2 mr-5">
            {filterBy}
            :
          </p>
          <div className="flex flex-wrap flex-1">
            {groups?.map(({ id, slug, name }) => (
              <Button
                type="button"
                key={id}
                size="xlg"
                theme={disabledGroups.includes(slug) ? 'active' : 'primary'}
                onClick={(e) => handleGroups(e, slug)}
                className="mb-5 mr-5"
              >
                {name}
              </Button>
            ))}
          </div>
        </div>
      </Hero>
      <main className="container px-16 pt-6 pb-40 m-auto divide-y lg:px-32 md:px-24 text-gray1 divide-gray1 divide-opacity-20">
        {results.length && results.map(({
          id: groupId,
          name: groupName,
          slug: groupSlug,
          subgroups,
        }: GroupProps) => (
          <div key={groupId} className="flex flex-col">
            <h2 className="text-3.5xl pt-2">{groupName}</h2>
            <div className="flex flex-col py-10 text-lg">
              {subgroups?.map(({
                id: subgroupId,
                name: subgroupName,
                slug: subgroupSlug,
                default_indicator,
              }) => {
                const indicatorSlug = !default_indicator
                  ? subgroups[0].slug : default_indicator?.slug;
                return (
                  <Link
                    key={subgroupId}
                    href={{ pathname: `/${groupSlug}/${subgroupSlug}/${indicatorSlug}`, query: { locale: lang }}}
                  >
                    {subgroupName}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

      </main>
    </LayoutPage>
  );
};

export const getServerSideProps = async ({ query }) => {
  const { locale } = query;
  return fetchGroups(null, { locale }).then(
    ({ data }) => ({
      props: {
        groups: data,
        locale: locale ?? 'en',
      },
    }),
  );
};
export default IndicatorsPage;
