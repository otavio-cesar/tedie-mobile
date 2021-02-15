import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage'
// components
import theme from '../theme'
import ScreenContainer from '../components/ScreenContainer'
import Navbar from '../components/Navbar'
import Typography from '../components/Typography'
import MarketItem from '../components/MarketItem'
import ProductItem from '../components/ProductItem'
import CategoryItem from '../components/CategoryItem'
// services
import { getProducts } from '../services/market'

const Market = ({ navigation, route }) => {
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [marketProducts, setMarketProducts] = useState([])
  const { market } = route.params

  const loadMarketProducts = useCallback(async () => {
    const token = await AsyncStorage.getItem('@tedie:devtoken')

    setLoadingProducts(true)
    const response = await getProducts(token, market.IdEmpresa)
    setMarketProducts([...response])
    setLoadingProducts(false)
  }, [setLoadingProducts, getProducts, setMarketProducts]);

  useEffect(() => {
    loadMarketProducts()
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
            Mercado
          </Typography>
        }
        right={
          <React.Fragment>
            <TouchableOpacity
              style={styles.navbarButton}
              hitSlop={theme.hitSlop}
              onPress={() => navigation.navigate('Localizações2')}
            >
              <Ionicons name="md-pin" size={30} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navbarButton}
              hitSlop={theme.hitSlop}
              onPress={() => navigation.navigate('Categorias', { screen: 'Produtos' })
              }
            >
              <Ionicons name="md-search" size={30} color="#fff" />
            </TouchableOpacity>
          </React.Fragment>
        }
      />

      <ScreenContainer>
        <MarketItem market={market} />

        <Typography size="large" color={theme.palette.dark}>
          Destaques
        </Typography>

        <ScrollView
          contentContainerStyle={styles.horizontalList}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {marketProducts.filter(p => p.hasOffer).map((product, index) => {
            return (
              <TouchableOpacity
                key={product.Id}
                onPress={() => navigation.navigate("Produto", { product: product })}
              >
                <ProductItem
                  product={product}
                  key={index} />
              </TouchableOpacity>
            )
          })}
        </ScrollView>

        {/* <Typography size="large" color={theme.palette.dark}>
          Categorias
        </Typography>

        <View style={styles.categoriesContainer}>
          {categories.map(item => (
            <TouchableOpacity key={item.name}>
              <CategoryItem name={item.name} />
            </TouchableOpacity>
          ))}
        </View> */}

        <Typography size="large" color={theme.palette.dark}>
          Produtos
        </Typography>

        <View style={styles.categoriesContainer}>
          {!loadingProducts && marketProducts.length > 0 && marketProducts.map(product => (
            <TouchableOpacity
              key={product.Id}
              onPress={() => navigation.navigate("Produto", { product: product })}
            >
              <ProductItem product={product} />
            </TouchableOpacity>
          ))}
        </View>
      </ScreenContainer>
    </React.Fragment >

  )
}

const styles = StyleSheet.create({
  horizontalList: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 16
  },
  categoriesContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexShrink: 1
  },
  navbarButton: {
    marginHorizontal: 8
  }
})

export default Market


