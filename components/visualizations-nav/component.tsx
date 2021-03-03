import React, { useState } from 'react';
import cx from 'classnames';
import VisualizationsOptions from './constants';

export interface VisualizationsNavProps {
  selected: string;
  className?: string;
}

export const VisualizationsNav: React.FC<VisualizationsNavProps> = ({
  selected = 'Line'
}: VisualizationsNavProps) => {
  const [active, setSelected] = useState(selected);
  const handleVisualization = (label) => {
    setSelected(label);
  };

  return (
    <nav>
      <ul className="flex justify-between flex-grow py-3 font-heading">
        <p>Select Visualization:</p>
        {VisualizationsOptions.map(({ icon, label }) => (
          <li
            key={label}
            onClick={() => handleVisualization(label)}
            className={cx(
              { 'underline': active === label }
          )}
          >
            {/* <Icon /> */}
            {label}
          </li>
        ))}
      </ul>

    </nav>
  );
};

export default VisualizationsNav;
