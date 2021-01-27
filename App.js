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

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState)
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
    console.log("Local loaded from storage.")
    const address = JSON.parse(await AsyncStorage.getItem('Localization'));
    const action = { type: "createAddress", payload: address };
    dispatch(action);
  }

  useEffect(() => {
    loadToken();
    loadLocalization()
  }, [])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </AppContext.Provider>
  );
}

