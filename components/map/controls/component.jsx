import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const MapControls = ({ children }) => (
  <div className="c-map-controls">
    {children}
  </div>
);

MapControls.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default MapControls;
