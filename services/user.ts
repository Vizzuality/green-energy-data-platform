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
  }).then(({ data }) => data);

// Updates user details
export const updateUser = (
  params = {},
  userToken: string | string[],
) => API.put('/users/me',
  {
    ...params,
  },
  {
    headers: {
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
      Authentication: `Bearer ${userToken}`,
    },
  });
