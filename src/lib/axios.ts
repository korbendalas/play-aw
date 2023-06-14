import Axios, { AxiosRequestConfig } from 'axios';
import { API_URL } from '../config';
import { storage } from '../utils/storage';

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = storage.getToken();
  if (token) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    config.headers.authorization = `${token}`;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
axios.interceptors.request.use(authRequestInterceptor);

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const { config, response } = error;

    if (response?.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;

        console.log('REFRESHING TOKEN');
        // Your refresh token API call using Axios
        axios
          .post('auth/refresh', {
            refreshToken: storage.getRefreshToken(),
          })

          .then((res) => {
            console.log('RES', res);
            const newToken = res.data.token;
            storage.setToken(newToken);
            storage.setRefreshToken(res.data.refreshToken);

            refreshSubscribers.forEach((subscriber) => subscriber(newToken));
            refreshSubscribers = [];
          })
          .catch(() => {
            // Handle refresh token failure, e.g., redirect to login
            storage.clearTokens();
          })
          .finally(() => {
            isRefreshing = false;
          });
      }

      return new Promise((resolve) => {
        refreshSubscribers.push((token) => {
          config.headers.Authorization = `Bearer ${token}`;
          resolve(axios(config));
        });
      });
    }

    return Promise.reject(error);
  }
);
