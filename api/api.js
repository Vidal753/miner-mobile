import axios from 'axios';

export default {
  https() {
    return `http://127.0.0.1:8000`;
  },
  getRatras(data, callback, handler) {
    axios
      .request({
        url: `http://127.0.0.1:8000/api/rastra/`,
        method: 'POST',
        data,
      })
      .then((response) => callback(response.data))
      .catch((error) => handler(error.response.data));
  },
};
