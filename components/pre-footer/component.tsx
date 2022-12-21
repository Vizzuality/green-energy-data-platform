import React, { FC } from 'react';
import Link from 'next/link';
import cx from 'classnames';

import { useRouter } from 'next/router';
import { useGroups, useGroupsDefaults } from 'hooks/groups';

interface PreFooterProps {
  className?: string,
}

const PreFooter: FC<PreFooterProps> = ({
  className = '',
}: PreFooterProps) => {
  const { query: { locale } } = useRouter();
  const { data: groups } = useGroups({
    locale: locale || 'en',
  }, {
    refetchOnWindowFocus: false,
    placeholderData: [],
  });

  const defaultGroupSlugs = useGroupsDefaults(groups);

  return (
    <div className="flex">
      <div className={cx('bg-gray1 text-white border-b border-white border-opacity-10 w-full relative mb-[4.65rem]',
        { [className]: className })}
      >
        <div className="flex justify-center w-full p-12 space-x-2 xlg:text-xl lg:text-lg md:text-base">
          {defaultGroupSlugs?.map(({
            name, groupSlug, subgroupSlug, indicatorSlug,
          }) => (
            <Link key={groupSlug} href={`/${groupSlug}/${subgroupSlug}/${indicatorSlug}`} passHref>
              <a href={`/${groupSlug}/${subgroupSlug}/${indicatorSlug}`}>{name}</a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreFooter;
