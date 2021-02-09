import React, { useEffect, useState } from 'react'
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
// components
import MainNavbar from '../components/MainNavbar'
import Typography from '../components/Typography'
import ProductItem from '../components/ProductItem'
import AsyncStorage from '@react-native-community/async-storage'
import { getProductsByCEP } from '../services/products'
import { getLocationByLatLong } from '../services/locations'

const Deals = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [localizacao, setLocalizacao] = useState("");

  const loadProducts = async () => {
    let obj = await AsyncStorage.getItem('Localization')
    const local = JSON.parse(obj);

    if (local == undefined || local == "") {
      await (async () => {
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
    loadProducts();
    setProducts(products.filter(p => p.IdCategoria == categoriaId))
  }, []);

  return (
    <React.Fragment>
      <MainNavbar />
      
      <View style={styles.container}>
        <Typography size="medium" color="#000">
          Ofertas
        </Typography>

        <FlatList
          data={products}
          renderItem={({ item }) => {
            return item.hasOffer && (
              <TouchableOpacity onPress={() => navigation.navigate('Produto', { product: item })}>
                <ProductItem product={item} />
              </TouchableOpacity>
            )
          }}
          keyExtractor={(item, index) => index}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </View>
        
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export default Deals
