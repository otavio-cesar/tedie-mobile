import { api, urlApi } from '../services/axios'

export const login = async (usuario, senha) => {
    const response = await api().post(
        `${urlApi}clientes/autenticaComToken?login=${usuario}&senha=${senha}`,
    ).catch(e => {
        console.log("asd")
    });

    if (response)
        return {
            IdCliente: response.data.cliente.IdCliente,
            token: response.data.token
        }
    else
        return {}
}