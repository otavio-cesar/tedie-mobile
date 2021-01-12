import React from 'react'
// navigator
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
// screens
import Account from '../screens/Account'
import Orders from '../screens/Orders'
import Order from '../screens/Order'
import Coupons from '../screens/Coupons'
import Profile from '../screens/Profile'
import Locations from '../screens/Locations'
import Cards from '../screens/Cards'
import Help from '../screens/Help'
import MyCode from '../screens/MyCode'
import Rating from '../screens/Rating'
import Tickets from '../screens/Tickets'
import Ticket from '../screens/Ticket'

const AccountStack = createStackNavigator()

const AccountStackComponent = () => {
  return (
    <AccountStack.Navigator headerMode="none">
      <AccountStack.Screen name="Conta" component={Account} options={{ ...TransitionPresets.SlideFromRightIOS }} />
      <AccountStack.Screen name="Pedidos" component={Orders} options={{ ...TransitionPresets.SlideFromRightIOS }} />
      <AccountStack.Screen name="Pedido" component={Order} options={{ ...TransitionPresets.SlideFromRightIOS }} />
      <AccountStack.Screen name="Cupons" component={Coupons} options={{ ...TransitionPresets.SlideFromRightIOS }} />
      <AccountStack.Screen name="Perfil" component={Profile} options={{ ...TransitionPresets.SlideFromRightIOS }} />
      <AccountStack.Screen name="Localização" component={Locations} options={{ ...TransitionPresets.SlideFromRightIOS }} />
      <AccountStack.Screen name="Pagamento" component={Cards} options={{ ...TransitionPresets.SlideFromRightIOS }} />
      <AccountStack.Screen name="Ajuda" component={Help} options={{ ...TransitionPresets.SlideFromRightIOS }} />
      <AccountStack.Screen name="Indicação" component={MyCode} options={{ ...TransitionPresets.SlideFromRightIOS }} />
      <AccountStack.Screen name="Avaliar" component={Rating} options={{ ...TransitionPresets.SlideFromRightIOS }} />
      <AccountStack.Screen name="Tickets" component={Tickets} options={{ ...TransitionPresets.SlideFromRightIOS }} />
      <AccountStack.Screen name="Ticket" component={Ticket} options={{ ...TransitionPresets.SlideFromRightIOS }} />
    </AccountStack.Navigator>
  )
}

export default AccountStackComponent
