import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json([
    {
      id: 1,
      slug: 'energy',
      name: 'Energy',
      status: 'active',
      subgroups: [
        { id: 1, name: 'Energy Balance' },
        { id: 2, name: 'Energy Supply' },
        { id: 3, name: 'Energy Efficiency' },
        { id: 4, name: 'Energy Trade' },
        { id: 5, name: 'Energy Investment' },
        { id: 6, name: 'Electricity' },
        { id: 7, name: 'Energy Price' },
        { id: 8, name: 'Energy Technology' },
        { id: 9, name: 'Energy Consumption' },
        { id: 10, name: 'Internantional Comparison' },
        { id: 11, name: 'Emissions & Natural Disaters' },
        { id: 12, name: 'Transporation sector' },
        { id: 13, name: 'Industry sector' },
        { id: 14, name: 'Buildings' },
        { id: 15, name: 'Energy Resources Reserves' },
      ],
    },
    {
      id: 2,
      slug: 'socio-economic',
      name: 'Socio-economic',
      status: 'disabled',
      subgroups: [
        { id: 1, name: 'Energy Balance' },
        { id: 2, name: 'Energy Supply' },
        { id: 3, name: 'Energy Efficiency' },
        { id: 4, name: 'Energy Trade' },
        { id: 5, name: 'Energy Investment' },
        { id: 6, name: 'Electricity' },
        { id: 7, name: 'Energy Price' },
        { id: 8, name: 'Energy Technology' },
        { id: 9, name: 'Energy Consumption' },
        { id: 10, name: 'Internantional Comparison' },
        { id: 11, name: 'Emissions & Natural Disaters' },
        { id: 12, name: 'Transporation sector' },
        { id: 13, name: 'Industry sector' },
        { id: 14, name: 'Buildings' },
        { id: 15, name: 'Energy Resources Reserves' },
      ],
    },
    {
      id: 3,
      slug: 'coal-power-plant',
      name: 'Coal power plant',
      status: 'disabled',
      subgroups: [
        { id: 1, name: 'Energy Balance' },
        { id: 2, name: 'Energy Supply' },
        { id: 3, name: 'Energy Efficiency' },
        { id: 4, name: 'Energy Trade' },
        { id: 5, name: 'Energy Investment' },
        { id: 6, name: 'Electricity' },
        { id: 7, name: 'Energy Price' },
        { id: 8, name: 'Energy Technology' },
        { id: 9, name: 'Energy Consumption' },
        { id: 10, name: 'Internantional Comparison' },
        { id: 11, name: 'Emissions & Natural Disaters' },
        { id: 12, name: 'Transporation sector' },
        { id: 13, name: 'Industry sector' },
        { id: 14, name: 'Buildings' },
        { id: 15, name: 'Energy Resources Reserves' },
      ],
    },
    {
      id: 4,
      slug: 'lorem ipsum',
      name: 'lorem ipsum',
      status: 'disabled',
      subgroups: [
        { id: 1, name: 'Energy Balance' },
        { id: 2, name: 'Energy Supply' },
        { id: 3, name: 'Energy Efficiency' },
        { id: 4, name: 'Energy Trade' },
        { id: 5, name: 'Energy Investment' },
        { id: 6, name: 'Electricity' },
        { id: 7, name: 'Energy Price' },
        { id: 8, name: 'Energy Technology' },
        { id: 9, name: 'Energy Consumption' },
        { id: 10, name: 'Internantional Comparison' },
        { id: 11, name: 'Emissions & Natural Disaters' },
        { id: 12, name: 'Transporation sector' },
        { id: 13, name: 'Industry sector' },
        { id: 14, name: 'Buildings' },
        { id: 15, name: 'Energy Resources Reserves' },
      ],
    },
    {
      id: 5,
      slug: 'lorem ipsum2',
      name: 'lorem ipsum',
      status: 'disabled',
      subgroups: [
        { id: 1, name: 'Energy Balance' },
        { id: 2, name: 'Energy Supply' },
        { id: 3, name: 'Energy Efficiency' },
        { id: 4, name: 'Energy Trade' },
        { id: 5, name: 'Energy Investment' },
        { id: 6, name: 'Electricity' },
        { id: 7, name: 'Energy Price' },
        { id: 8, name: 'Energy Technology' },
        { id: 9, name: 'Energy Consumption' },
        { id: 10, name: 'Internantional Comparison' },
        { id: 11, name: 'Emissions & Natural Disaters' },
        { id: 12, name: 'Transporation sector' },
        { id: 13, name: 'Industry sector' },
        { id: 14, name: 'Buildings' },
        { id: 15, name: 'Energy Resources Reserves' },
      ],
    }]);
};
