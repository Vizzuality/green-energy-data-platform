import React, {
  FC,
} from 'react';
import Link from 'next/link';
// import cx from 'classnames';

// components
import LayoutPage from 'layout';
import Head from 'components/head';
import Hero from 'layout/hero';
import Button from 'components/button';

import { useGroups } from 'hooks/groups';

const Indicators: FC = () => {
  const { groups } = useGroups();
  if (!groups) return null;
  return (
    <LayoutPage className="text-white bg-gradient-gray1">
      <Head title="Green Energy Data Platform" />
      <Hero>
        <div className="flex flex-wrap space-x-3 items-center">
          <p>Filter by:</p>
          {groups.map(({ id, name }) => (
            <Button
              key={id}
              size="xlg"
              theme="primary"
            >
              {name}
            </Button>
          ))}
        </div>
      </Hero>
      <main className="container text-gray1 divide-y divide-gray1 divide-opacity-20">
        {groups.map(({ id: group_id, name, subgroups }) => (
          <div key={group_id} className="flex flex-col">
            <h2 className="text-3.5xl pt-2">{name}</h2>
            <div className="flex flex-col text-lg py-10">
              {console.log(subgroups)}
              {subgroups.map(({ id, subgroup }) => (
                <Link key={id} href={`/${group_id}:${id}`}>{subgroup}</Link>
              ))}
            </div>
          </div>
        ))}
      </main>
    </LayoutPage>
  );
};

export default Indicators;
