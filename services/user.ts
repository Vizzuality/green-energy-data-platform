import { API } from 'lib/api';

export const fetchUsers = () => API.get('/users')
  .then(({ data }) => data);
  // .catch((e) => {
  //     console.log(e, 'error');
  // });

export const fetchUserMe = (
  userToken: string,
  headers = {},
) => API.get('/users/me', {
  headers: {
    Authorization: userToken,
    ...headers,
  },
})
  .then(({ data }) => data);

export default {
  fetchUsers,
  fetchUserMe,
};
