import React, { useState } from 'react';
import classnames from 'classnames';

const Legend = () => {
  const [isCollapse, toggleCollapse] = useState(true);

  const handleClick = () => {
    toggleCollapse(!isCollapse);
  };

  return (
    <div className="c-map-legend">
      <div className={classnames('map-legend-wrapper',
        { '-collapse': isCollapse })}
      >
        <div className="legend-header">
          <div className="legend-controls">
            <h4>Leyenda</h4>
            <button
              aria-label="expand/collapse"
              type="button"
              onClick={handleClick}
              className={classnames(
                { '-collapse': isCollapse },
                { '-expand': !isCollapse },
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legend;
