import Axios from 'axios'

export const getOrders = async () => {
  const response = await Axios.get(
    'http://tedie.azurewebsites.net/pedidos'
  )

  return response.data
}