import axios from 'axios';

// move externally
const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_FAKE_API_URL}`,
  headers: { 'Content-Type': 'application/json' },
});

export const fetchUsers = () => {
  return API.get('/users')
    .then(({ data }) => data);
  // .catch((e) => {
  //     console.log(e, 'error');
  // });
};

export default fetchUsers;
