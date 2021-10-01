import React, { FC } from 'react';

const NoResults: FC = () => (
  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl box-border py-16 flex flex-col justify-center m-auto items-center lg:px-48 md:px-32 sm:px-8">
    <img alt="No data" src="/images/illus_nodata.svg" className="w-28 h-auto mx-16" />
    <p className="text-gray1">Data not found</p>
  </div>
);

export default NoResults;
