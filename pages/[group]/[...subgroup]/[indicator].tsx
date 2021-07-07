import React, {
  FC,
} from 'react';
import cx from 'classnames';

// components
import Head from 'components/head';
import Nav from 'components/nav';
import Tooltip from 'components/tooltip';
import Icon from 'components/icon';

// layout
import LayoutPage from 'layout';
import Hero from 'layout/hero';
import IndicatorData from 'layout/indicator-data';
import WidgetsGrid from 'layout/widgets-grid';

// import { GroupProps, SubgroupProps, IndicatorsProps } from 'types/data';

import { useGroup } from 'hooks/groups';
import { useSubgroup } from 'hooks/subgroups';
import { useIndicators } from 'hooks/indicators';

import { RELATED_INDICATORS } from 'constants/api-payloads';
import { useRouter } from 'next/router';

// interface GroupPageProps {
//   group: GroupProps,
//   groups: GroupProps[],
//   subgroup: SubgroupProps,
//   indicators: IndicatorsProps[],
// }

const GroupPage: FC = () => {
  // get slugs, ids for hook TO - DO - change when API works by slugs

  // const router = useRouter();
  // const { group: groupId, subgroup: subgroupId } = router.query;
  // const { selectedSubgroup } = useSelector((state) => state.subgroup);

  // const groupId = '066bc939-a3cb-40f3-a4b3-21ad8fe9aef9';
  // const subgroupId = '69598aad-9db8-4e7a-9594-7125fc3a4d20';
  // const indicatorId = '3efd7616-8833-4c31-a070-3000796f3597';

  const router = useRouter();
  const { query: { group: groupQuery, subgroup: subgroupQuery } } = router;

  const { data: group } = useGroup(groupQuery);
  const { data: subgroup } = useSubgroup(groupQuery, subgroupQuery);
  const { data: indicators } = useIndicators(groupQuery, subgroupQuery);

  if (!group || !subgroup || !indicators) return null;

  const {
    subgroups,
  } = group;

  return (
    <LayoutPage className="text-white bg-gradient-gray1 pb-20">
      <Head title={`${group.name} analysis`} />
      <Hero>
        <Nav className="pt-10" />

        <Tooltip
          trigger="click"
          placement="bottom-start"
          content={(
            <ul
              className="justify-center flex flex-col w-full z-10 rounded-xl bg-gray3 divide-y divide-white divide-opacity-10"
            >
              {subgroups.map(({ slug, id, name }) => (
                <li
                  data-code={id}
                  className="px-4 py-2 first:rounded-t-xl last:rounded-b-xl bg-white text-gray3 first:rounded-t-xl last:rounded-b-xl"
                  key={id}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(`/${group.slug}/${slug}`);
                    }}
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
              )}
        >
          <button
            type="button"
            className="flex items-center"
          >
            <h1 className="text-5.5xl pt-3">{subgroup.name}</h1>
            <Icon
              ariaLabel="collapse dropdown"
              name="triangle_border"
              size="2xlg"
              className={cx('ml-3 border-2 text-white border-white border-opacity-30 hover:bg-color1 rounded-full p-4',
                { 'transform -rotate-180': true })}
            />
          </button>

        </Tooltip>

      </Hero>
      <div className="container m-auto">
        <section className="-mt-40">
          <IndicatorData />
          <WidgetsGrid items={RELATED_INDICATORS} />
        </section>
      </div>

    </LayoutPage>
  );
};

export default GroupPage;
