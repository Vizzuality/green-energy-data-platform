import React, {
  FC,
} from 'react';

// components
import StaticPage from 'layout/static-page';
import Head from 'components/head';
import Widget from 'components/widgets/widget';

const ChartPage: FC = () => {

  return (
    <StaticPage>
      <Head title="Green Energy Data Platform Map" />
      <section>
        <Widget widgetConfig={{}} widgetData={[]} />
      </section>
    </StaticPage>
  );
}

export default ChartPage;
