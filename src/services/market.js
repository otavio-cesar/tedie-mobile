import Axios from 'axios'

export const getMarkets = async () => {
  const response = await Axios.get(
    'http://localhost:59618/api/empresas',
    { headers: { 'Access-Control-Allow-Origin': '*' } },
  )

  return response.data
}

export const getMarket = async (token, marketId) => {
  const response = await Axios.get(
    `http://localhost:59618/api/empresas/?token=${token}&Idempresa=${marketId}`
  )

  return response.data
}

export const getProducts = async (token, marketId) => {
  const response = await Axios.get(
    `http://localhost:59618/api/produtos/?token=${token}&Idempresa=${marketId}`
  )

  return response.data
}

export const getProduct = async (token, marketId, productId) => {
  const response = Axios.get(
    `http://localhost:59618/api/produtos/?token=${token}&Idempresa=${marketId}Idproduto=${productId}`
  )

  return response
}