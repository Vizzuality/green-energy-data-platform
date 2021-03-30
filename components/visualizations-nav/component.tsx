import React from 'react';
import cx from 'classnames';

// components
import Icon from 'components/icon';

import VisualizationsOptions from './constants';

export interface VisualizationsNavProps {
  visualizationTypes: string[],
  active: string;
  className?: string;
  onClick: (id: string) => void;
}

export const VisualizationsNav: React.FC<VisualizationsNavProps> = ({
  visualizationTypes,
  className,
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
        className={cx('flex justify-between flex-grow border-b-gray',
          { [className]: !!className })}
      >
        <p className="pt-4">Select Visualization:</p>
        {VisualizationsOptions.map(({ icon, label, id }) => (
          <li
            role="menuitem"
            key={id}
            onClick={() => handleVisualization(id)}
            onKeyPress={() => handleVisualization(id)}
            className={cx('relative flex flex-col p-4 text-color1',
              { 'font-bold text-opacity-100': active === id },
              { 'pointer-events-none text-opacity-20': !visualizationTypes.includes(id) })}
          >
            <div className="flex items-center" >
              <Icon
                ariaLabel={`${label}-visualization`}
                name={icon}
                size="lg"
                className="mr-3 text-current"
              />
              <span className={cx({ 'text-gray2': active === id })}>
                {label}
              </span>
            </div>
            <div className={cx({ 'absolute left-4 right-4 bottom-0 rounded-2xl h-1 bg-current': active === id })} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default VisualizationsNav;
