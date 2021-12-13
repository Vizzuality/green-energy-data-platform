import React, {
  FC,
} from 'react';

// components
import Sankey from 'components/indicator-visualizations/sankey';

// layout
import LayoutPage from 'layout';
import Hero from 'layout/hero';

import data from 'components/indicator-visualizations/sankey/sankey_loops02122021.json';
// 'components/indicator-visualizations/sankey/sankey_emissions_test.json';
import CONFIG from 'components/indicator-visualizations/sankey/config';

const SankeyPage: FC = () => (
  <LayoutPage className="text-white bg-gradient-gray1 pb-20">
    <Hero>
      <h2 className="py-6 text-3xl">Sankey test</h2>
    </Hero>
    <div className="container m-auto">
      <section className="m-6 flex flex-1 h-full w-full">
        <Sankey
          widgetData={data[0]}
          widgetConfig={CONFIG}
        />
      </section>
    </div>
  </LayoutPage>
);

export default SankeyPage;
