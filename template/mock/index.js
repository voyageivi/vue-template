import MockAdapter from 'axios-mock-adapter';
import axios from '@/api';

const mock = new MockAdapter(axios.def.inst, {
  delayResponse: 200
});
mock.onGet('/users').reply(200, {
  users: []
});
