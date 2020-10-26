import React from 'react';
import PropTypes from 'prop-types';

const Tick = ({
  x,
  y,
  payload,
  dataMax,
  unit,
  unitFormat,
  fill,
  backgroundColor,
}) => {
  const tickValue = payload && payload.value;
  const formattedTick = typeof tickValue !== 'undefined' ? unitFormat(tickValue) : 0;
  const tick = tickValue >= dataMax ? `${formattedTick}${unit}` : formattedTick;

  return (
    <g transform={`translate(${x},${y})`}>
      <defs>
        <filter x="0" y="0" width="1" height="1" id="solid">
          <feFlood floodColor={backgroundColor || '#fff'} />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <text
        x="0"
        y="3"
        textAnchor="start"
        fontSize="11px"
        fontWeight={500}
        fill={fill}
      >
        {tick}
      </text>
    </g>
  );
};

Tick.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  payload: PropTypes.shape({
    value: PropTypes.number,
  }),
  dataMax: PropTypes.number,
  unit: PropTypes.string.isRequired,
  unitFormat: PropTypes.func.isRequired,
  fill: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
};

Tick.defaultProps = {
  x: 0,
  y: 0,
  payload: {},
  dataMax: null,
  backgroundColor: '',
};

export default Tick;
