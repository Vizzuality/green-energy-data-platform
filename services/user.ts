import { API } from 'lib/api';

export const fetchUsers = () => API.get('/users')
  .then(({ data }) => data);

export const fetchUserMe = (
  userToken: string,
  headers = {},
) => API.get('/users/me', {
  headers: {
    Authentication: userToken,
    ...headers,
  },
})
  .then(({ data }) => data);

export const logIn = (
  params = {},
) => API.post('/users/login',
  {
    ...params,
  },
  {
    headers: {
      'Api-Auth': process.env.NEXT_PUBLIC_API_TOKEN,
    },
  }).then(({ data }) => data);

export const signUp = (
  params = {},
) => API.post('/users/signup',
  {
    ...params,
  },
  {
    headers: {
      'Api-Auth': process.env.NEXT_PUBLIC_API_TOKEN,
    },
  }).then(({ data, status }) => ({ data, status }));

export const updateUser = (
  params = {},
  userToken: string,
) => API.put('/users/me',
  {
    ...params,
  },
  {
    headers: {
      'Api-Auth': process.env.NEXT_PUBLIC_API_TOKEN,
      Authentication: `Bearer ${userToken}`,
    },
  }).then(({ data }) => data);

export const passwordRecovery = (
  params = {},
) => API.get('/users/recover_password_token',
  {
    ...params,
  }).then((response) => console.log(params, response));

export const passwordChangeToRecover = (
  params = {},
  recoveryToken: string,
  headers = {},
) => API.get('/users/change_password',
  {
    ...params,
  },
  {
    headers: {
      Authentication: recoveryToken,
      ...headers,
    },
  }).then((response) => console.log(response));
