import { API } from 'lib/api';

export const fetchUsers = () => API.get('/users')
  .then(({ data }) => data);
  // .catch((e) => {
  //     console.log(e, 'error');
  // });

export const fetchUserMe = (
  params = {},
  headers = {},
) => API.get('/users/me', {
  headers: {
    ...headers,
  },
  params,
})
  .then(({ data }) => data);

export default {
  fetchUsers,
  fetchUserMe,
};
