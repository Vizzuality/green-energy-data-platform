import axios from 'axios';

class Sources {
  static all() {
    return axios.get('/sources.json').then((resp) => resp.data);
  }
}

export default Sources;
