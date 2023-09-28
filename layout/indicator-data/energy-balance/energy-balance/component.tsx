import React, {
  FC,
  useMemo,
  useState,
  useCallback,
} from 'react';
import i18next from 'i18next';
import cx from 'classnames';

import {
  useQueryClient,
} from 'react-query';

import { groupBy } from 'lodash';

// hooks
import {
  useGroup,
  useEnergyBalanceSelectedSubgroup,
} from 'hooks/groups';

import { useRouter } from 'next/router';

import Icon from 'components/icon';

const Indicator: FC = () => {
  const downloadDataFiles = i18next.t('downloadDataFiles');
  const router = useRouter();
  const {
    query: { group: groupSlug, subgroup: subgroupQuery, locale },
  } = router;
  const lang = useMemo(() => locale, [locale]);

  const subgroupSlug = subgroupQuery?.[0];
  const indicatorSlug = subgroupQuery?.[1];
  const queryClient = useQueryClient();
  const { data } = useGroup(groupSlug, {
    placeholderData: queryClient.getQueryData(['group', indicatorSlug]) || [],
    refetchOnWindowFocus: false,
    enabled: !!groupSlug,
    keepPreviousData: true,
  },
  { locale: lang });

  const { data: dataEnglish } = useGroup(groupSlug, {
    placeholderData: queryClient.getQueryData(['group', indicatorSlug]) || [],
    refetchOnWindowFocus: false,
    enabled: !!groupSlug,
    keepPreviousData: true,
  },
  { locale: 'en' });

  const dataBySubgroup = useEnergyBalanceSelectedSubgroup(data, subgroupSlug);
  const dataBySubgroupEnglish = useEnergyBalanceSelectedSubgroup(dataEnglish, subgroupSlug);

  const dataByIndicator = groupBy(dataBySubgroup, 'indicator_en');
  const indicatorsDropdownInitialState = Object.keys(dataByIndicator).reduce((acc, indicator) => ({
    ...acc,
    [indicator]: false,
  }), []);
  const [dropdownVisibility, setDropdownVisibility] = useState(indicatorsDropdownInitialState);

  const toggleDropdown = useCallback((key) => {
    setDropdownVisibility({
      ...dropdownVisibility,
      [key]: !dropdownVisibility[key],
    });
  }, [dropdownVisibility]);
  dataBySubgroup?.indicators.sort((a, b) => (a.records.length < b.records.length ? -1 : 1));
  return (
    <div>
      <h4 className="py-10">
        {downloadDataFiles}
        :
      </h4>
      <div className="flex flex-col space-y-3">
        {dataBySubgroup?.indicators.map((indicator) => {
          if (indicator.records.length === 1) {
            const href = `https://gefc-public-data.s3.ap-southeast-1.amazonaws.com/${dataBySubgroupEnglish.name}/${indicator.records[0].file}`;
            return (
              <a target="_blank" href={decodeURIComponent(href)} rel="noreferrer">
                <span className="pl-6 underline text-color1">{indicator.name}</span>
              </a>
            );
          } return (
            <div key={indicator.slug} className="flex flex-col">
              <button key={indicator.slug} type="button" onClick={() => toggleDropdown(indicator.name)} className="flex items-center font-bold">
                <Icon
                  ariaLabel={dropdownVisibility ? 'collapse' : 'expand'}
                  name="triangle_border"
                  size="sm"
                  className={cx('mr-4', {
                    'transform rotate-180': dropdownVisibility[indicator.name],
                  })}
                />
                <span>
                  {indicator.name}
                </span>
              </button>
              <ul>
                {indicator.records.map(({ category_1, file }) => (
                  dropdownVisibility[indicator.name] && (
                  <li key={category_1} className="pl-6 my-4 space-y-3 underline text-color1">
                    <a href={decodeURIComponent(`https://gefc-public-data.s3.ap-southeast-1.amazonaws.com/${dataBySubgroupEnglish.name}/${file}`.replaceAll(' ', '+'))}>
                      <span>
                        {category_1}
                      </span>
                    </a>
                  </li>
                  )
                ))}

              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Indicator;
