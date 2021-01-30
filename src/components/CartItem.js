import React, { useEffect } from 'react'
import { StyleSheet, View,Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
// components
import ContentContainer from './ContentContainer'
import Typography from './Typography'
// theme
import theme from '../theme'

const CartItem = ({cartItem}) => {

  return (
    <View style={styles.container}>
      <ContentContainer>
        {cartItem.product.imagem && (
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{
              uri: cartItem.product.imagem,
            }}
          />
        )}
      </ContentContainer>

      <View style={styles.infoContainer}>
        <View style={styles.infoLine}>
          <Typography size="small" color="#000">
            {cartItem.product.Nome}
          </Typography>
          <Ionicons name="md-more" size={30} color={theme.palette.primary} />
        </View>

        <View style={styles.infoLine}>
          <Typography size="small" color="#000">
            Qtd.
          </Typography>
          <Typography size="small" color="#000">
            {cartItem.quantity}
          </Typography>
        </View>

        <View style={styles.infoLine}>
          <Typography size="small" color="#000">
            Total
          </Typography>
          <Typography size="small" color="#000">
            R$ 12,60
          </Typography>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },

  image: {
    width: 100,
    height: 100
  },

  infoContainer: {
    width: '50%',
    height: 120,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    paddingTop: 16
  },

  infoLine: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16
  }
})

export default CartItem
