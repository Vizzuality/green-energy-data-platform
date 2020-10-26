import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

function getValue(item, value) {
  const { format, suffix = '', preffix = '' } = item;
  let val = value;

  if (format && typeof format === 'function') {
    val = format(val);
  }

  return `${preffix}${val}${suffix}`;
}

function Tooltip({
  payload,
  settings,
  style,
  hideZeros,
  title,
}) {
  const values = payload && payload.length > 0 && payload[0].payload;

  return (
    <div>
      {settings && settings.length && (
        <div className="chart_tooltip" style={style}>
          {title && (<h3 className="data_title">{title}</h3>)}
          {settings.map(
            (d) => (hideZeros && values[d.key] ? null : (
              <div
                key={d.key}
                className="data_line"
              >

                {/* LABEL */}
                {(d.key) && (
                  <>
                    <div className="data_label">
                      {d.color && (
                        <div
                          className="data_color"
                          style={{ backgroundColor: d.color }}
                        />
                      )}
                      {values && d.key && (
                        <>
                          {d.key === 'break'
                            ? <span className="break_label">{d.label}</span>
                            : <span>{d.label || values[d.labelKey]}</span>}
                        </>
                      )}
                    </div>
                    <div className="data_value">
                      {values && d.key && getValue(d, values[d.key])}
                    </div>
                  </>
                )}
              </div>
            )),
          )}
        </div>
      )}
    </div>
  );
}

Tooltip.propTypes = {
  payload: PropTypes.arrayOf(PropTypes.shape({
    payload: PropTypes.shape({}),
  })),
  settings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  style: PropTypes.shape({}),
  hideZeros: PropTypes.bool,
  title: PropTypes.string,
};

Tooltip.defaultProps = {
  payload: [],
  style: {},
  hideZeros: false,
  title: '',
};

export default Tooltip;
