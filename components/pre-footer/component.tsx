import React, { FC } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import { useGroups, useGroupsDefaults } from 'hooks/groups';

interface PreFooterProps {
  className?: string,
}

const PreFooter: FC<PreFooterProps> = ({
  className = '',
}: PreFooterProps) => {
  const { data: groups } = useGroups({
    refetchOnWindowFocus: false,
    placeholderData: [],
  });

  const defaultGroupSlugs = useGroupsDefaults(groups);

  return (
    <div className={cx('bg-gray1 text-white border-b border-white border-opacity-10 w-full relative',
      { [className]: className })}
    >
      <div className="text-xl flex w-full justify-center">
        {defaultGroupSlugs?.map(({
          name, groupSlug, subgroupSlug, indicatorSlug,
        }) => (
          <Link key={groupSlug} href={`/${groupSlug}/${subgroupSlug}/${indicatorSlug}`} passHref>
            <a className="p-12" href={`/${groupSlug}/${subgroupSlug}/${indicatorSlug}`}>{name}</a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PreFooter;
