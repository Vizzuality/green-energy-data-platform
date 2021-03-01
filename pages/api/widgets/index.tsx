import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json([
    {
      widget1: {
        data: [
          {
            label: 'name1',
            value: 'value1',
          },
          {
            label: 'name2',
            value: 'value3',
          },
        ],
      },
    },
    {
      widget2: {
        data: [
          {
            label: 'name1',
            value: 'value1',
          },
          {
            label: 'name2',
            value: 'value3',
          }
        ],
      },
    },
  ]);
};
