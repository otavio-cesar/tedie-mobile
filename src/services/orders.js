import Axios from 'axios'

export const getOrders = async () => {
  const response = await Axios.get(
    'http://localhost:59618/api/pedidos'
  )

  return response.data
}