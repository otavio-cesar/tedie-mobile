import Axios from 'axios'

export const buscaHorarios = async (id) => {
  const response = await Axios.get(
    `http://localhost:59618/api/empresas/horarios?id=${id}`,
  )

  return response.data
}

export const getMarketsListByIds = async (ids) => {
  const response = await Axios.get(
    `http://tedie.azurewebsites.net/api/empresas/getMarketsListByIds?ids=${ids.join('&ids=')}`,
  )

  return response.data
}

export const getMarkets = async () => {
  const response = await Axios.get(
    'http://tedie.azurewebsites.net/api/empresas',
  )

  return response.data
}

export const getMarketsByLocation = async (local) => {
  const cep = local.CEP || (local.results[0]?.address_components.filter(ac => ac.types.filter(ty => ty == "postal_code")?.length > 0)[0]?.short_name ?? undefined);

  const response = await Axios.get(
    `http://tedie.azurewebsites.net/api/empresas/GetListaEmpresaByCEP?CEP=${cep.replace('-', '')}`,
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
  
  let products = response.data.map(p => {
    return {
      name: p.Nome,
      price: p.Preco_De,
      hasOffer: p.Ofertas == null ? false : true,
      off: '10%',
      imagem: p.Imagem,
      ...p
    }
  });

  products = products.filter((p, i, a) => a.findIndex(v => v.Id == p.Id) == i)

  return products;
}

export const getProduct = async (token, marketId, productId) => {
  const response = Axios.get(
    `http://tedie.azurewebsites.net/api/produtos/?token=${token}&Idempresa=${marketId}Idproduto=${productId}`
  )

  return response
}