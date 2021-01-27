import axios from 'axios'

export const urlApi ='http://tedie.azurewebsites.net/'

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