import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// import Icon from 'components/icon';
import './style.scss';

const ZoomControl = ({ className, viewport, onClick }) => {
  const increaseZoom = (e) => {
    e.stopPropagation();
    const { zoom, maxZoom } = viewport;

    onClick(zoom === maxZoom ? zoom : zoom + 1);
  };

  const decreaseZoom = (e) => {
    e.stopPropagation();
    const { zoom, minZoom } = viewport;

    onClick(zoom === minZoom ? zoom : zoom - 1);
  };

  const { zoom, maxZoom, minZoom } = viewport;

  const classNames = classnames({
    'c-zoom-control': true,
    [className]: !!className,
  });

  const zoomInClass = classnames('zoom-control--btn', { '-disabled': zoom >= maxZoom });
  const zoomOutClass = classnames('zoom-control--btn', { '-disabled': zoom <= minZoom });

  return (
    <div className={classNames}>
      <button
        className={zoomInClass}
        type="button"
        disabled={zoom === maxZoom}
        onClick={increaseZoom}
      >
        {/* <Icon name="zoomin" className="-small" /> */}
      </button>
      <button
        className={zoomOutClass}
        type="button"
        disabled={zoom === minZoom}
        onClick={decreaseZoom}
      >
        {/* <Icon name="zoomout" className="-small" /> */}
      </button>
    </div>
  );
};

ZoomControl.propTypes = {
  viewport: PropTypes.shape({
    zoom: PropTypes.number.isRequired,
    maxZoom: PropTypes.number.isRequired,
    minZoom: PropTypes.number.isRequired,
  }).isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

ZoomControl.defaultProps = { className: null };

export default ZoomControl;
