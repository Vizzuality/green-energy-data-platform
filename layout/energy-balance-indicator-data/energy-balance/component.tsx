import React, {
  FC,
  useState,
  useCallback,
} from 'react';
import i18next from 'i18next';
import cx from 'classnames';

import { groupBy } from 'lodash';
// hooks
import {
  useGroup, useEnergyBalanceGroupData, useEnergyBalanceSelectedSubgroup,
} from 'hooks/groups';

import { useRouter } from 'next/router';

import Icon from 'components/icon';

const downloadDataFiles = i18next.t('downloadDataFiles');

const Indicator: FC = () => {
  const router = useRouter();
  const { query: { group: groupSlug, subgroup } } = router;
  const { data } = useGroup(groupSlug, {
    placeholderData: [],
    refetchOnWindowFocus: false,
    enabled: !!groupSlug,
    keepPreviousData: true,
  });
  const { subgroups } = useEnergyBalanceGroupData(data);
  const dataBySubgroup = useEnergyBalanceSelectedSubgroup(data, subgroups, subgroup[0]);
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

  return (
    <div>
      <h4 className="py-10">
        {downloadDataFiles}
        :
      </h4>

      <div className="flex flex-col space-y-3">
        {Object.keys(dataByIndicator).map(
          (d) => (
            Object.values(dataByIndicator[d])[0].category_1_en === ''
              ? (
                <span className="pl-6 underline text-color1">
                  {Object.values(dataByIndicator[d])[0].indicator_en}
                </span>
              )
              : (
                <div className="flex flex-col">
                  <button key={d} type="button" onClick={() => toggleDropdown(d)} className="flex items-center font-bold">
                    <Icon
                      ariaLabel={dropdownVisibility ? 'collapse' : 'expand'}
                      name="triangle_border"
                      size="sm"
                      className={cx('mr-4', {
                        'transform rotate-180': !dropdownVisibility[d],
                      })}
                    />
                    <span>
                      {Object.values(dataByIndicator[d])[0].indicator_en}
                    </span>
                  </button>
                  <ul>
                    {Object.values(dataByIndicator[d]).map(({ file_name }) => (
                      dropdownVisibility[d] && (
                        <li key={d} className="pl-6 my-4 space-y-3 underline text-color1">
                          <a href="" />
                          {file_name}
                        </li>
                      )
                    ))}

                  </ul>
                </div>
              )
          ),
        )}
      </div>
    </div>
  );
};

export default Indicator;
