import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { call } from 'redux-saga/effects';
import { API_BASE_URL } from '@/config/environment';

const api = axios.create({
  baseURL: API_BASE_URL
  // withCredentials: true,
});

type RequestConfig = AxiosRequestConfig & {
  data?: Record<string, any>;
  headers?: Record<string, string>;
};

const makeRequest = async <T = any>(
  method: AxiosRequestConfig['method'],
  endpoint: string,
  { headers = {}, ...args }: RequestConfig = {}
): Promise<AxiosResponse<T> | undefined> => {
  return api
    .request({
      method: method,
      url: endpoint,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      ...args
    })
    .then((response) => response)
    .catch((error) => error.response);
};

export const getRequest = <T = any>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<AxiosResponse<T> | undefined> =>
  makeRequest<T>('get', endpoint, config);

export const postRequest = <T = any>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<AxiosResponse<T> | undefined> =>
  makeRequest<T>('post', endpoint, config);

export const putRequest = <T = any>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<AxiosResponse<T> | undefined> =>
  makeRequest<T>('put', endpoint, config);

export const deleteRequest = <T = any>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<AxiosResponse<T> | undefined> =>
  makeRequest<T>('delete', endpoint, config);

export function* apiWorker<T>(
  apiCall: (payload: T) => Promise<any>,
  payload: T,
  {
    onSuccess,
    onFailure
  }: {
    onSuccess?: (response: any) => Generator;
    onFailure?: (error: any) => Generator;
  }
): Generator {
  try {
    const response: any = yield call(apiCall, payload);
    if (response && response.status <= 299) {
      yield onSuccess?.(response);
    } else {
      throw response?.data || response;
    }
  } catch (e: any) {
    yield onFailure?.(e);
  }
}
