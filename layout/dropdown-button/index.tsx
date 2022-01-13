import React, { FC } from 'react';
import i18next from 'i18next';

// components
import Icon from 'components/icon';

// types
export interface DrodownButtonTypes {
  elKey: string,
  display: string | number,
  translationKey: string,
  icon?: string,
  iconLabel?: string,
}

const DropdownButton: FC<DrodownButtonTypes> = ({
  display,
  elKey,
  translationKey,
  icon,
  iconLabel,
}: DrodownButtonTypes) => (
  <div className="mb-2 whitespace-nowrap items-center border text-color1 border-gray1 border-opacity-20 py-0.5 px-4 rounded-full mr-4 md:flex hidden">
    <span className="mr-2 hidden md:flex">
      {i18next.t(elKey)}
      :
    </span>
    <span>
      {display || i18next.t(translationKey)}
    </span>
    {!!icon && <Icon ariaLabel={iconLabel} name={icon} className="ml-4" />}
  </div>
);

export default DropdownButton;
