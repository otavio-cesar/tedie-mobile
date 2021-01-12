import React, { useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
// navigation
import { NavigationContainer } from '@react-navigation/native'
import Navigation from './src/navigation'
// services
import {
  getTokenData
} from './src/services'

export default function App() {
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
  
  useEffect(() => {
    loadToken()
  }, [])

  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}

