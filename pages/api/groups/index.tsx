import { NextApiRequest, NextApiResponse } from 'next';

import {
  GROUPS,
} from 'constants/api-payloads';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(GROUPS);
};
