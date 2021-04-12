import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json([
    {
      id: 'energy',
      name: 'Energy',
      status: 'active',
      subgroups: ['subgroup1', 'subgroup3', 'subgroup3'],
    },
    {
      id: 'socio-economic',
      name: 'Socio-economic',
      status: 'disabled',
      subgroups: ['subgroup1', 'subgroup3', 'subgroup3'],
    },
    {
      id: 'coal-power-plant',
      name: 'Coal power plant',
      status: 'disabled',
      subgroups: ['subgroup1', 'subgroup3', 'subgroup3'],
    },
    {
      id: 'lorem ipsum',
      name: 'lorem ipsum',
      status: 'disabled',
      subgroups: ['subgroup1', 'subgroup3', 'subgroup3'],
    },
    {
      id: 'lorem ipsum2',
      name: 'lorem ipsum',
      status: 'disabled',
      subgroups: ['subgroup1', 'subgroup3', 'subgroup3'],
    },
  ]);
};
