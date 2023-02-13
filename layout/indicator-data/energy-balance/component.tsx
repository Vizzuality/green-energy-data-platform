import React, {
  FC,
} from 'react';

import cx from 'classnames';

import { useRouter } from 'next/router';

// types
import { Component } from 'types/data';

// components
import VisualizationsNav from 'components/visualizations-nav';

import EnergyBalance from './energy-balance';

const IndicatorData: FC<Component> = ({
  className,
}: Component) => {
  const router = useRouter();
  const { query: { group: groupSlug } } = router;

  return (
    <div className={cx('bg-white rounded-2.5xl text-gray1 divide-y divide-gray shadow',
      { [className]: className })}
    >
      <VisualizationsNav
        active="csv"
        groupSlug={groupSlug}
        className="w-full px-8 lg:px-32 md:px-24 sm:px-16"
        visualizationTypes={['csv']}
      />
      <div className="flex flex-col w-full px-16 lg:px-32 md:px-24 py-11 space-y-7.5 min-h-[285px]">
        <EnergyBalance />
      </div>
    </div>
  );
};

export default IndicatorData;
