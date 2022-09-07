import React, { FC } from 'react';
import cx from 'classnames';

import Link from 'next/link';

import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

import { useDefaultIndicator } from 'hooks/indicators';
import i18next from 'i18next';

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
  const {
    slug,
    name,
    subtitle,
    description,
    header_image: headerImage,
  } = group;

  const {
    current,
  } = useSelector(
    (state: RootState) => (state.language),
  );

  const defaultData = useDefaultIndicator(group);
  const { default_indicator: defaultIndicator, slug: subgroupSlug } = defaultData;
  const { slug: indicatorSlug } = defaultIndicator || slug;
  return (
    <div className={cx('w-full items-center', { [className]: className })}>
      <div className={cx('max-w-md sm:my-8',
        {
          'ml-12 ': textPosition === 'left',
          'mr-12 ': textPosition === 'right',
        })}
      >
        <h3 className="text-3.5xl text-gray3">{name}</h3>
        <h4 className="text-2.5xl text-color1 pb-2 font-bold leading-loose">{subtitle || subtitles[slug]?.[current]}</h4>
        <p className="text-sm leading-7 my-9 cursor-pointer">
          {description || 'Metadata lorem ipsum sit amet. Donec ullamcorper nulla non metus auctor fringilla. Donec ullamcorper nulla non metus auctor fringilla. Vivamus sagittis lacus vel augue laoreet rutrum faucibus.'}
        </p>
        <Link href={`/${slug}/${subgroupSlug}/${indicatorSlug}`} passHref>
          <a href={`/${slug}/${subgroupSlug}/${indicatorSlug}`} className="py-3 px-6 text-sm text-white rounded-full bg-gradient-color1 hover:shadow-sm active:bg-gradient-color1-reverse active:shadow-sm">{i18next.t('discover')}</a>
        </Link>
      </div>
      <img
        src={headerImage || `/images/landing/${slug}.png`}
        alt={slug}
        className={cx('rounded-2xl max-w-sm lg:w-full w-72',
          {
            'shadow-md-left': textPosition === 'left',
            'shadow-md-right': textPosition === 'right',
          })}
      />
    </div>
  );
};

export default GroupCard;
