import Axios from 'axios'
import { api, urlApi } from './axios';

export const getLocationByLatLong = async (lat, long) => {
  const response = await api().get(
    `${urlApi}Enderecos/LatLong?latitude=${lat}&longitude=${long}`,
  );
  console.log(response.data)
  return response.data
}

export const getLocations = async () => {
  const response = await Axios.get(
    'http://192.168.0.106:59618/api/enderecos'
  )

  return response.data
}