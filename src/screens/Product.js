import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
// components
import ScreenContainer from '../components/ScreenContainer'
import Typography from '../components/Typography'
import Navbar from '../components/Navbar'
import Button from '../components/Button'
import ProductItem from '../components/ProductItem'
// theme
import theme from '../theme'

const Product = ({ navigation, route }) => {
  const [quantity, setQuantity] = useState(1)
  const [productValue, setProductValue] = useState(0)
  const [productTotal, setProductTotal] = useState(0)

  const { product } = route.params

  useEffect(() => {
    if (product.Preco_De > 0) {
      setProductValue(product.Preco_De)
    } else {
      setProductValue(product.Preco_Por)
    }
  }, [])

  useEffect(() => {
    const total = productValue * quantity
    setProductTotal(total)
  }, [quantity]);

  const handleRemove = (quantity) => {
    if (quantity > 1)
      setQuantity(quantity - 1)
  }

  const handleAdd = (quantity) => {
    setQuantity(quantity + 1)
  }

  return (
    <React.Fragment>
      <Navbar 
        left={
          <TouchableOpacity hitSlop={theme.hitSlop} onPress={() => navigation.pop()}>
            <Ionicons name="md-arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
        }
        title={
          <View style={styles.titleContainer}>
            <Typography size="small" color="#fff">
              Produto
            </Typography>
            {/* <Typography size="small" color="#fff">
              Big Bom
            </Typography> */}
          </View>  
        }
      />

      <ScreenContainer>
        <View style={styles.container}>
          <View style={styles.imageContainer} />

          <Typography size="large" color="#000">
            {product.Nome}
          </Typography>

          <View style={styles.descriptionContainer}>
            <React.Fragment>
              {product.Descricao && (
                <Typography size="small" color="#000">
                  {product.Descricao}
                </Typography>
              )}
              {!product.Descricao && (
                <Typography size="small" color="#000">
                  Sem descrição disponível
                </Typography>
              )}
            </React.Fragment>            
          </View>

          <View style={styles.priceContainer}>
            <Typography size="medium" color="#000">
              por R$ {productValue.toFixed(2).toString().replace('.', ',')}
            </Typography>
          </View>

          <Typography size="medium" color="#000">
            Compre também
          </Typography>

          <ScrollView 
            contentContainerStyle={styles.horizontalList}
            horizontal
          >
            <ProductItem product={product} />
            <ProductItem product={product} />
            <ProductItem product={product} />
            <ProductItem product={product} />
            <ProductItem product={product} />
          </ScrollView>
        </View>
      </ScreenContainer>

      <View style={styles.bottomContainer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity hitSlop={theme.hitSlop} onPress={() => handleRemove(quantity)}>
            <Ionicons name="md-remove" size={30} color={theme.palette.primary} />
          </TouchableOpacity>

          <Text style={styles.quantity}>{ quantity }</Text>

          <TouchableOpacity hitSlop={theme.hitSlop} onPress={() => handleAdd(quantity)}>
            <Ionicons name="md-add" size={30} color={theme.palette.primary} />
          </TouchableOpacity>
        </View>

        <Button 
          background={theme.palette.secondary}
          color={theme.palette.primary}
          width="50%"
          text={`Adicionar R$${productTotal.toFixed(2).toString().replace('.', ',')}`}
        />
      </View>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  container: {
    paddingBottom: 104
  },

  imageContainer: {
    width: '100%',
    height: 250,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 16 
  },

  descriptionContainer: {
    width: '100%'
  },

  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 16
  },

  bottomContainer: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0
  },

  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: theme.palette.primary
  },

  quantity: {
    paddingHorizontal: 16
  },

  horizontalList: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})

export default Product
