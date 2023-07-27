import React, { FC, useState, useMemo } from 'react';
import Link from 'next/link';

// hooks
import { useGroup, useGroups } from 'hooks/groups';
import { useIndicators } from 'hooks/indicators';
import { useSubgroup } from 'hooks/subgroups';

import Icon from 'components/icon';
import { useRouter } from 'next/router';

type CompareDropdownContentProps = Readonly <{
  compareGroupSlug,
  compareSubgroupSlug,
  compareIndicatorSlug
}>;

const CompareDropdownContent: FC<CompareDropdownContentProps> = ({
  compareGroupSlug,
  compareSubgroupSlug,
  compareIndicatorSlug,
}: CompareDropdownContentProps) => {
  const [step, setStep] = useState(1);
  const [currentSlugs, setCurrentSlugs] = useState({
    groupSlug: null,
    subgroupSlug: null,
  });

  const { query: { locale } } = useRouter();
  const lang = useMemo(() => locale || 'en', [locale]);

  const { data: groups } = useGroups({ locale: lang },
    {
      placeholderData: [],
      refetchOnWindowFocus: false,
    });

  const { groupSlug, subgroupSlug } = currentSlugs;

  const { data: { subgroups } } = useGroup(groupSlug, {
    placeholderData: [],
    refetchOnWindowFocus: false,
    enabled: !!groupSlug,
    keepPreviousData: true,
  }, {
    locale: lang
  });

  const { data: indicators } = useIndicators(groupSlug, subgroupSlug, {
    placeholderData: [],
    refetchOnWindowFocus: false,
    enabled: !!subgroupSlug && !!groupSlug,
  },
  {
    locale: lang,
  });

  const handleClick = (key, value, direction) => {
    setCurrentSlugs({
      ...currentSlugs,
      [key]: value,
    });
    if (direction === 'forward') {
      setStep(step + 1);
    } else {
      setStep(step - 1);
    }
  };

  const { data: groupData } = useGroup(groupSlug, {
    refetchOnWindowFocus: false,
  },
  {
    locale: lang
  });

  const groupName = groupData?.name;
  const { data: subgroupData } = useSubgroup(groupSlug, subgroupSlug, {}, {
    locale
  });
  const subgroupName = subgroupData?.name;

  const groupsToCompare = useMemo(() => groups?.filter(({ slug }) => slug !== 'energy-balance'), [groups]);

  return (
    <div className="z-10 flex flex-col justify-center w-full text-white shadow-sm rounded-xl bg-gray3 first:pt-2 last:pb-2">
      {step === 1 && (
        <ul>
          {groupsToCompare?.map(({
            name, id, slug,
          }) => (
            <li key={id} className="px-7 first:rounded-t-xl last:rounded-b-xl">
              <button
                className="flex items-center flex-1 w-full h-full py-2 border-b border-white border-opacity-10 last:border-0"
                type="button"
                aria-haspopup="listbox"
                aria-labelledby="exp_elem exp_button"
                id="exp_button"
                onClick={() => handleClick('groupSlug', slug, 'forward')}
              >
                <span className="text-left">{name}</span>
                {' '}
                <Icon
                  ariaLabel="arrow"
                  name="arrow"
                  className="ml-2"
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      {step === 2 && (
      <div className="py-2 px-7">
        <div className="flex items-center font-bold">
          <Icon
            ariaLabel="arrow"
            name="arrow"
            className="mr-2 transform rotate-180 cursor-pointer"
            onClick={() => setStep(1)}
          />
          <span className="text-left">{groupName}</span>
          <Icon
            ariaLabel="arrow"
            name="arrow"
            className="ml-2"
          />
        </div>

        <ul className="items-center max-w-sm px-9">
          {subgroups?.map(({
            name, id, slug,
          }) => (
            <li key={id} className="first:rounded-t-xl last:rounded-b-xl">
              <button
                className="flex items-center flex-1 w-full h-full py-2"
                type="button"
                aria-haspopup="listbox"
                aria-labelledby="exp_elem exp_button"
                id="exp_button"
                onClick={() => handleClick('subgroupSlug', slug, 'forward')}
              >
                <span className="text-left">{name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      )}

      {step === 3 && (
      <div className="py-2 px-7">
        <div className="flex items-center font-bold">
          <Icon
            ariaLabel="arrow"
            name="arrow"
            className="mr-2 transform rotate-180 cursor-pointer"
            onClick={() => setStep(2)}
          />
          <span>{subgroupName}</span>
        </div>
        <ul className="items-center max-w-sm px-9">
          {indicators?.map(({
            name, id, slug,
          }) => (
            <li key={id} className="first:rounded-t-xl last:rounded-b-xl">
              <Link
                href={{
                  pathname: '/compare',
                  query: {
                    g1: compareGroupSlug,
                    sg1: compareSubgroupSlug,
                    ind1: compareIndicatorSlug,
                    g2: groupSlug,
                    sg2: subgroupSlug,
                    ind2: slug,
                    locale,
                  },
                }}
                className="flex items-center flex-1 h-full py-2"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      )}
    </div>
  );
};
export default CompareDropdownContent;
