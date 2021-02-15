import React, { useState, useCallback, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
// components
import Navbar from '../components/Navbar'
import ScreenContainer from '../components/ScreenContainer'
import Typography from '../components/Typography'
import OrderItem from '../components/OrderItem'
// theme
import theme from '../theme'
// services
import { getOrders } from '../services/orders'

const Orders = ({ navigation }) => {
  const [ordersLoader, setOrderLoader] = useState(false)
  const [orders, setOrders] = useState([])

  const fakeOrders = [
    {
      "NumeroPedido": 1234,
      "Valor": 35.00,
      "Desconto": 0.00,
      "Taxa": 5.00,
      "status": 'incoming',
      "statusMessage": "Seu pedido está a caminho!"
    },
    {
      "NumeroPedido": 1233,
      "Valor": 200.00,
      "Desconto": 0.00,
      "Taxa": 5.00,
      "status": 'finished',
      "review": {
        "nota": 4.0,
        "message": "Exemplo mensagem 12345"
      },
      "statusMessage": "Pedido Entregue!"
    },
    {
      "NumeroPedido": 1232,
      "Valor": 67.00,
      "Desconto": 0.00,
      "Taxa": 5.00,
      "status": 'finished',
      "review": {
        "nota": 5.0,
        "message": "Exemplo mensagem"
      },
      "statusMessage": "Pedido Entregue!"
    },
  ]

  const loadOrders = useCallback(async () => {
    setOrderLoader(true)

    const orderResponse = await getOrders()
    setOrders(orderResponse)

    setOrderLoader(false)
  }, [setOrderLoader, setOrders, getOrders])

  useEffect(() => {
    debugger
    loadOrders()
  }, [])

  return (
    <React.Fragment>
      <Navbar
        left={
          <TouchableOpacity hitSlop={theme.hitSlop} onPress={() => navigation.pop()}>
            <Ionicons name="md-arrow-back" size={25} color="#fff" />
          </TouchableOpacity>
        }
        title={
          <Typography size="small" color="#fff">
            Pedidos
          </Typography>
        }
      />

      <ScreenContainer>
        {!ordersLoader && orders.length > 0
          && orders.map((order, index) => (
            <OrderItem
              order={order}
              onPress={() => navigation.navigate('Pedido', { order: order })}
              key={index}
            />
          ))
        }
      </ScreenContainer>
    </React.Fragment>
  )
}

export default Orders
