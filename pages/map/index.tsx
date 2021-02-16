import React, {
  FC,
} from 'react';

// components
import StaticPage from 'layout/static-page';
import Head from 'components/head';
import MapContainer from 'components/map/map-container';

const MapPage: FC = () => (
  <StaticPage className="map-page">
    <Head title="Green Energy Data Platform Map" />
    <section>
      <p className='text-color1'>Map</p>
      <MapContainer />
    </section>
  </StaticPage>
);

export default MapPage;
