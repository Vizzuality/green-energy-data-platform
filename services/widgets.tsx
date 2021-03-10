import API from 'utils/api';

const fetchWidgets = () => API.get('/widgets')
  .then(({ data }) => data);

export default fetchWidgets;
