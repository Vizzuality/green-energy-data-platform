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

const subtitles = {
  energy: {
    en: 'Global Energy Investment',
    cn: '全球能源投资',
  },
  socioeconomic: {
    en: 'Agriculture',
    cn: '农业',
  },
  'coal-power-plants': {
    en: 'Capacity power plants in China',
    cn: '中国容量电厂',
  },
};

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

  const {
    current,
  } = useSelector(
    (state: RootState) => (state.language),
  );

  const defaultData = useDefaultIndicator(group);

  const { default_indicator: defaultIndicator, slug: subgroupSlug } = defaultData;
  const { data: subgroup } = useSubgroup(group.slug, subgroupSlug, {
    refetchOnWindowFocus: false,
  }, {
    locale
  });

  const indicatorSlug = defaultIndicator?.slug || subgroup?.indicators[0]?.slug;
  const groupSlugDescription  = i18next.t(slug);
  return (
    <div className={cx('flex w-full items-center justify-between space-x-14', { [className]: className })}>
      <div className={cx({"flex-1 w-full": true, 'ml-10': textPosition === 'left', 'mr-10': textPosition === 'right'})}>
        <h3 className="text-3.5xl text-gray3">{name}</h3>
        <h4 className="text-2.5xl text-color1 pb-2 font-bold leading-loose">{subtitle || subtitles[slug]?.[current]}</h4>
        <div className="text-sm leading-7 cursor-pointer my-9" dangerouslySetInnerHTML={{__html: groupSlugDescription}} />
          {/* {groupSlugDescription || 'Metadata lorem ipsum sit amet. Donec ullamcorper nulla non metus auctor fringilla. Donec ullamcorper nulla non metus auctor fringilla. Vivamus sagittis lacus vel augue laoreet rutrum faucibus.'}
        </div> */}
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
        className={cx('rounded-2xl max-w-sm max-h-sm flex-1 w-16',
          {
            'shadow-md-left mr-5 ': textPosition === 'left',
            'shadow-md-right ml-5 ': textPosition === 'right',
          })}
      />
    </div>
  );
};

export default GroupCard;
