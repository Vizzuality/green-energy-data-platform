import i18next from 'i18next';

export const COLORS = {
  'natural gas': '#FF7629',
  oil: '#1D8190',
  coal: '#0C3CC4',
  fossil: '#A97500',
  geothermal: '#CC1771',
  wind: '#A880FF',
  solar: '#FEB961',
  biomass: '#14C176',
  hydro: '#29C2DA',
  nuclear: '#FF61CA',
  ocean: '#00A3FE',
  'other energy': 'rgba(142, 145, 149, 0.9)',
  electricity: '#6905E8',
  gasses: '#FF7629',
  heat: '#CC1771',
  hydrogen: '#FF7629',
  liquids: '#006BFE',
  solid: '#FD1A2F',
};

export const TITLE = [i18next.t('energySources'), i18next.t('energyTransformation'), i18next.t('finalConsumption')];

export default { COLORS, TITLE };
