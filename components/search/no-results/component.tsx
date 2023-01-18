import React, { FC } from 'react';

import i18next from 'i18next';

interface NoResultsProps {
  className: string
}

const dataNotFound = i18next.t('dataNotFound');

const NoResults: FC<NoResultsProps> = ({ className }: NoResultsProps) => (
  <div className={`z-10 absolute left-1/2 transform -translate-x-1/2 bg-white lg:px-48 md:px-32 sm:px-8 shadow-xsm justify-center m-auto items-center flex flex-col py-16 ${className}`}>
    <img alt="No data" src="/images/illus_nodata.svg" className="h-auto mx-16 w-28" />
    <p className="text-gray1">{dataNotFound}</p>
  </div>
);

export default NoResults;
