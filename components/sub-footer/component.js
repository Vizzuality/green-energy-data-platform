import React from 'react';

import subFooterElements from './constants';

const SubFooter = () => (
  <section className="grid grid-cols-4 gap-4">
    {subFooterElements.map((el) => (
      <div>
        <img alt="news" src="https://dummyimage.com/16:9x1080/" />
        <h4>{el.header}</h4>
        <h3>{el.subtitle}</h3>
      </div>
    ))}
  </section>
);

SubFooter.propTypes = {
};

SubFooter.defaultProps = {
};

export default SubFooter;
