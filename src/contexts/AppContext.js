import { createContext } from "react";

export const AppContext = createContext();

export const appReducer = (state, action) => {
    switch (action.type) {
        case 'createAddress':
            return { address: action.payload }
        case 'getToken':
            return { token: action.payload }
        default:
            return state;
    }
}

export const initialState = {
    token: undefined,
    address: undefined
}