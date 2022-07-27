import axios from 'axios';
import consumer, { host } from './consumer';

export default {
  https() {
    return `http://${host}`;
  },
  sendData(url, data, callback, handler) {
    consumer
      .request({
        url: `${this.https()}${url}`,
        method: 'POST',
        data,
      })
      .then((response) => callback(response.data))
      .catch((error) => handler(error.response.data));
  },
};
