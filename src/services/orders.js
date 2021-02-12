import Axios from 'axios'
import { urlApi } from './axios'

export const getOrders = async () => {
  const response = await Axios.get(
    'http://tedie.azurewebsites.net/api/pedidos'
  )

  return response.data
}

export const postOrder = async (pedido) => {
  const response = await Axios.post(
    `${urlApi}Enderecos/LatLong?latitude=${lat}&longitude=${long}`,
    pedido
  ).catch(e => console.log(e.message))

  return response.data
}