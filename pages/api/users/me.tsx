import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(
    {
      id: 2,
      email: 'henrique.mendoza@test.com',
      name: 'Henri Mendoza',
    },
  );
};
