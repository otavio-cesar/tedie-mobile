import React, { useEffect, useState, useCallback, useRef } from 'react'
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

const Home = ({ navigation }) => {
  const [deliveryType, setDeliveryType] = useState('all')
  const [loadingMarkets, setLoadingMarkets] = useState(false)
  const [markets, setMarkets] = useState([]);
  const [localizacao, setLocalizacao] = useState("");
  const [products, setProducts] = useState([]);
  const [isLocalAltered, setLocalAltered] = useState([]);

  const loadMarkets = useCallback(async () => {
    setLoadingMarkets(true)
    const response = await getMarketsByLocation()
    setMarkets(response)
    setLoadingMarkets(false);
  }, [loadingMarkets, getMarketsByLocation])

  const loadProducts = async () => {
    let obj = await AsyncStorage.getItem('Localization')
    const local = JSON.parse(obj);

    if (local == undefined || local == "") {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const local = await getLocationByLatLong(location.coords.latitude, location.coords.longitude);
        await AsyncStorage.setItem("Localization", JSON.stringify(local));

        const cep = local.results[0]?.address_components.filter(ac => ac.types.filter(ty => ty == "postal_code")?.length > 0)[0]?.short_name ?? undefined

        // carrega produtos pela localizacao do gps
        const response = await getProductsByCEP(cep.replace("-", ""));
        setProducts(response);
        setLocalizacao(local);
      })()
    } else {
      // carrega produtos com localizacao do localstorage
      if (local.CEP != undefined && local.CEP != "") {
        const response = await getProductsByCEP(local.CEP.replace("-", ""));
        setProducts(response);
        setLocalizacao(local);
      } else {
        const cep = local.results[0]?.address_components.filter(ac => ac.types.filter(ty => ty == "postal_code")?.length > 0)[0]?.short_name ?? undefined;
        const response = await getProductsByCEP(cep.replace("-", ""));
        setProducts(response);
        setLocalizacao(local);
      }
    }
  }

  useEffect(() => {
    loadMarkets();
    loadProducts();
  }, []);

  // Quando usuario alterar o endereco na tela 'Locations', atualiza os produtos.
  useEffect(() => {
    loadProducts();
    loadMarkets();
  }, [isLocalAltered])

  return (
    <React.Fragment>

      <StatusBar backgroundColor={theme.palette.primary} />
      <MainNavbar />

      <CartFab />

      <ScreenContainer>
        <ContentContainer>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('Localizações', { setLocalHome: setLocalAltered })}>
            <View style={styles.locationContainer}>
              <Ionicons name="md-locate" size={25} color={theme.palette.primary} />

              <View style={styles.locationInfo}>
                <Typography size="small" color="#000">
                  {localizacao.CEP ? localizacao.Beautify :
                    localizacao.results ? localizacao.results[0].formatted_address : ""
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
          {products.map((p, index) =>
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