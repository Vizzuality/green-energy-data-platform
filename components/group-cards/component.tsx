import React, { FC, useMemo } from 'react';
import cx from 'classnames';

import Link from 'next/link';

import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

import { useDefaultIndicator } from 'hooks/indicators';
import i18next from 'i18next';
import { useSubgroup } from 'hooks/subgroups';
import { useRouter } from 'next/router';

interface GroupProps {
  description: string,
  id: string,
  name: string,
  slug: string,
  subtitle: string,
  header_image: string,
}

interface GroupCardProps {
  group: GroupProps,
  className?: string,
  textPosition: string,
}

const GroupCard: FC<GroupCardProps> = ({
  group,
  className,
  textPosition,
}: GroupCardProps) => {
  // language keys
  const discover = i18next.t('discover');

  const { query: { locale } } = useRouter();
  const lang = useMemo(() => locale || 'en', [locale]); 

  const {
    slug,
    name,
    subtitle,
    header_image: headerImage,
  } = group;

  const defaultData = useDefaultIndicator(group);

  const { default_indicator: defaultIndicator, slug: subgroupSlug } = defaultData;
  const { data: subgroup } = useSubgroup(group.slug, subgroupSlug, {
    refetchOnWindowFocus: false,
  }, {
    locale,
  });

  const indicatorSlug = defaultIndicator?.slug || subgroup?.indicators[0]?.slug;
  const groupSlugDescription  = i18next.t(slug);
  return (
    <div className={cx('flex w-full items-center justify-between space-x-14', { [className]: className })}>
      <div className={cx({ 'flex-1 w-full': true, 'ml-10': textPosition === 'left', 'mr-10': textPosition === 'right' })}>
        <h3 className="text-3.5xl text-gray3">{name}</h3>
        <h4 className="text-2.5xl text-color1 pb-2 font-bold leading-loose">{subtitle}</h4>
        <div className="text-sm leading-7 my-9" dangerouslySetInnerHTML={{ __html: groupSlugDescription }} />
        <Link
          href={{ pathname: `/${slug}/${subgroupSlug}/${indicatorSlug}`, query: { locale: lang } }}
          className="px-6 py-3 text-sm text-white rounded-full bg-gradient-color1 hover:shadow-sm active:bg-gradient-color1-reverse active:shadow-sm"
          >
          {discover}
        </Link>
      </div>
      <img
        src={headerImage || `/images/landing/${slug}.png`}
        alt={slug}
        className={cx('rounded-2xl max-w-sm sm:max-h-[300px] max-h-[250px] flex-1 w-16 shrink-0 md:w-1/4 sm:w-1/6 space-x-4',
          {
            'lg:shadow-md-left shadow-sm-left': textPosition === 'left',
            'lg:shadow-md-right shadow-sm-right': textPosition === 'right',
          })}
      />
    </div>
  );
};

export default GroupCard;
