import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const HeadComponent = ({ title, description }) => (
  <Head>
    {!title && <title key="title">Green energy data platform</title>}
    {!!title && <title key="title">{`${title} | Green energy data platform`}</title>}
    {description && <meta key="description" name="description" content={description} />}
  </Head>
);

HeadComponent.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

HeadComponent.defaultProps = {
  title: null,
  description: null,
};

export default HeadComponent;
