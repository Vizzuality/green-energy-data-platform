import React, { FC, Fragment } from "react";
import dynamic from 'next/dynamic';

import widgetsData from './constants';

type DataItem = Object; // TO DO - change when we have clear de type of data

interface WidgetProps {
  widgetData: DataItem[],
  widgetConfig?: Object
}

const Widget: FC<WidgetProps> = () => (
  <Fragment>
    {widgetsData.map(widget => {
      const {
        type,
        title,
        data,
        config
      } = widget;

      const { main, subtitle1, subtitle2 } = title;

      const DynamicChart = dynamic(
        () => import(`components/chart/${type}`),
        { loading: () => <p>loading...</p> });

      return (
        <div key={main} className="bg-white">
          <div className="w-full inline-flex justify-between">
            <div>
              <h3 className="capitalize">{main}</h3>
              <h4>{subtitle1}</h4>
              <h5 className="uppercase">{subtitle2}</h5>
            </div>
            <button className="h-5 w-5 border rounded-full">i</button>
          </div>
          <DynamicChart widgetData={data} widgetConfig={config} />
        </div>
      )
    })}
  </ Fragment>);

export default Widget;
