import API from 'utils/api';

const fetchWidgets = () => API.get('/widgets')
  .then(({ data }) => data)
  .catch((e) => {
    console.log(e, 'error');
  });

export default fetchWidgets;
