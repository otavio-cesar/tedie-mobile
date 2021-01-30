import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
// components
import MainNavbar from '../components/MainNavbar'
import ScreenContainer from '../components/ScreenContainer'
import Typography from '../components/Typography'
import CartItem from '../components/CartItem'
import Button from '../components/Button'
import Box from '../components/Box'
import Avatar from '../components/Avatar'
// theme
import theme from '../theme'
import { AppContext } from '../contexts/AppContext'
import { CartContext } from '../contexts/CartContext'
import { getMarketsListByIds } from '../services/market'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Cart = ({ navigation }) => {
  const { cartState, cartDispatch } = useContext(CartContext);
  const { state, dispatch } = useContext(AppContext);
  const [markets, setMarkets] = useState([])

  useEffect(() => {
    const selectedMarkets = state.carrinho
      .filter((c, i, v) => v.findIndex((f) => f.product.IdEmpresa == c.product.IdEmpresa) == i)
      .map(c => c.product.IdEmpresa)
    getMarketsListByIds(selectedMarkets)
      .then(markets => setMarkets(markets))
  }, [state.carrinho])

  return (
    <React.Fragment>
      <MainNavbar />
      <View style={styles.cartsContainer}>
        <Box direction="row" justify="flex-start" alignItems="center">
          <Typography size="medium" color={theme.palette.dark}>
            Meus Carrinhos
          </Typography>
        </Box>

        <ScrollView
          contentContainerStyle={styles.cartsList}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {markets.length > 0 && markets.map((market, index) => (
            <TouchableOpacity onPress={() => cartDispatch({ type: "select", payload: market.IdEmpresa })}>
              <Avatar
                key={index}
                styles={styles.cartImage}
                size={60}
                color={theme.palette.secondary}
                selected={(cartState.selected ? cartState.selected : markets[0].IdEmpresa) == market.IdEmpresa ? true : false}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScreenContainer>
        <View style={styles.container}>
          <Typography size="medium" color="#000">
            Big Bom
          </Typography>
          {markets.length > 0 && state.carrinho
            .filter(market => market.product.IdEmpresa == (cartState.selected ? cartState.selected : markets[0].IdEmpresa))
            .map((cartItem, index) => (
              <CartItem
                key={index}
                cartItem={cartItem} />
            ))}

        </View>
      </ScreenContainer>

      <View style={styles.bottomContainer}>
        <Typography size="small" color="#000">
          Total R$ 12,60
        </Typography>

        <Button
          background={theme.palette.secondary}
          color={theme.palette.primary}
          width="50%"
          text="Checkout"
          onPress={() => navigation.navigate('Checkout')}
        />
      </View>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 96
  },

  bottomContainer: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0
  },

  cartsContainer: {
    paddingTop: 8
  },
  cartsList: {
    height: 65,
    flexDirection: 'row',
    paddingLeft: 16,
    marginVertical: 8
  },
  cartImage: {
    marginRight: 8
  }
})

export default Cart
