import { createContext } from "react";

export const CartContext = createContext();

export const appCartReducer = (state, action) => {
    switch (action.type) {
        case 'select':
            debugger
            return { ...state, selected: action.payload }
        default:
            return state;
    }
}

export const cartInitialState = {
    selected: undefined,
}