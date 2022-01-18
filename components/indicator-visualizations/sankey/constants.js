import i18next from 'i18next';

export const COLORS = {
  'natural gas': '#FF7629',
  oil: '#1D8190',
  coal: '#0C3CC4',
  'oil products': '#A97500',
  Geothermal: '#CC1771',
  'coal products': '#A880FF',
  Solar: '#FEB961',
  'crude oil': '#14C176',
  Hydro: '#29C2DA',
  Nuclear: '#FF61CA',
  'raw coal': '#00A3FE',
  'other energy': 'rgba(142, 145, 149, 0.9)',
  electricity: '#6905E8',
  Gasses: '#FF7629',
  heat: '#CC1771',
  Hydrogen: '#FF7629',
  Liquids: '#006BFE',
  natural: '#FD1A2F',
};

export const TITLE = [i18next.t('energySources'), i18next.t('energyTransformation'), i18next.t('finalConsumption')];

export default { COLORS, TITLE };
