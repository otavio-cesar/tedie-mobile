import { api, urlApi } from '../services/axios'

export const postCard = async (cartao) => {
    await api().post(
        `http://localhost:59618/api/clientes/PostCartao`,
        cartao
    );
}

export const getCard = async (idCliente) => {
    const response = await api().get(
        `http://localhost:59618/api/clientes/GetCartao?idCliente=${idCliente}`,
    );

    return response.data;
}