import React from 'react'
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
// components
import MainNavbar from '../components/MainNavbar'
import Typography from '../components/Typography'
import ProductItem from '../components/ProductItem'

const Deals = ({ navigation }) => {
  const products = [
    { name: 'Produto 01', price: 'R$ 50,35', hasOffer: true, off: '10%' },
    { name: 'Produto 02', price: 'R$ 23,50', hasOffer: true, off: '20%' },
    { name: 'Produto 03', price: 'R$ 79,99', hasOffer: true, off: '30%' },
    { name: 'Produto 04', price: 'R$ 25,99', hasOffer: true, off: '15%' },
    { name: 'Produto 05', price: 'R$ 43,50', hasOffer: true, off: '5%' },
    { name: 'Produto 06', price: 'R$ 54,40', hasOffer: true, off: '7%' },
    { name: 'Produto 07', price: 'R$ 89,99' },
    { name: 'Produto 08', price: 'R$ 87,70' },
    { name: 'Produto 09', price: 'R$ 41,20' },
    { name: 'Produto 10', price: 'R$ 43,50' }
  ]

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
              <TouchableOpacity onPress={() => navigation.navigate('Produto')}>
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
