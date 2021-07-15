import { NextApiRequest, NextApiResponse } from 'next';

import {
  SUBGROUPS,
} from 'constants/api-payloads';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: {
      slug: querySlug,
    },
  } = req;
  res.status(200).json(SUBGROUPS.find(({ slug, id }) => (querySlug === slug) || (querySlug === id.toString())));
};
