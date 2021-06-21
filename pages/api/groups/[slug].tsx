import { NextApiRequest, NextApiResponse } from 'next';

import {
  GROUPS,
} from 'constants/api-payloads';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: {
      slug: querySlug,
    },
  } = req;

  res.status(200).json(GROUPS.find(({ slug }) => querySlug === slug));
};
