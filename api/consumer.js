import axios from 'axios';
import { LOGIN, REFRESH } from '../reducer/auth';
import { store } from '../store';

const host = '192.168.1.14:8000/';

const refreshAccessToken = async function() {
    let response = await axios
        .request({
            method: 'POST',
            url: `http://${host}api/token/refresh/`,
            data: {
                refresh: store.getState().auth.refresh,
            },
        })
        .catch(async error => {
            response = await axios.request({
                method: 'POST',
                url: `http://${host}api/token/`,
                data: {
                    username: store.getState().auth.username,
                    password: store.getState().auth.password,
                },
            });
            if (response && response.status === 200) {
                store.dispatch({
                    type: LOGIN,
                    payload: response.data,
                });
            }
        });
    if (response && response.status === 200) {
        store.dispatch({
            type: REFRESH,
            payload: response.data,
        });
    }
};

const consumer = axios.create();

consumer.interceptors.request.use(
    async config => {
        config.headers = {
            Authorization: `Bearer ${store.getState().auth.access}`,
            Accept: 'application/json',
            'Content-type': 'Application/json',
        };
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

consumer.interceptors.response.use(
    response => {
        return response;
    },
    async function(error) {
        let response_status;
        try {
            response_status = error.response.status;
        } catch {
            response_status = 200;
        }
        const originalRequest = error.config;
        if (response_status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            await refreshAccessToken();
            return consumer(originalRequest);
        }
        return Promise.reject(error);
    }
);

export default consumer;
export { host };
