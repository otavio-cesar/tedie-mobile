import axios from 'axios'

export const urlApi ='http://rcsnet-001-site25.atempurl.com:80'

const instance = axios.create({
 baseURL: urlApi
})

export const api = async (showNotification, loadingMsg) => {
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