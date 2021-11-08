import React, { FC, useState } from 'react';
import Link from 'next/link';

// hooks
import { useGroup, useGroups } from 'hooks/groups';
import { useIndicators } from 'hooks/indicators';
import { useSubgroup } from 'hooks/subgroups';

import Icon from 'components/icon';

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

  const { data: groups } = useGroups({
    placeholderData: [],
    refetchOnWindowFocus: false,
  });

  const { groupSlug, subgroupSlug } = currentSlugs;

  const { data: { subgroups } } = useGroup(groupSlug, {
    placeholderData: [],
    refetchOnWindowFocus: false,
    enabled: !!groupSlug,
  });

  const { data: indicators } = useIndicators(groupSlug, subgroupSlug, {
    placeholderData: [],
    refetchOnWindowFocus: false,
    enabled: !!subgroupSlug && !!groupSlug,
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

  const { data: groupData } = useGroup(groupSlug);
  const groupName = groupData?.name;
  const { data: subgroupData } = useSubgroup(groupSlug, subgroupSlug);
  const subgroupName = subgroupData?.name;

  return (
    <div className="text-white justify-center flex flex-col w-full z-10 rounded-xl bg-gray3 shadow-sm first:pt-2 last:pb-2">
      {step === 1 && (
        <ul>
          {groups?.map(({
            name, id, slug,
          }) => (
            <li key={id} className="px-7 first:rounded-t-xl last:rounded-b-xl">
              <button
                className="w-full h-full py-2 flex items-center flex-1 border-b border-white border-opacity-10 last:border-0"
                type="button"
                aria-haspopup="listbox"
                aria-labelledby="exp_elem exp_button"
                id="exp_button"
                onClick={() => handleClick('groupSlug', slug, 'forward')}
              >
                <span>{name}</span>
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
      <div className="px-7 py-2">
        <div className="flex font-bold items-center">
          <Icon
            ariaLabel="arrow"
            name="arrow"
            className="transform rotate-180 mr-2 cursor-pointer"
            onClick={() => setStep(1)}
          />
          <span>{groupName}</span>
          <Icon
            ariaLabel="arrow"
            name="arrow"
            className="ml-2"
          />
        </div>

        <ul className="items-center px-9 max-w-sm">
          {subgroups?.map(({
            name, id, slug,
          }) => (
            <li key={id} className="first:rounded-t-xl last:rounded-b-xl">
              <button
                className="w-full h-full py-2 flex items-center flex-1"
                type="button"
                aria-haspopup="listbox"
                aria-labelledby="exp_elem exp_button"
                id="exp_button"
                onClick={() => handleClick('subgroupSlug', slug, 'forward')}
              >
                <span>{name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      )}

      {step === 3 && (
      <div className="px-7 py-2">
        <div className="flex font-bold items-center">
          <Icon
            ariaLabel="arrow"
            name="arrow"
            className="transform rotate-180 mr-2 cursor-pointer"
            onClick={() => setStep(2)}
          />
          <span>{subgroupName}</span>
        </div>
        <ul className="items-center px-9 max-w-sm">
          {indicators?.map(({
            name, id, slug,
          }) => (
            <li key={id} className="first:rounded-t-xl last:rounded-b-xl">
              <Link href={{
                pathname: '/compare',
                query: {
                  g1: compareGroupSlug,
                  sg1: compareSubgroupSlug,
                  ind1: compareIndicatorSlug,
                  g2: groupSlug,
                  sg2: subgroupSlug,
                  ind2: slug,
                },
              }}
              >
                <a
                  className="h-full py-2 flex items-center flex-1"
                  href="/compare"
                >
                  {name}
                </a>
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
