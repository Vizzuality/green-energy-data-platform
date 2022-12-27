import React, {
  FC,
  useState,
  useCallback,
} from 'react';

import { AxiosRequestConfig } from 'axios';
import cx from 'classnames';

import { RootState } from 'store/store';

import i18next from 'i18next';

import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// hooks
import { useGroup, useGroups, useGroupsDefaults } from 'hooks/groups';
import { useSubgroup } from 'hooks/subgroups';
import { useIndicator } from 'hooks/indicators';

// components
import Hero from 'layout/hero';
import Tooltip from 'components/tooltip';
import Icon from 'components/icon';
import VisualizationsNav from 'components/visualizations-nav';

import { IndicatorProps } from 'types/data';
import { CompareLayoutProps } from './types';

import General from './general';
import ModelIntercomparison from './model-intercomparison';
import EnergyFlow from './energy-flow';

const CompareLayout: FC<CompareLayoutProps> = ({
  groupSlug,
  subgroupSlug,
  indicatorSlug,
  className,
  onClose,
  compareIndex = 1,
}: CompareLayoutProps) => {
  const [dropdownVisibility, setDropdownVisibility] = useState({
    indicator: false,
    year: false,
    region: false,
    unit: false,
    category: { label: 'category_1', value: null },
    scenario: false,
    group: false,
    subgroup: false,
  });

  const queryClient = useQueryClient();
  const {
    visualization,
  } = useSelector(
    (state: RootState) => (compareIndex === 1 ? state.indicator : state.indicator_compare),
  );

  const router = useRouter();
  const { query } = router;
  const lang = query.locale || 'en';

  const { data: groups } = useGroups({ locale: lang },
    {
      placeholderData: [],
      refetchOnWindowFocus: false,
    });

  const defaultGroupSlugs = useGroupsDefaults(groups);

  const handleGroupChange = useCallback((g, sg, ind) => {
    setDropdownVisibility((prevDropdownVisibility) => ({
      ...prevDropdownVisibility,
      subgroup: !prevDropdownVisibility.subgroup,
    }));

    router.push({
      query: {
        ...query,
        [`g${compareIndex}`]: g,
        [`sg${compareIndex}`]: sg,
        [`ind${compareIndex}`]: ind,
      },
    });
  }, [router, query, compareIndex]);

  const handleSubgroupChange = useCallback((sg, ind) => {
    setDropdownVisibility((prevDropdownVisibility) => ({
      ...prevDropdownVisibility,
      subgroup: !prevDropdownVisibility.subgroup,
    }));

    router.push({
      query: {
        ...query,
        [`sg${compareIndex}`]: sg,
        [`ind${compareIndex}`]: ind,
      },
    });
  }, [router, query, compareIndex]);

  const handleIndicatorChange = useCallback((url) => {
    setDropdownVisibility((prevDropdownVisibility) => ({
      ...prevDropdownVisibility,
      indicator: !prevDropdownVisibility.subgroup,
    }));
    router.push({
      query: {
        ...query, [`ind${compareIndex}`]: url,
      },
    });
  }, [router, query, compareIndex]);

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
  }: AxiosRequestConfig = useIndicator(groupSlug, subgroupSlug, indicatorSlug, {
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
    refetchOnWindowFocus: false,
  },
  { locale: lang });

  const {
    name,
    visualization_types: visualizationTypes,
    description,
  }: IndicatorProps = indicatorData;

  const { data: group } = useGroup(groupSlug, {
    refetchOnWindowFocus: false,
    placeholderData: {
      name: null,
      subgroups: [],
    },
  }, { locale: lang });

  const { name: groupName } = group;

  // language keys
  const change = i18next.t('change');

  return (
    <div className="py-24 text-gray1" key={compareIndex}>
      <Hero
        theme="light"
        header={false}
        rounded
        className="relative pb-2 text-white min-h-xs bg-gradient-color2 px-11 rounded-t-2xl"
      >
        <button
          type="button"
          className="absolute top-0 left-0 flex items-center divide-x divide-white bg-gray1 rounded-tl-2xl rounded-br-2xl"
          onClick={() => onClose(groupSlug, subgroupSlug, indicatorSlug)}
        >
          <Icon
            ariaLabel="close"
            name="close"
            size="sm"
            className="mx-3 "
          />
          <span className="px-8 py-1 text-sm">Don´t compare</span>
        </button>
        <div className="py-5">
          <Tooltip
            placement="bottom-start"
            className=""
            visible={dropdownVisibility.group}
            interactive
            onClickOutside={() => { closeDropdown('group'); }}
            content={(
              <ul
                className="z-10 flex flex-col justify-center w-full divide-y divide-white shadow-sm rounded-xl bg-gray3 divide-opacity-10"
              >
                {defaultGroupSlugs?.map(({
                  name: defaultName,
                  groupSlug: defaultGroupSlug,
                  subgroupSlug: defaultSubgroupSlug,
                  indicatorSlug: defaultIndicatorSlug,
                }) => (
                  <li
                    key={defaultGroupSlug}
                    className={cx('max-h relative px-4 focus:outline-none text-opacity-50 text-sm box-content items-center',
                      { 'font-bold': defaultGroupSlug === group })}
                  >
                    <button
                      type="button"
                      className="flex w-full px-5 py-2 cursor-pointer pointer-events-all"
                      onClick={() => handleGroupChange(
                        defaultGroupSlug, defaultSubgroupSlug, defaultIndicatorSlug,
                      )}
                    >
                      {defaultName}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          >
            <button
              type="button"
              className="flex items-center pt-3"
              onClick={() => { toggleDropdown('group'); }}
            >
              <h2 className="pt-10 font-bold text-white">{groupName}</h2>
            </button>
          </Tooltip>

          <Tooltip
            placement="bottom-start"
            className=""
            visible={dropdownVisibility.subgroup}
            interactive={dropdownVisibility.group}
            onClickOutside={() => { closeDropdown('subgroup'); }}
            content={(
              <ul
                className="z-10 flex flex-col justify-center w-full divide-y divide-white shadow-sm rounded-xl bg-gray3 divide-opacity-10"
              >
                {group.subgroups?.map(({
                  slug: sgSlug, id, name: sgName, default_indicator,
                }) => {
                  const indSlug = default_indicator?.slug || group.subgroups[0].slug;
                  return (
                    <li
                      key={id}
                      className="text-white divide-y divide-white first:rounded-t-xl last:rounded-b-xl hover:bg-white hover:text-gray3 divide-opacity-10"
                    >
                      <button
                        type="button"
                        className="flex w-full px-5 py-2 cursor-pointer"
                        onClick={() => handleSubgroupChange(sgSlug, indSlug)}
                      >
                        {sgName}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          >

            <button
              type="button"
              className="flex items-center pt-3"
              disabled={dropdownVisibility.group}
              onClick={() => { toggleDropdown('subgroup'); }}
            >
              <h1 className="text-3.5xl text-left">
                {indicatorData?.subgroup?.name}
              </h1>
              <Icon
                ariaLabel="collapse dropdown"
                name="triangle_border"
                size="xlg"
                className={cx('ml-3 border-2 text-white text-sm border-white border-opacity-30 hover:bg-color1 rounded-full p-2',
                  { 'transform -rotate-180': false })}
              />
            </button>
          </Tooltip>

        </div>
      </Hero>
      <div className={cx('container m-auto bg-white rounded-b-2xl flex flex-col', { [className]: !!className })}>
        {visualization !== 'sankey' && (
          <VisualizationsNav
            active={visualization}
            groupSlug={groupSlug}
            className="w-full px-11 py-7"
            visualizationTypes={visualizationTypes}
            mobile
            compareIndex={compareIndex}
          />
        )}
        <div className="flex flex-col w-full p-11">
          <div className="flex items-baseline justify-between w-full">
            <h2 className="flex max-w-xs font-bold">
              {name}
            </h2>
            {subgroup?.indicators?.length > 1 && (
              <div className="flex">
                <Tooltip
                  placement="bottom-end"
                  visible={dropdownVisibility.indicator}
                  interactive
                  onClickOutside={() => closeDropdown('indicator')}
                  content={(
                    <ul className="z-10 w-full min-w-full overflow-y-auto divide-y divide-white rounded-xl divide-opacity-10 max-h-96">
                      {subgroup?.indicators?.map(
                        ({ name: group_name, id, slug }) => (
                          <li key={id} className="px-5 text-white divide-y divide-white first:rounded-t-xl last:rounded-b-xl hover:bg-white hover:text-gray3 first:hover:rounded-t-xl divide-opacity-10 bg-gray3">
                            <button
                              type="button"
                              className="flex items-center w-full py-2 last:border-b-0"
                              onClick={() => handleIndicatorChange(slug)}
                            >
                              {group_name}
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
                    className="flex items-center border text-color1 border-gray1 border-opacity-20 hover:bg-color1 hover:text-white py-0.5 px-4 rounded-full text-sm"
                  >
                    <span className="text-sm">{change}</span>
                    <Icon
                      ariaLabel="change indicator"
                      size="sm"
                      name="triangle_border"
                      className="ml-4 text-sm"
                    />
                  </button>
                </Tooltip>
              </div>
            )}
          </div>
          <p className="text-sm text-justify py-7.5">
            {description || 'Metadata lorem ipsum sit amet. Donec ullamcorper nulla non metus auctor fringilla. Donec ullamcorper nulla non metus auctor fringilla. Vivamus sagittis lacus vel augue laoreet . Donec ullamcorper nulla non metus auctor fringilla.'}
          </p>

          {groupSlug !== 'scenarios' && groupSlug !== 'energy-flows' && (
            <General
              groupSlug={groupSlug}
              subgroupSlug={subgroupSlug}
              indicatorSlug={indicatorSlug}
              compareIndex={compareIndex}
            />
          )}
          {groupSlug === 'scenarios' && (
            <ModelIntercomparison
              groupSlug={groupSlug}
              subgroupSlug={subgroupSlug}
              indicatorSlug={indicatorSlug}
              compareIndex={compareIndex}
            />
          )}
          {groupSlug === 'energy-flows' && (
            <EnergyFlow
              groupSlug={groupSlug}
              subgroupSlug={subgroupSlug}
              indicatorSlug={indicatorSlug}
              compareIndex={compareIndex}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CompareLayout;
