import React from 'react';
import Link from 'next/link';
import cx from 'classnames';

// hooks
import { useRouter } from 'next/router';
import { useGroups, useGroupsDefaults } from 'hooks/groups';

import { AnimatePresence, motion } from 'framer-motion';
import Icon from 'components/icon';
export interface NavProps {
  className?: string;
}

export const Nav: React.FC<NavProps> = ({
  className,
}: NavProps) => {
  const router = useRouter();
  const { group, locale } = router.query;
  const { data: groups } = useGroups(
    {
      locale: locale || 'en',
    },
    {
      placeholderData: [],
      refetchOnWindowFocus: false,
    },
  );

  const defaultGroupSlugs = useGroupsDefaults(groups);

  return (
    <nav className="relative before:z-10 before:absolute before:top-0 before:left-0 before:h-full before:content before:w-4 before:from-color1 before:bg-gradient-to-r after:absolute after:top-0 after:right-0 after:h-full after:content after:w-4 after:from-color1 after:bg-gradient-to-l">
      <ul className={cx('flex space-x-8 px-4 overflow-x-auto overflow-y-hidden no-scrollbar py-6',
        { [className]: !!className })}
      >
        {defaultGroupSlugs?.map(({
          name,
          groupSlug,
          subgroupSlug,
          indicatorSlug,
        }) => (
          <li
            key={groupSlug}
            className={cx('max-h relative focus:outline-none box-content whitespace-nowrap',
              { 'font-bold': groupSlug === group })}
          >
            <Link
              href={{ pathname: '/[group]/[...subgroup]', query: { locale: locale || 'en' } }}
              as={`/${groupSlug}/${subgroupSlug}/${indicatorSlug}?locale=${locale || 'en'}`}
              className={cx('text-white',
                { 'before:-bottom-4 before:absolute before:left-0 before:w-full before:block before:h-1 before:rounded-2xl before:bg-white': groupSlug === group })}
            >
              {name}
            </Link>
          </li>
        ))}
        

      </ul>
      <AnimatePresence>
        <motion.div className="absolute bottom-10 -right-10" whileHover={{ x: 5 }}>

        <Icon ariaLabel="units dropdown" name="triangle_border" size="sm" className="-rotate-90" />
        </motion.div>
        </AnimatePresence>
    </nav>
  );
};

export default Nav;
