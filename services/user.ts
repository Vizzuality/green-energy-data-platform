import { APInext, API } from 'lib/api';

const API_TOKEN = process.env.NEXT_API_TOKEN;

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
    API_TOKEN,
    ...params,
  }).then(({ data }) => data);

export default {
  fetchUsers,
  fetchUserMe,
};
