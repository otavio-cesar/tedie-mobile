import Axios from 'axios'

export const getCoupons = async () => {
  const response = await Axios.get(
    'http://localhost:59618/api/cupons'
  )

  return response.data
}