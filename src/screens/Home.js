import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, View, StatusBar, ScrollView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
// components
import ScreenContainer from '../components/ScreenContainer'
import ContentContainer from '../components/ContentContainer'
import MainNavbar from '../components/MainNavbar'
import Typography from '../components/Typography'
import ProductItem from '../components/ProductItem'
import MarketItem from '../components/MarketItem'
import Pill from '../components/Pill'
// theme
import theme from '../theme'
import CartFab from '../components/CartFab'
// services
import { getMarkets } from '../services/market'
import { getProductsByCEP } from '../services/products'

const Home = ({ navigation }) => {
  const [deliveryType, setDeliveryType] = useState('all')
  const [loadingMarkets, setLoadingMarkets] = useState(false)
  const [markets, setMarkets] = useState([]);
  const [products, setProducts] = useState([]);


  const loadMarkets = useCallback(async () => {
    setLoadingMarkets(true)
    const response = await getMarkets()
    setMarkets(response)
    setLoadingMarkets(false);
  }, [loadingMarkets, getMarkets])

  const loadProducts = useCallback(async () => {
    setLoadingMarkets(true)
    const response = await getMarkets()
    setMarkets(response)
    setLoadingMarkets(false);
  }, [loadingMarkets, getMarkets])

  // const loadProducts = async () => {
  //   const response = await getProductsByCEP(35182362);
  //   console.log(response)
  //   setProducts(response);
  // }

  useEffect(() => {
    loadMarkets();
    loadProducts();
  }, [])

  const product = {
    name: 'Produto',
    price: 'R$ 50,00',
    hasOffer: true,
    off: '10%'
  }

  return (
    <React.Fragment>
      <StatusBar backgroundColor={theme.palette.primary} />
      <MainNavbar />

      <CartFab />

      <ScreenContainer>
        <ContentContainer>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('Localizações')}>
            <View style={styles.locationContainer}>
              <Ionicons name="md-locate" size={25} color={theme.palette.primary} />

              <View style={styles.locationInfo}>
                <Typography size="small" color="#000">
                  Avenida Dona Gertrudes, 100
                </Typography>
              </View>

              <Ionicons name="ios-arrow-forward" size={25} color={theme.palette.primary} />
            </View>
          </TouchableWithoutFeedback>
        </ContentContainer>

        <Typography size="medium" color="#000">
          Destaques
        </Typography>

        <ScrollView
          contentContainerStyle={styles.horizontalList}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {console.log(products)&&products.map(p => {
            return (
              <> <div>{p}</div>
                <ProductItem product={p}></ProductItem>
              </>
            )
          })}
        </ScrollView>

        <Typography size="medium" color="#000">
          Perto de você
        </Typography>

        <ScrollView
          contentContainerStyle={styles.horizontalList}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <Pill
            selected={deliveryType === 'all'}
            title="Todos"
            onPress={() => setDeliveryType('all')}
          />

          <Pill
            selected={deliveryType === 'delivery'}
            title="Entrega"
            onPress={() => setDeliveryType('delivery')}
          />

          <Pill
            selected={deliveryType === 'pickup'}
            title="Retirada"
            onPress={() => setDeliveryType('pickup')}
          />
        </ScrollView>

        {
          loadingMarkets && (
            <React.Fragment>
              <MarketItem skeleton />
              <MarketItem skeleton />
              <MarketItem skeleton />
            </React.Fragment>
          )
        }

        {
          !loadingMarkets && markets.length > 0 && markets.map(market => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Mercado', { market: market })}
              key={market.IdEmpresa}
            >
              <MarketItem market={market} />
            </TouchableOpacity>
          ))
        }
      </ScreenContainer>

      {/* </ScreenContainer> */}
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  navbarButton: {
    marginHorizontal: 8
  },

  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  locationInfo: {
    maxWidth: 200,
    marginHorizontal: 16
  },

  horizontalList: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 16
  }
})

export default Home