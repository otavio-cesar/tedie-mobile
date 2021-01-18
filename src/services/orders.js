import Axios from 'axios'

export const getOrders = async () => {
  const response = await Axios.get(
    'http://192.168.0.106:59618/api/pedidos'
  )

  return response.data
}