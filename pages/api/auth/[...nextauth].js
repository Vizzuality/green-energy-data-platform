import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { fetchUsers } from '../../../services/user';

export default NextAuth({
  pages: {
    signIn: '/signin',
  },
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      id: 'credentials',
      async authorize(credentials) {
        const user = await fetchUsers(credentials);

        // Any object returned will be saved in `user` property of the JWT
        if (user) return user;

        return null;
      },
    }),
  ],
});
