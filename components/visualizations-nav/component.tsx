import React, { FC, useCallback, useMemo } from 'react';
import cx from 'classnames';
import i18next from 'i18next';

import { useDispatch } from 'react-redux';
import { setFilters } from 'store/slices/indicator';
import { setCompareFilters } from 'store/slices/indicator_compare';

// components
import Icon from 'components/icon';

import { GeneralVisualizationsOptions, ModelIntercomparisonVisualizationsOptions } from './constants';

export interface VisualizationsNavProps {
  groupSlug: string | string[];
  visualizationTypes: string[],
  active: string;
  mobile?: boolean,
  compareIndex?: number,
  className?: string;
}
export const VisualizationsNav: FC<VisualizationsNavProps> = ({
  groupSlug,
  visualizationTypes,
  className,
  mobile = false,
  compareIndex,
  active,
}: VisualizationsNavProps) => {
  const dispatch = useDispatch();

  const handleVisualization = useCallback(
    (id) => {
      if (!compareIndex || compareIndex === 0) {
        dispatch(setFilters({ visualization: id }));
      } else {
        dispatch(setCompareFilters({ visualization: id }));
      }
    }, [compareIndex, dispatch],
  );

  const VisualizationsOptions = useMemo(() => {
    if (groupSlug === 'model-intercomparison') {
      return ModelIntercomparisonVisualizationsOptions;
    }
    return GeneralVisualizationsOptions;
  }, [groupSlug]);

  return (
    <nav>
      <ul
        role="menu"
        className={cx('flex justify-between flex-grow border-b border-b-gray',
          { [className]: !!className })}
      >
        {!mobile && (
        <p className="pt-4 whitespace-nowrap">
          {i18next.t('visualization')}
          :
        </p>
        )}
        {VisualizationsOptions?.map(({
          icon, label, id, slug,
        }) => (
          <li
            role="menuitem"
            key={id}
            onClick={() => handleVisualization(id)}
            onKeyPress={() => handleVisualization(id)}
            className={cx('relative flex flex-col p-4 text-color1 cursor-pointer',
              { 'font-bold text-opacity-100': active === slug },
              { 'pointer-events-none text-opacity-20': !visualizationTypes?.includes(id) },
              { 'border rounded border-color1': (active === id) && mobile })}
          >
            <div className="flex items-center">
              <Icon
                ariaLabel={`${label}-visualization`}
                name={icon}
                size="lg"
                className="text-current"
              />
              {!mobile && (
              <span className={cx('ml-3 hidden sm:block', { 'text-gray2': active === id })}>
                {label}
              </span>
              )}
            </div>
            {!mobile && (
            <div className={cx(
              { 'absolute left-4 right-4 bottom-0 rounded-2xl h-1 bg-current': active === id },
            )}
            />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default VisualizationsNav;
