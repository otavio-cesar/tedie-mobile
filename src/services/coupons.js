import Axios from 'axios'

export const getCoupons = async () => {
  const response = await Axios.get(
    'http://tedie.azurewebsites.net/api/cupons'
  )

  return response.data
}