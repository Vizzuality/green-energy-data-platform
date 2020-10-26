import axios from 'axios';
import Sources from './sources';

jest.mock('axios');

test('should fetch sources', () => {
  const sources = [
    {
      id: 1,
      name: 'coal',
    },
    {
      id: 2,
      name: 'natural gas',
    },
    {
      id: 3,
      name: 'petroleum',
    }];
  const resp = { data: sources };
  axios.get.mockResolvedValue(resp);

  return Sources.all().then((data) => expect(data).toEqual(sources));
});
