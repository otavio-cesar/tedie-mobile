import { api, urlApi } from '../services/axios'

export const getProductsByCEP = async (CEP, categoria = "", offset = 0, limite = 999, searchQuery = "") => {
    const response = await api().get(
        `${urlApi}produtos/CEPCategoriaPaginado?CEP=${CEP}&Categoria=${categoria}&offset=${offset}&limite=${limite}&searchQuery=${searchQuery}`,
    );

    const produtcs = response.data.map(p => {
        return {
            name: p.Nome,
            price: p.Preco_De,
            hasOffer: p.Ofertas == null ? false : true,
            off: '10%',
            imagem: p.Imagem,
            ...p
        }
    });
    
    return produtcs;
}