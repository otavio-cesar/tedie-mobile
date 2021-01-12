import * as React from 'react'
// navigation
import { createStackNavigator } from '@react-navigation/stack'
// navigators
import TabsNavigator from './TabsNavigator'
// screens
import Login from '../screens/Login'

const MainStack = createStackNavigator() 

const Navigation = () => {
  return (
    <MainStack.Navigator headerMode="none">
      {/* <MainStack.Screen name="Login" component={Login} /> */}
      <MainStack.Screen 
        name="Tabs" 
        component={TabsNavigator} 
      />
    </MainStack.Navigator>
  )
}

export default Navigation

