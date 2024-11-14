import axios from 'axios';

export const create = (config) => {
  const instance = axios.create(config);

  instance.get = (url, params = {}, options) => {
    return instance({
      url,
      method: 'get',
      params,
      ...options,
    });
  };

  instance.delete = (url, params, options) => {
    return instance({
      url,
      method: 'delete',
      params,
      ...options,
    });
  };

  return instance;
};
