import { NextApiRequest, NextApiResponse } from 'next';

import {
  SUBGROUPS,
} from 'constants/api-payloads';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(SUBGROUPS);
};
