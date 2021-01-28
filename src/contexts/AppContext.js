import { createContext } from "react";

export const AppContext = createContext();

export const appReducer = (state, action) => {
    switch (action.type) {
        case 'createCarrinho':
            return { ...state, carrinho: action.payload }
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