import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const StaticPage = ({ className, children }) => (
  <div className={classNames('l-simple-page', className)}>
    {children}q
  </div>
);

StaticPage.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

StaticPage.defaultProps = { className: null };

export default StaticPage;
