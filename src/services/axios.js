import axios from 'axios'

export const urlApi ='http://localhost:59618/api/'

const instance = axios.create({
 baseURL: urlApi
})

export const api = () => {
  instance.interceptors.response.use(
    response =>
      response,
    error => {
      throw error
    }
  );
  return instance;
}

export default instance;