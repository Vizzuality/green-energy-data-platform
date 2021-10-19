import React, { FC } from 'react';

interface NoResultsProps {
  className: string
}

const NoResults: FC<NoResultsProps> = ({ className }: NoResultsProps) => (
  <div className={`z-10 absolute left-1/2 transform -translate-x-1/2 bg-white lg:px-48 md:px-32 sm:px-8 shadow-xsm justify-center m-auto items-center flex flex-col py-16 ${className}`}>
    <img alt="No data" src="/images/illus_nodata.svg" className="w-28 h-auto mx-16" />
    <p className="text-gray1">Data not found</p>
  </div>
);

export default NoResults;
