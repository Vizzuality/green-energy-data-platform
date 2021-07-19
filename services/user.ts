import { APInext, API } from 'lib/api';

export const fetchUsers = () => API.get('/users')
  .then(({ data }) => data);
  // .catch((e) => {
  //     console.log(e, 'error');
  // });

export const fetchUserMe = (
  userToken: string,
  headers = {},
) => APInext.get('/users/signup', {
  headers: {
    Authorization: userToken,
    ...headers,
  },
})
  .then(({ data }) => data);

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
  }).then(({ data }) => data);

export default {
  fetchUsers,
  fetchUserMe,
};
