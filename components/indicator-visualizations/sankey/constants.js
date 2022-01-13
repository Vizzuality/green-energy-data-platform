import i18next from 'i18next';

export const COLORS = {
  'Natural gas': '#FF7629',
  Oil: '#1D8190',
  Coal: '#0C3CC4',
  Fossil: '#A97500',
  Geothermal: '#CC1771',
  Wind: '#A880FF',
  Solar: '#FEB961',
  Biomass: '#14C176',
  Hydro: '#29C2DA',
  Nuclear: '#FF61CA',
  Ocean: '#00A3FE',
  'Other energy': 'rgba(142, 145, 149, 0.9)',
  Electricity: '#6905E8',
  Gasses: '#FF7629',
  Heat: '#CC1771',
  Hydrogen: '#FF7629',
  Liquids: '#006BFE',
  Solid: '#FD1A2F',
};

export const TITLE = [i18next.t('energySources'), i18next.t('energyTransformation'), i18next.t('finalConsumption')];

export default { COLORS, TITLE };
