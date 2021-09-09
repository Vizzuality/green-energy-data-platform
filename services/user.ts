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

// Upades user details
export const updateUser = (
  params = {},
  userToken: string | string[],
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

// Sends and email with restore password link
export const passwordRecovery = (
  email: string,
  params = {},
) => API.get('/users/recover-password-token',
  {
    params: {
      email,
      ...params,
    },
  }).then(({ data, status, statusText }) => {
  if (status >= 300) {
    throw new Error(`Error happened while requesting email. Error - ${status}: ${statusText}`);
  }
  return data;
});

export const deleteUser = (
  userToken: string,
) => API.delete('/users/me',
  {
    headers: {
      'Api-Auth': process.env.NEXT_PUBLIC_API_TOKEN,
      Authentication: `Bearer ${userToken}`,
    },
  });
