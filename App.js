import React, { useEffect, useCallback, useReducer } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
// navigation
import { NavigationContainer } from '@react-navigation/native'
import Navigation from './src/navigation'
// services
import {
  getTokenData
} from './src/services'
import { AppContext, appReducer, initialState } from './src/contexts/AppContext'
import { CartContext, appCartReducer, cartInitialState } from './src/contexts/CartContext'
import { CheckoutContext, appCheckoutReducer, checkoutInitialState } from './src/contexts/CheckoutContext'

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const [cartState, cartDispatch] = useReducer(appCartReducer, cartInitialState)
  const [checkoutState, checkoutDispatch] = useReducer(appCheckoutReducer, checkoutInitialState)
  const loadToken = useCallback(async () => {
    const response = await getTokenData()

    try {
      await AsyncStorage.setItem(
        '@tedie:devtoken',
        response.CodigoToken
      )
    } catch (error) {
      console.error(error)
      alert('Ocorreu um erro ao salvar as credenciais')
    }
  }, [getTokenData])

  async function loadLocalization() {
    const address = JSON.parse(await AsyncStorage.getItem('Localization'));
    const action = { type: "createAddress", payload: address };
    dispatch(action);
  }

  async function loadCarrinho() {
    const carrinho = JSON.parse(await AsyncStorage.getItem('carrinho'));
    if (!carrinho) return
    const action = { type: "loadCarrinho", payload: carrinho };
    dispatch(action);
  }

  async function loadSessao() {
    const sessao = JSON.parse(await AsyncStorage.getItem('sessao'));
    const action = { type: "createSessao", payload: { sessao } };
    dispatch(action);
  }

  useEffect(() => {
    loadToken();
    loadSessao();
    loadLocalization()
    loadCarrinho()
  }, [])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <CheckoutContext.Provider value={{ checkoutState, checkoutDispatch }}>
        <CartContext.Provider value={{ cartState, cartDispatch }}>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </CartContext.Provider>
      </CheckoutContext.Provider>
    </AppContext.Provider>
  );
}

