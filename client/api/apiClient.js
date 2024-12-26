import axios from "axios"

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if(token) config.headers.Authorization = `Bearer ${token}`;
    console.log('Request config: ', config)
    return config;
  },
  error => {
    console.error('Request error: ', error)
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  response => {
    console.log('Response data', response.data)
    return response
  },
  error => {
    if(error.response && error.response.status === 401){
      console.warn('Unauthorized! Redirecting to login...')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient;    