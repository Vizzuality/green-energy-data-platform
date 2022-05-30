import React, { FC } from 'react';
import i18next from 'i18next';

// components
import Icon from 'components/icon';

import { DROPDOWN_BUTTON_STYLES, TEXT_BUTTON_STYLES } from 'layout/indicator-data/constants';

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
  <div className={DROPDOWN_BUTTON_STYLES}>
    <span className="mr-2 hidden md:flex">
      {i18next.t(elKey)}
      :
    </span>
    <span title={display.toString() || i18next.t(translationKey)} className={TEXT_BUTTON_STYLES}>
      {display || i18next.t(translationKey)}
    </span>
    {!!icon && <Icon ariaLabel={iconLabel} name={icon} size="sm" className="ml-4" />}
  </div>
);

export default DropdownButton;
