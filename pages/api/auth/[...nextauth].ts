import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { logIn } from 'services/user';

interface ProviderCredentialsOptions {
  id: string;
  name: string;
  authorize(credentials: Record<string, string>): Promise<any>;
}

type OptionsProps = {
  pages: {
    signIn: string;
  };
  session: {
    jwt: boolean,
    maxAge: number
  }
  providers: ProviderCredentialsOptions[]; // TO - DO change type once it's finished
  callbacks: any,
};

// time the session will be active if the user is inactive.
const MAX_AGE = 12 * 60 * 60; // 12 hours

const options: OptionsProps = {
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
      async authorize(credentials){
        console.log('credentials', credentials);
        let user = null;
        try {
          user = await logIn(credentials);
          console.log('user', user);
        } catch (e) {
          console.log(e.message);
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
      const newSession = session;
      newSession.accessToken = token.accessToken;
      return newSession;
    },
    async redirect() {
      // // By default it should be redirect to /
      // if (['/sign-in', '/sign-up', '/auth-callback'].includes(callbackUrl)) {
      //   return '/';
      // }
      // return callbackUrl;
    },
  },
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
