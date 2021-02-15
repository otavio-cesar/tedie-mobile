import React, { useEffect, useState, useCallback, useRef, useContext } from 'react'
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
import { getMarketsByLocation } from '../services/market'
import { getProductsByCEP } from '../services/products'
import { getLocationByLatLong } from '../services/locations'
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-community/async-storage'
import { AppContext } from '../contexts/AppContext'

const Home = ({ navigation }) => {
  const { state, dispatch } = useContext(AppContext);
  const [deliveryType, setDeliveryType] = useState('all')
  const [loadingMarkets, setLoadingMarkets] = useState(false)
  const [markets, setMarkets] = useState([]);
  const [products, setProducts] = useState([]);
  const toastRef = useRef();

  const loadMarkets = async () => {
    setLoadingMarkets(true)
    const response = await getMarketsByLocation(state.address)
    setMarkets(response)
    setLoadingMarkets(false);
  }

  const loadProducts = async () => {
    const local = state.address;
    // carrega produtos com localizacao do localstorage
    if (local.CEP != undefined && local.CEP != "") {
      const response = await getProductsByCEP(local.CEP.replace("-", ""));
      setProducts(response);
    } else {
      try {
        const cep = local.results[0]?.address_components.filter(ac => ac.types.filter(ty => ty == "postal_code")?.length > 0)[0]?.short_name ?? "";
        const response = await getProductsByCEP(cep.replace("-", ""));
        setProducts(response);
      } catch (e) {
        console.log(e)
        debugger
      }
    }
  }

  async function askLocalizationPermission() {
    if (await AsyncStorage.getItem('Localization')) return
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        toastRef.current?.show('Permissão para acessar localização foi negada', 3000)
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const local = await getLocationByLatLong(location.coords.latitude, location.coords.longitude);
      await AsyncStorage.setItem("Localization", JSON.stringify(local));

      const action = { type: "createAddress", payload: local };
      dispatch(action);
    })()
  }

  async function loadAll() {
    if (state.address) {
      loadMarkets();
      loadProducts();
    } else {
      askLocalizationPermission();
    }
  }

  useEffect(() => {
    loadAll();
  }, [state.address])

  return (
    <React.Fragment>

      <StatusBar backgroundColor={theme.palette.primary} />
      <MainNavbar navigation={navigation} />

      <CartFab />

      <ScreenContainer>
        <ContentContainer>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('Localizações2')}>
            <View style={styles.locationContainer}>
              <Ionicons name="md-locate" size={25} color={theme.palette.primary} />

              <View style={styles.locationInfo}>
                <Typography size="small" color="#000">
                  {state.address
                    ?
                    (state.address?.results ? state.address.results[0].formatted_address : state.address.Beautify)
                    : ""
                  }
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
          {products.filter(p => p.hasOffer).map((p, index) =>
            <ProductItem
              product={p}
              key={index} />
          )}
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