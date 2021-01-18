import Axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

export const getMarkets = async () => {
  const response = await Axios.get(
    'http://192.168.0.106:59618/api/empresas',
  )

  return response.data
}

export const getMarketsByLocation = async () => {
  const local = JSON.parse(await AsyncStorage.getItem('Localization'));
  const cep = local.CEP || (local.results[0]?.address_components.filter(ac => ac.types.filter(ty => ty == "postal_code")?.length > 0)[0]?.short_name ?? undefined);
  
  const response = await Axios.get(
    `http://192.168.0.106:59618/api/empresas/GetListaEmpresaByCEP?CEP=${cep.replace('-', '')}`,
  )

  return response.data
}

export const getMarket = async (token, marketId) => {
  const response = await Axios.get(
    `http://192.168.0.106:59618/api/empresas/?token=${token}&Idempresa=${marketId}`
  )

  return response.data
}

export const getProducts = async (token, marketId) => {
  const response = await Axios.get(
    `http://192.168.0.106:59618/api/produtos/?token=${token}&Idempresa=${marketId}`
  )

  return response.data
}

export const getProduct = async (token, marketId, productId) => {
  const response = Axios.get(
    `http://192.168.0.106:59618/api/produtos/?token=${token}&Idempresa=${marketId}Idproduto=${productId}`
  )

  return response
}