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
            return { ...state, address: action.payload }
        case 'getToken':
            return { ...state, token: action.payload }
        default:
            return state;
    }
}

export const initialState = {
    token: undefined,
    address: undefined,
    carrinho: new Array()
}

function createCarrinho(state, action) {
    const carrinho = [...state.carrinho.filter(c => c.product.Id != action.payload.product.Id), action.payload]
    AsyncStorage.setItem("carrinho", JSON.stringify(carrinho))
    return { ...state, carrinho }
}

function loadCarrinho(state, action) {
    return { ...state, carrinho: action.payload }
}