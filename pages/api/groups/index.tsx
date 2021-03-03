import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json([
    {
      id: 'energy',
      name: 'Energy',
      status: 'active',
    },
    {
      id: 'socio-economic',
      name: 'Socio-economic',
      status: 'disabled',
    },
    {
      id: 'coal-power-plant',
      name: 'Coal power plant',
      status: 'disabled',
    },
  ]);
};
