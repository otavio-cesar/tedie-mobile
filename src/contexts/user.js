export const appReducer = (state, action) => {
    switch (action.type) {
        case 'getEndereco':
            return { endereco: action.payload }
        case 'getToken':
            return { token: action.payload }
        default:
            return state;
    }
}

export const initialState = {
    token: undefined,
    endereco: undefined
}