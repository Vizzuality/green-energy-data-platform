import React, {
  FC,
} from 'react';

// components
import StaticPage from 'layout/static-page';
import Head from 'components/head';

const MapPage: FC = () => (
  <StaticPage className="map-page">
    <Head title="Green Energy Data Platform Map" />
    <section className="p-map">
      <p>Map</p>
    </section>
  </StaticPage>
);

export default MapPage;
