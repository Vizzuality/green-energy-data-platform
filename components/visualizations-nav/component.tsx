import React, { FC, useCallback, useMemo } from 'react';
import cx from 'classnames';
import i18next from 'i18next';

import { useDispatch } from 'react-redux';
import { setFilters } from 'store/slices/indicator';
import { setCompareFilters } from 'store/slices/indicator_compare';

// components
import Icon from 'components/icon';

import {
  GeneralVisualizationsOptions,
  EnergyBalanceVisualizationsOptions,
  GeneralVisualizationsOptionsInternational,
} from './constants';

export interface VisualizationsNavProps {
  groupSlug: string | string[];
  subgroupSlug?: string | string[];
  visualizationTypes: string[];
  active: string;
  mobile?: boolean;
  compareIndex?: 1 | 2;
  className?: string;
}
export const VisualizationsNav: FC<VisualizationsNavProps> = ({
  groupSlug,
  subgroupSlug,
  visualizationTypes,
  className,
  mobile = false,
  compareIndex = 1,
  active,
}: VisualizationsNavProps) => {
  const dispatch = useDispatch();

  const handleVisualization = useCallback(
    (id) => {
      if (compareIndex === 1) {
        dispatch(setFilters({ visualization: id }));
      } else {
        dispatch(setCompareFilters({ visualization: id }));
      }
    },
    [compareIndex, dispatch],
  );

  const VisualizationsOptions = useMemo(() => {
    if (groupSlug === 'energy-balance') {
      return EnergyBalanceVisualizationsOptions;
    }
    if (groupSlug === 'energy' && subgroupSlug === 'international-comparison') {
      return GeneralVisualizationsOptionsInternational;
    }
    return GeneralVisualizationsOptions;
  }, [groupSlug]);

  // Check datasets that are showing all visualizations
  // (line, pie, bar chart and map) or data format
  // At the moment, just energy balance is showing data format
  const dataFormat = groupSlug === 'energy-balance';

  // language keys
  const visualization = i18next.t('visualization');
  const dataFormatLang = i18next.t('dataFormat');

  return (
    <nav>
      <ul
        role="menu"
        className={cx('flex border-b border-b-gray', {
          [className]: !!className,
          'justify-between flex-grow': !dataFormat,
        })}
      >
        {!mobile && (
          <p className="pt-4 whitespace-nowrap">
            {dataFormatLang || visualization}
            :
          </p>
        )}

        {VisualizationsOptions?.map(({
          icon, label, id, slug,
        }) => {
          const visualizationLabel = i18next.t(label);
          return (
            <li
              role="menuitem"
              key={id}
              className={cx('relative flex flex-col p-4 text-color1', {
                'cursor-pointer': visualizationTypes?.includes(id) && !dataFormat,
                'font-bold text-opacity-100': active === slug || dataFormat,
                'text-opacity-20':
                !visualizationTypes?.includes(id) && !dataFormat,
                'pointer-events-none': VisualizationsOptions.length === 1,
                'border rounded border-color1': active === id && mobile,
              })}
            >
              <button
                type="button"
                className="flex items-center"
                onClick={() => handleVisualization(id)}
                onKeyPress={() => handleVisualization(id)}
                disabled={!visualizationTypes?.includes(id)}
              >
                <Icon
                  ariaLabel={`${label}-visualization`}
                  name={icon}
                  size="lg"
                  className="text-current"
                />
                {!mobile && (
                <span
                  className={cx('ml-3 hidden sm:block', {
                    'text-gray2': active === id,
                  })}
                >
                  {visualizationLabel}
                </span>
                )}
              </button>
              {!mobile && (
              <div
                className={cx({
                  'absolute left-4 right-4 bottom-0 rounded-2xl h-1 bg-current':
                    active === id,
                })}
              />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default VisualizationsNav;
