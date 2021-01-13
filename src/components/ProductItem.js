import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
// components
import ContentContainer from './ContentContainer'
import Typography from './Typography'
// theme
import theme from '../theme'

const ProductItem = ({ product, skeleton }) => {
  const [quantity, setQuantity] = useState(0)

  const handleRemove = (quantity) => {
    setQuantity(quantity - 1)
  }

  const handleAdd = (quantity) => {
    setQuantity(quantity + 1)
  }
  
  return (
    <View style={styles.container}>
      <ContentContainer>
        {product.hasOffer && (
          <View style={styles.offerContainer}>
            <Typography size="small" color="#fff">
              { product.off }
            </Typography>
          </View>
        )}

        {!product.Imagem && (
          <View style={styles.image} />
        )}

        {product.Imagem && (
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{
              uri: product.Imagem,
            }}
          />
        )}

        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            hitSlop={theme.hitSlop}
            onPress={() => handleRemove(quantity)}
          >
            <Ionicons name="md-remove" size={25} color={theme.palette.primary} />
          </TouchableOpacity>

          <Text style={styles.quantity}>{ quantity }</Text>

          <TouchableOpacity 
            hitSlop={theme.hitSlop}
            onPress={() => handleAdd(quantity)}
          >
            <Ionicons name="md-add" size={25} color={theme.palette.primary} />
          </TouchableOpacity>
        </View>
      </ContentContainer>
      
      <View style={styles.textContainer}>
        <Typography size="small" color="#000" wrap>
          { product.Nome }
        </Typography>
      </View>

      {/* <Typography size="small" color="#000">
        big bom
      </Typography> */}

      <Typography size="small" color="#000">
        R$ { product.Preco_Por }
      </Typography>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 200,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16
  },

  image: {
    width: 100,
    height: 100
  },

  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    position: 'absolute',
    bottom: 0,
    right: -16,
    elevation: 2
  },

  quantity: {
    paddingHorizontal: 8
  },

  offerContainer: {
    padding: 4,
    backgroundColor: theme.palette.primary,
    borderRadius: 100,
    position: 'absolute',
    top: 0,
    left: -16,
    elevation: 2
  },

  textContainer: {
    width: 120,
    alignSelf: 'center'
  }
})

export default ProductItem