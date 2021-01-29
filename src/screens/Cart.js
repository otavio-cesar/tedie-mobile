import React, { useContext, useEffect } from 'react'
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

const Cart = ({ navigation }) => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
  })

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
          <Avatar
            styles={styles.cartImage}
            size={60}
            color={theme.palette.secondary}
            selected
          />
          <Avatar
            styles={styles.cartImage}
            size={60}
            color={theme.palette.secondary}
          />
          <Avatar
            styles={styles.cartImage}
            size={60}
            color={theme.palette.secondary}
          />
          <Avatar
            styles={styles.cartImage}
            size={60}
            color={theme.palette.secondary}
          />
          <Avatar
            styles={styles.cartImage}
            size={60}
            color={theme.palette.secondary}
          />
          <Avatar
            styles={styles.cartImage}
            size={60}
            color={theme.palette.secondary}
          />
        </ScrollView>
      </View>


      <ScreenContainer>
        <View style={styles.container}>
          <Typography size="medium" color="#000">
            Big Bom
          </Typography>
          {state.carrinho.map(carItem => (
            <div>asd</div>
          ))}
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
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
