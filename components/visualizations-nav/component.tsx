import React, { FC } from 'react';
import cx from 'classnames';
import i18next from 'i18next';

// components
import Icon from 'components/icon';

import VisualizationsOptions from './constants';

export interface VisualizationsNavProps {
  visualizationTypes: string[],
  active: string;
  mobile?: boolean,
  className?: string;
  onClick: (id: string) => void;
}

export const VisualizationsNav: FC<VisualizationsNavProps> = ({
  visualizationTypes,
  className,
  mobile = false,
  active,
  onClick,
}: VisualizationsNavProps) => {
  const handleVisualization = (id) => {
    onClick(id);
  };

  return (
    <nav>
      <ul
        role="menu"
        className={cx('flex justify-between flex-grow border-b border-b-gray',
          { [className]: !!className })}
      >
        {!mobile && (
        <p className="pt-4">
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
