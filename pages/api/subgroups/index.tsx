import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json([
    {
      slug: 'energy-balance', id: 1, name: 'Energy Balance', group: '1',
    },
    {
      slug: 'energy-supply', id: 2, name: 'Energy Supply', group: '1',
    },
    {
      slug: 'energy-efficiency', id: 3, name: 'Energy Efficiency', group: '1',
    },
    {
      slug: 'energy-trade', id: 4, name: 'Energy Trade', group: '1',
    },
    {
      slug: 'energy-investment', id: 5, name: 'Energy Investment', group: '1',
    },
    {
      slug: 'electricity', id: 6, name: 'Electricity', group: '1',
    },
    {
      slug: 'energy-price', id: 7, name: 'Energy Price', group: '1',
    },
    {
      slug: 'energy-technology', id: 8, name: 'Energy Technology', group: '1',
    },
    {
      slug: 'energy-consumption', id: 9, name: 'Energy Consumption', group: '1',
    },
    {
      slug: 'internantional-comparison', id: 10, name: 'Internantional Comparison', group: '1',
    },
    {
      slug: 'emissions&natural-disaters', id: 11, name: 'Emissions & Natural Disaters', group: '1',
    },
    {
      slug: 'transporation-sector', id: 12, name: 'Transporation sector', group: '1',
    },
    {
      slug: 'industry-sector', id: 13, name: 'Industry sector', group: '1',
    },
    {
      slug: 'buildings', id: 14, name: 'Buildings', group: '1',
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
      slug: 'whatever33', id: 89, name: 'Energy Technology', groupId: '2',
    },
    {
      slug: 'whatever37', id: 99, name: 'Energy Consumption', group: '1',
    },
    {
      slug: 'whatever99', id: 101, name: 'Internantional Comparison', group: '1',
    },
    {
      slug: 'whatever100', id: 111, name: 'Emissions & Natural Disaters', group: '1',
    },
    {
      slug: 'whatever222', id: 121, name: 'Transporation sector', group: '1',
    },
    {
      slug: 'whatever33333', id: 131, name: 'Industry sector', group: '1',
    },
    {
      slug: 'whatever451', id: 141, name: 'Buildings', group: '1',
    },
    {
      slug: 'whatever432', id: 151, name: 'Energy Resources Reserves', group: '1',
    },
  ]);
};
