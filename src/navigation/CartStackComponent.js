import React from 'react'
// navigator
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
// screens
import Cart from '../screens/Cart'
import Checkout from '../screens/Checkout'
import Coupons from '../screens/Coupons'
import OrderPayments from '../screens/OrderPayments'
import Card from '../screens/Card'
import Locations from '../screens/Locations'
import Document from '../screens/Document'
import DeliveryType from '../screens/DeliveryType'

const CartStack = createStackNavigator()

const CartStackComponent = () => {
  return (
    <CartStack.Navigator headerMode="none">
      <CartStack.Screen name="Carrinho" component={Cart} options={{ ...TransitionPresets.SlideFromRightIOS }} />
      <CartStack.Screen name="Checkout" component={Checkout} options={{ ...TransitionPresets.SlideFromRightIOS }} />
      <CartStack.Screen name="Cupons" component={Coupons} options={{ ...TransitionPresets.SlideFromRightIOS }} />
      <CartStack.Screen name="Pagamentos" component={OrderPayments} options={{ ...TransitionPresets.SlideFromRightIOS }} />
      <CartStack.Screen name="Cartão" component={Card} options={{ ...TransitionPresets.SlideFromRightIOS }} />
      <CartStack.Screen name="Localização" component={Locations} options={{ ...TransitionPresets.SlideFromRightIOS }} />
      <CartStack.Screen name="Documento" component={Document} options={{ ...TransitionPresets.SlideFromRightIOS }} />
      <CartStack.Screen name="Entrega" component={DeliveryType} options={{ ...TransitionPresets.SlideFromRightIOS }} />
    </CartStack.Navigator>
  )
}

export default CartStackComponent
