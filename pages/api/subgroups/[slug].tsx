import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: {
      slug: querySlug,
    },
  } = req;

  res.status(200).json([
    {
      slug: 'whatever1', id: 1, name: 'Energy Balance', group: 1,
    },
    {
      slug: 'whatever2', id: 2, name: 'Energy Supply', group: 2,
    },
    {
      slug: 'whatever3', id: 3, name: 'Energy Efficiency', group: 1,
    },
    {
      slug: 'whatever4', id: 4, name: 'Energy Trade', group: 1,
    },
    {
      slug: 'whatever5', id: 5, name: 'Energy Investment', group: 1,
    },
    {
      slug: 'whatever6', id: 6, name: 'Electricity', group: 1,
    },
    {
      slug: 'whatever7', id: 7, name: 'Energy Price', group: 1,
    },
    {
      slug: 'whatever8', id: 8, name: 'Energy Technology', group: 1,
    },
    {
      slug: 'whatever9', id: 9, name: 'Energy Consumption', group: 1,
    },
    {
      slug: 'whatever10', id: 10, name: 'Internantional Comparison', group: 1,
    },
    {
      slug: 'whatever11', id: 11, name: 'Emissions & Natural Disaters', group: 1,
    },
    {
      slug: 'whatever12', id: 12, name: 'Transporation sector', group: 1,
    },
    {
      slug: 'whatever123', id: 13, name: 'Industry sector', group: 1,
    },
    {
      slug: 'whatever231', id: 14, name: 'Buildings', group: 1,
    },
    {
      slug: 'whatever6578', id: 15, name: 'Energy Resources Reserves', group: 1,
    },
    {
      slug: 'whatever345', id: 16, name: 'Energy Balance', group: 1,
    },
    {
      slug: 'whatever324', id: 26, name: 'Energy Supply', group: 1,
    },
    {
      slug: 'whatever678', id: 36, name: 'Energy Efficiency', group: 1,
    },
    {
      slug: 'whatever44', id: 47, name: 'Energy Trade', group: 1,
    },
    {
      slug: 'whatever45', id: 57, name: 'Energy Investment', group: 1,
    },
    {
      slug: 'whatever48', id: 68, name: 'Electricity', group: 1,
    },
    {
      slug: 'whatever22', id: 79, name: 'Energy Price', group: 1,
    },
    {
      slug: 'whatever33', id: 89, name: 'Energy Technology', group: 1,
    },
    {
      slug: 'whatever37', id: 99, name: 'Energy Consumption', group: 1,
    },
    {
      slug: 'whatever99', id: 101, name: 'Internantional Comparison', group: 1,
    },
    {
      slug: 'whatever100', id: 111, name: 'Emissions & Natural Disaters', group: 1,
    },
    {
      slug: 'whatever222', id: 121, name: 'Transporation sector', group: 1,
    },
    {
      slug: 'whatever33333', id: 131, name: 'Industry sector', group: 1,
    },
    {
      slug: 'whatever451', id: 141, name: 'Buildings', group: 1,
    },
    {
      slug: 'whatever432', id: 151, name: 'Energy Resources Reserves', group: 1,
    },
  ].filter(({ slug }) => querySlug === slug));
};
