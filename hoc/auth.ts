import { getSession } from 'next-auth/client';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

// services
import { fetchUserMe } from 'services/user';

export function withAuthentication(getServerSidePropsFunc?: Function) {
  return async (context: any) => {
    const session = await getSession(context);

    if (!session && !process.env.NEXT_PUBLIC_FEATURE_FLAG_SKIP_AUTH) {
      return {
        redirect: {
          // if the user access to an authenticated page and it's not logged,
          // redirect the user to the signin with a callbackURL to return later
          // where the user meant to navigate initially
          destination: !context.req.url.includes('signin') ? `/signin?callbackUrl=${context.req.url}` : '/signin',
          permanent: false,
        },
      };
    }

    if (!session && process.env.NEXT_PUBLIC_FEATURE_FLAG_SKIP_AUTH) {
      if (getServerSidePropsFunc) {
        const SSPF = await getServerSidePropsFunc(context, session);
        return {
          props: {
            ...SSPF.props,
          },
        };
      }
      return {
        props: {
        },
      };
    }

    if (getServerSidePropsFunc) {
      const SSPF = await getServerSidePropsFunc(context, session);
      return {
        props: {
          session,
          ...SSPF.props,
        },
      };
    }

    if (getServerSidePropsFunc) {
      const SSPF = await getServerSidePropsFunc(context, session);
      return {
        props: {
          session,
          ...SSPF.props,
        },
      };
    }

    return {
      props: {
        session,
      },
    };
  };
}

export function withUser(getServerSidePropsFunc?: Function) {
  return async (context: any) => {
    const session = await getSession(context);

    if (!session && !process.env.NEXT_PUBLIC_FEATURE_FLAG_SKIP_AUTH) {
      if (getServerSidePropsFunc) {
        const SSPF = await getServerSidePropsFunc(context) || {};

        return {
          props: {
            ...SSPF.props,
          },
        };
      }

      return {
        props: {},
      };
    }

    const queryClient = new QueryClient();

    queryClient.prefetchQuery('me',
      () => fetchUserMe(`Bearer ${session.accessToken}`)
        .then((data) => data));

    if (getServerSidePropsFunc) {
      const SSPF = await getServerSidePropsFunc(context) || {};

      return {
        props: {
          session,
          dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
          ...SSPF.props,
        },
      };
    }

    return {
      props: {
        session,
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
    };
  };
}

export default {
  withAuthentication,
  withUser,
};
