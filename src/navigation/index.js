import * as React from 'react'
// navigation
import { createStackNavigator } from '@react-navigation/stack'
// navigators
import TabsNavigator from './TabsNavigator'
// screens
import Login from '../screens/Login'
import Products from '../screens/Products'
import Locations from '../screens/Locations'

const MainStack = createStackNavigator() 

const Navigation = () => {
  return (
    <MainStack.Navigator headerMode="none">
      <MainStack.Screen name="Login" component={Login} />
      <MainStack.Screen name="Produtos2" component={Products} />
      <MainStack.Screen name="Localizações2" component={Locations} />
      <MainStack.Screen 
        name="Tabs" 
        component={TabsNavigator} 
      />
    </MainStack.Navigator>
  )
}

export default Navigation

