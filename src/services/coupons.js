import Axios from 'axios'

export const getCoupons = async () => {
  const response = await Axios.get(
    'http://192.168.0.106:59618/api/cupons'
  )

  return response.data
}