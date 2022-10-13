import React, {
  FC,
  useState,
} from 'react';
import i18next from 'i18next';
import cx from 'classnames';

import Icon from 'components/icon';

const dataFiles = [
  'Energy Balance (Physical Quantity).CSV',
  'Energy Balance (Standard Quantity).CSV',
  'Overall Energy Balance.CSV',
];

// Energy Balance by Fuel Type
const FUELTYPE = [
  'Coal.CSV',
  'Coke.CSV',
  'Petroleum.CSV',
  'Crude Oil.CSV',
  'Fuel Oil.CSV',
  'Gasoline.CSV',
  'Kerosene.CSV',
  'Diesel Oil.CSV',
  'Liquefied Petroleum.CSV',
  'Natural Gas.CSV',
  'Electricity.CSV',
];

const Indicator: FC = () => {
  const [dropdownOpen, setDropdown] = useState(true);
  const toggleDropdown = () => setDropdown(!dropdownOpen);
  return (
    <div>
      <div>
        <h4 className="py-10">
          {i18next.t('downloadDataFiles')}
          :
        </h4>
        <ul className="space-y-4">{dataFiles.map((d) => <li key={d} className="text-color1 underline">{d}</li>)}</ul>
      </div>
      <div>
        <button type="button" onClick={toggleDropdown} className="flex items-center py-5 font-bold">
          <Icon
            ariaLabel={dropdownOpen ? 'collapse' : 'expand'}
            name="triangle_border"
            size="sm"
            className={cx('mr-4', {
              'transform rotate-180': !dropdownOpen,
            })}
          />
          <span>
            Energy balance by fuel type
          </span>
        </button>
        {dropdownOpen && <ul className="space-y-4">{FUELTYPE.map((d) => <li key={d} className="text-color1 underline"><a href="">{d}</a></li>)}</ul>}
      </div>
    </div>
  );
};

export default Indicator;
