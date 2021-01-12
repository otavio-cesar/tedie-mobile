import Axios from 'axios'

export const getMarkets = async () => {
  const response = await Axios.get(
    'http://tedie.azurewebsites.net/api/empresas'
  )

  return response.data
}

export const getMarket = async (token, marketId) => {
  const response = await Axios.get(
    `http://tedie.azurewebsites.net/api/empresas/?token=${token}&Idempresa=${marketId}`
  )

  return response.data
}

export const getProducts = async (token, marketId) => {
  const response = await Axios.get(
    `http://tedie.azurewebsites.net/api/produtos/?token=${token}&Idempresa=${marketId}`
  )

  return response.data
}

export const getProduct = async (token, marketId, productId) => {
  const response = Axios.get(
    `http://tedie.azurewebsites.net/api/produtos/?token=${token}&Idempresa=${marketId}Idproduto=${productId}`
  )

  return response
}