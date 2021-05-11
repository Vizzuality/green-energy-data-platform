import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: {
      slug: querySlug,
    },
  } = req;
  res.status(200).json([
    {
      slug: 'energy-balance', id: 1, name: 'Energy Balance', group: 'energy',
    },
    {
      slug: 'energy-supply', id: 2, name: 'Energy Supply', group: 'energy',
    },
    {
      slug: 'energy-efficiency', id: 3, name: 'Energy Efficiency', group: 'energy',
    },
    {
      slug: 'energy-trade', id: 4, name: 'Energy Trade', group: 'energy',
    },
    {
      slug: 'energy-investment', id: 5, name: 'Energy Investment', group: 'energy',
    },
    {
      slug: 'electricity', id: 6, name: 'Electricity', group: 'energy',
    },
    {
      slug: 'energy-price', id: 7, name: 'Energy Price', group: 'energy',
    },
    {
      slug: 'energy-technology', id: 8, name: 'Energy Technology', group: 'energy',
    },
    {
      slug: 'energy-consumption', id: 9, name: 'Energy Consumption', group: 'energy',
    },
    {
      slug: 'internantional-comparison', id: 10, name: 'Internantional Comparison', group: 'energy',
    },
    {
      slug: 'emissions&natural-disaters', id: 11, name: 'Emissions & Natural Disaters', group: 'energy',
    },
    {
      slug: 'transporation-sector', id: 12, name: 'Transporation sector', group: 'energy',
    },
    {
      slug: 'industry-sector', id: 13, name: 'Industry sector', group: 'energy',
    },
    {
      slug: 'buildings', id: 14, name: 'Buildings', group: 'energy',
    },
    {
      slug: 'energy-resources-reserves', id: 15, name: 'Energy Resources Reserves', groupId: '1',
    },
    {
      slug: 'Agriculture', id: 16, name: 'Agriculture', groupId: '2',
    },
    {
      slug: 'building', id: 26, name: 'Building', groupId: '2',
    },
    {
      slug: 'employment', id: 36, name: 'Employment', groupId: '2',
    },
    {
      slug: 'exchange-rRate', id: 47, name: 'Exchange Rate', groupId: '2',
    },
    {
      slug: 'GDP', id: 57, name: 'GDP', groupId: '2',
    },
    {
      slug: 'imports&exports', id: 68, name: 'Imports and exports', groupId: '2',
    },
    {
      slug: 'industry', id: 79, name: 'Industry', groupId: '2',
    },
    {
      slug: 'transportation', id: 89, name: 'Transportation', group: 'energy',
    },
    {
      slug: 'capacity', id: 99, name: 'Capacity', group: 'energy',
    },
    {
      slug: 'whatever99', id: 101, name: 'Internantional Comparison', group: 'energy',
    },
    {
      slug: 'whatever100', id: 111, name: 'Emissions & Natural Disaters', group: 'energy',
    },
    {
      slug: 'whatever222', id: 121, name: 'Transporation sector', group: 'energy',
    },
    {
      slug: 'whatever33333', id: 131, name: 'Industry sector', group: 'energy',
    },
    {
      slug: 'whatever451', id: 141, name: 'Buildings', group: 'energy',
    },
    {
      slug: 'whatever432', id: 151, name: 'Energy Resources Reserves', group: 'energy',
    },
  ].find(({ slug }) => querySlug === slug));
};
