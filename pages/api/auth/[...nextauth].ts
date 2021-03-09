import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { fetchUsers } from '../../../services/user';

interface PagesProps {
  signIn: string
}

interface ProviderCredentialsOptions {
  id: string,
  authorize: (credentials?: Record<'email' | 'password', string>) => Promise<any>
}

interface OptionsProps {
  pages: PagesProps,
  providers: any // TO - DO change type any once it's finished
}

const options: OptionsProps = {
  pages: {
    signIn: '/signin',
  },
  // Configure one or more authentication providers
  providers: [
    // We will expect credentials as argument
    Providers.Credentials <ProviderCredentialsOptions>({
      id: 'credentials',
      async authorize() {
        const user = await fetchUsers(); // TO - DO add credentials as argument

        // Any object returned will be saved in `user` property of the JWT
        if (user) return user;

        return null;
      },
    }),
  ],
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
