import React, { useState } from 'react';
import cx from 'classnames';

// components
import Icon from 'components/icon';

import VisualizationsOptions from './constants';

export interface VisualizationsNavProps {
  selected: string;
  color: string;
  className?: string;
}

export const VisualizationsNav: React.FC<VisualizationsNavProps> = ({
  className,
  color,
  selected = 'Line',
}: VisualizationsNavProps) => {
  const [active, setSelected] = useState(selected);
  const handleVisualization = (label) => {
    setSelected(label);
  };

  return (
    <nav>
      <ul
        role="menu"
        className={cx('flex justify-between flex-grow font-heading border-b-gray',
          { [className]: !!className })}
      >
        <p className="pt-4">Select Visualization:</p>
        {VisualizationsOptions.map(({ icon, label }) => (
          <li
            role="menuitem"
            key={label}
            onClick={() => handleVisualization(label)}
            onKeyPress={() => handleVisualization(label)}
            className={cx(`flex items-center p-4 text-${color} text-opacity-50`,
              { 'border-b-4 border-current text-opacity-100': active === label })}
          >
            <Icon
              ariaLabel={`${label}-visualization`}
              name={icon}
              size="lg"
              className="mr-3 text-current"
            />
            {label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default VisualizationsNav;
