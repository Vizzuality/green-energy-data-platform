import React, {
  FC,
  useMemo,
  useState,
  useCallback,
} from 'react';
import {
  useQueryClient,
} from 'react-query';

import cx from 'classnames';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { RootState } from 'store/store';

// hooks
import { useSubgroup } from 'hooks/subgroups';
import { useIndicator } from 'hooks/indicators';

import i18next from 'i18next';

// types
import { Component } from 'types/data';

// components
import VisualizationsNav from 'components/visualizations-nav';
import Icon from 'components/icon';
import Tooltip from 'components/tooltip';
import General from './general';
import EnergyFlow from './energy-flow';
import ModelIntercomparison from './model-intercomparison';
import CompareDropdownContent from './compare-dropdown/component';

const IndicatorData: FC<Component> = ({
  className,
}: Component) => {
  const [dropdownVisibility, setDropdownVisibility] = useState({
    indicator: false,
    year: false,
    region: false,
    unit: false,
    category: { label: 'category_1', value: null },
    scenario: false,
  });

  const [compareMenuVisibility, setSubMenuVisibility] = useState({
    menuVisibility: true,
    id: '',
  });

  const queryClient = useQueryClient();
  const { visualization } = useSelector((state: RootState) => state.indicator);

  const router = useRouter();
  const { query: { group: groupSlug, subgroup: subgroupQuery, locale } } = router;

  const subgroupSlug = subgroupQuery?.[0];
  const indicatorSlug = subgroupQuery?.[1];
  const handleIndicatorChange = useCallback((url) => {
    setDropdownVisibility({
      ...dropdownVisibility,
      indicator: false,
    });

    router.push(url);
  }, [router, dropdownVisibility]);

  const toggleDropdown = useCallback((key) => {
    setDropdownVisibility({
      ...dropdownVisibility,
      [key]: !dropdownVisibility[key],
    });
  }, [dropdownVisibility]);

  const closeDropdown = useCallback((key) => {
    setDropdownVisibility({
      ...dropdownVisibility,
      [key]: false,
    });
  }, [dropdownVisibility]);

  const { data: subgroup } = useSubgroup(groupSlug, subgroupSlug, {
    refetchOnWindowFocus: false,
  });

  const {
    data: indicatorData,
  } = useIndicator(groupSlug, subgroupSlug, indicatorSlug, {
    placeholderData: queryClient.getQueryData(['indicator', indicatorSlug]) || {
      categories: [],
      category_filters: {},
      default_visualization: null,
      description: null,
      end_date: null,
      id: null,
      name: null,
      published: false,
      start_date: null,
      visualization_types: [],
      group: null,
      subgroup: null,
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  }, { locale: locale || 'en' });

  const {
    name,
    visualization_types: visualizationTypesIndicator,
    description,
  } = indicatorData;

  const tempoDescription = description?.toLocaleLowerCase().includes('lorem') ? null : description;
  const groupVisualization = useMemo(() => {
    switch (groupSlug) {
      case 'energy-flows':
        return <EnergyFlow />;
      case 'scenarios':
        return <ModelIntercomparison />;
      default:
        return <General />;
    }
  }, [groupSlug]);

  return (
    <div className={cx('bg-white rounded-2.5xl text-gray1 divide-y divide-gray shadow',
      { [className]: className })}
    >
      {visualization !== 'sankey' && (
      <VisualizationsNav
        active={visualization}
        groupSlug={groupSlug}
        className="w-full lg:px-32 md:px-24 sm:px-16 px-8"
        visualizationTypes={visualizationTypesIndicator}
      />
      )}
      <div className="flex flex-col w-full px-16 lg:px-32 md:px-24 py-11 space-y-7.5">
        {groupSlug !== 'energy-balance' && (
        <div className="flex items-center justify-between w-full">
          <h2 className="flex flex-wrap text-3.5xl max-w-6xl mr-4">
            {name}
          </h2>
          <div className="flex">
            {subgroup?.indicators?.length > 1 && (
            <Tooltip
              placement="bottom-end"
              visible={dropdownVisibility.indicator}
              interactive
              onClickOutside={() => closeDropdown('indicator')}
              content={(
                <ul className="z-10 w-full min-w-full overflow-y-auto divide-y divide-white shadow-sm rounded-xl divide-opacity-10 max-h-96">
                  {subgroup?.indicators?.map(
                    ({ name: groupName, id, slug }) => (
                      <li key={id} className="px-5 text-white divide-y divide-white first:rounded-t-xl last:rounded-b-xl hover:bg-white hover:text-gray3 first:hover:rounded-t-xl divide-opacity-10 bg-gray3">
                        <button
                          type="button"
                          className="flex items-center w-full py-2 last:border-b-0"
                          onClick={() => handleIndicatorChange(`/${groupSlug}/${subgroupSlug}/${encodeURIComponent(slug)}`)}
                        >
                          {groupName}
                        </button>
                      </li>
                    ),
                  )}
                </ul>
              )}
            >
              <button
                type="button"
                onClick={() => { toggleDropdown('indicator'); }}
                className="flex items-center border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full mr-4 whitespace-nowrap"
              >
                <span className="text-sm">{i18next.t('change')}</span>
                <Icon ariaLabel="change indicator" name="triangle_border" className="ml-4" size="sm" />
              </button>
            </Tooltip>
)}

            <Tooltip
              trigger="click"
              placement="bottom-start"
              maxHeight={400}
              onTrigger={() => setSubMenuVisibility({ menuVisibility: !compareMenuVisibility.menuVisibility, id: '' })}
              content={(
                <CompareDropdownContent
                  compareGroupSlug={groupSlug}
                  compareSubgroupSlug={subgroupSlug}
                  compareIndicatorSlug={indicatorSlug}
                />
              )}
            >
              <button
                type="button"
                className="text-sm border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full"
              >
                {i18next.t('compare')}
              </button>
            </Tooltip>
          </div>
        </div>
        )}
        {tempoDescription && (
        <p className="text-sm">
          {tempoDescription}
        </p>
        )}
        {groupVisualization}
      </div>
    </div>
  );
};

export default IndicatorData;
