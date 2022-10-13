import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

// services
import { logIn } from 'services/user';

// time the session will be active if the user is inactive.
const MAX_AGE = 12 * 60 * 60; // 12 hours

export default NextAuth({
  pages: {
    signIn: '/signin',
  },
  session: {
    jwt: true,
    maxAge: MAX_AGE,
  },
  // Configure one or more authentication providers
  providers: [
    // We will expect credentials as argument
    Providers.Credentials({
      id: 'email-password',
      name: 'email + password',
      async authorize(credentials) {
        let user = null;
        try {
          user = await logIn(credentials);
        } catch (e) {
          throw new Error(`Error signing in: ${e.message}`);
        }

        // Any object returned will be saved in `user` property of the JWT
        if (user) return user;

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt(token, user) {
      return ({
        ...token,
        ...user?.jwt_token && {
          accessToken: user.jwt_token,
        },
      });
    },
    async session(session, token) {
      return ({
        ...session,
        accessToken: token.accessToken,
      });
    },
  },
});
