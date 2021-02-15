import React, { useContext, useEffect, useRef, useState } from 'react'
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native'
// components
import MainNavbar from '../components/MainNavbar'
import Typography from '../components/Typography'
import ProductItem from '../components/ProductItem'
import { getProductsByCEP } from '../services/products'
import { AppContext } from '../contexts/AppContext'
import ContentContainer from '../components/ContentContainer'
import { TextInput } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
// theme
import theme from '../theme'
import { ScreenContainer } from 'react-native-screens'

const Deals = ({ navigation }) => {
  const { state, dispatch } = useContext(AppContext);
  const [products, setProducts] = useState([]);

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

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <React.Fragment>
      <MainNavbar navigation={navigation} />

      <ScreenContainer style={{padding:16}}>
        <ContentContainer>
          <View style={styles.searchContainer}>
            <Ionicons name="md-search" size={30} color={theme.palette.primary} />
            <TextInput
              style={styles.textInput}
              value="Digite o produto"
            />
          </View>
        </ContentContainer>


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
      </ScreenContainer>

    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})

export default Deals
