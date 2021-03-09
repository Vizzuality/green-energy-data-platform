import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { fetchUsers } from 'services/user';

// interface ProviderCredentialsOptions {
//   name: string,
//   credentials: {},
//   id: string,
//   authorize: unknown
// }

type OptionsProps = {
  pages: {
    signIn: string;
  };
  providers: any; // TO - DO change type once it's finished
};

const options: OptionsProps = {
  pages: {
    signIn: '/signin',
  },
  // Configure one or more authentication providers
  providers: [
    // We will expect credentials as argument

    Providers.Credentials({
      id: 'credentials',
      credentials: {
      },
      name: 'credentials',
      async authorize() {
        const user = await fetchUsers(); // TO - DO add credentials as argument

        // Any object returned will be saved in `user` property of the JWT
        if (user) {
          return user;
        }

        return null;
      },
    }),
  ],
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
