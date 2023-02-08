import axios from 'axios';

const baseURL = 'http://<SERVERURL>:<PORT>/<URI>'; //Debería reemplazarse por la url donde se encuentra el servicio base

const axiosApi = axios.create({baseURL});

axiosApi.interceptors.request.use(async config => {
  const token = ''; //Esto debería reemplazarse por el metódo, utilería o demás donde se pueda obtener el token
  if (token) {
    config.headers['x-token'] = token;
  }
  return config;
});

export default axiosApi;
