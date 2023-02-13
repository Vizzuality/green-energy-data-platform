import React, { FC, useMemo } from 'react';
import Link from 'next/link';
import cx from 'classnames';

import { useRouter } from 'next/router';
import { useGroups, useGroupsDefaults } from 'hooks/groups';

import LoadingSpinner from 'components/loading-spinner';

interface PreFooterProps {
  className?: string,
}

const PreFooter: FC<PreFooterProps> = ({
  className = '',
}: PreFooterProps) => {
  const { query: { locale } } = useRouter();
  const lang = useMemo(() => locale || 'en', [locale]);

  const { data: groups } = useGroups({
    locale: lang,
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
        <div className="flex w-full p-12 px-16 space-x-2 justify-evenly xlg:text-xl lg:text-lg md:text-base lg:px-32 md:px-24 ">
          <div className="py-2">

            {!defaultGroupSlugs.length && <LoadingSpinner />}
          </div>
          {defaultGroupSlugs?.map(({
            name, groupSlug, subgroupSlug, indicatorSlug,
          }) => (
            <Link
              key={groupSlug}
              href={{
                pathname: `/${groupSlug}/${subgroupSlug}/${indicatorSlug}`,
                query: { locale: lang },
              }}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreFooter;
