import AsyncStorage from "@react-native-community/async-storage";
import { createContext } from "react";

export const AppContext = createContext();

export const appReducer = (state, action) => {
    switch (action.type) {
        case 'createCarrinho':
            return createCarrinho(state, action)
        case 'loadCarrinho':
            return loadCarrinho(state, action)
        case 'createAddress':
            return createAddress(state, action)
        case 'createIdCliente':
            return createIdCliente(state, action)
        case 'getToken':
            return { ...state, token: action.payload }
        default:
            return state;
    }
}

export const initialState = {
    token: undefined,
    address: undefined,
    carrinho: new Array(),
    idCliente: undefined
}

function createCarrinho(state, action) {
    let carrinho = [...state.carrinho.filter(c => c.product.Id != action.payload.product.Id)]
    if (action.payload.quantity > 0) {
        carrinho.push(action.payload)
    }
    AsyncStorage.setItem("carrinho", JSON.stringify(carrinho))
    return { ...state, carrinho }
}

function loadCarrinho(state, action) {
    return { ...state, carrinho: action.payload }
}

function createAddress(state, action) {
    let local = action.payload
    if (local && (local.CEP == undefined || local.CEP == "")) {
        const CEP = convergeCep(local)
        local = { ...local, CEP }
    }
    return { ...state, address: local }
}

function createIdCliente(state, action) {
    const idCliente = action.payload.idCliente
    AsyncStorage.setItem("idCliente", JSON.stringify(idCliente))
    return { ...state, idCliente }
}

export const convergeCep = (local) => {
    try {
        return (local.results[0]?.address_components.filter(ac => ac.types.filter(ty => ty == "postal_code")?.length > 0)[0]?.short_name ?? "").replace("-", "")
    } catch (e) {
        console.log(e)
        debugger
    }
}