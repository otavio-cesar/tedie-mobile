import { createContext } from "react";

export const CartContext = createContext();

export const appCartReducer = (state, action) => {
    switch (action.type) {
        case 'select':
            return { ...state, selected: action.payload.IdEmpresa, selectedNome: action.payload.Nome }
        case 'setTotalCompras':
            return { ...state, totalCompras: action.payload.totalCompras }
        case 'setSomaParcial':
            return { ...state, totalCompras: action.payload.somaParcial }
        case 'setMarkets':
            debugger
            return { ...state, markets: action.payload.markets }
        default:
            return state;
    }
}

export const cartInitialState = {
    selected: undefined,
    selectedNome: undefined,
    totalCompras: 0,
    markets: []
}