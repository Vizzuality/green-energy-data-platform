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
}: DrodownButtonTypes) => {
  // language keys
  const translationKeyLang = i18next.t(translationKey);
  const elKeyLang = i18next.t(elKey);

  return (
    <div className={DROPDOWN_BUTTON_STYLES}>
      <span className="hidden mr-2 md:flex">
        {elKeyLang}
        :
      </span>
      <span title={display.toString() || translationKeyLang} className={TEXT_BUTTON_STYLES}>
        {display || translationKeyLang}
      </span>
      {!!icon && <Icon ariaLabel={iconLabel} name={icon} size="sm" className="ml-4" />}
    </div>
  );
};

export default DropdownButton;
