import Axios from 'axios'
import { urlApi } from './axios'

export const getCoupons = async () => {
  const response = await Axios.get(
    `${urlApi}/cupons`
  )

  return response.data
}