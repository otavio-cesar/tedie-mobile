import React from 'react'
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
// components
import Navbar from '../components/Navbar'
import Typography from '../components/Typography'
import ProductItem from '../components/ProductItem'
// theme
import theme from '../theme'

const Products = ({ navigation }) => {
  const products = [
    { name: 'Produto 01', price: 'R$ 50,35' },
    { name: 'Produto 02', price: 'R$ 23,50' },
    { name: 'Produto 03', price: 'R$ 79,99' },
    { name: 'Produto 04', price: 'R$ 25,99' },
    { name: 'Produto 05', price: 'R$ 43,50' },
    { name: 'Produto 06', price: 'R$ 54,40' },
    { name: 'Produto 07', price: 'R$ 89,99' },
    { name: 'Produto 08', price: 'R$ 87,70' },
    { name: 'Produto 09', price: 'R$ 41,20' },
    { name: 'Produto 10', price: 'R$ 43,50' }
  ]

  return (
    <React.Fragment>
      <Navbar 
        left={
          <TouchableOpacity hitSlop={theme.hitSlop} onPress={() => navigation.pop()}>
            <Ionicons name="md-arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
        }
        title={
          <Typography size="small" color="#fff">
            Produtos
          </Typography>
        }
      />
      
      <View style={styles.container}>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Produto')}>
              <ProductItem product={item} />
            </TouchableOpacity>
          )}
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
    alignItems: 'center',
    marginVertical: 16
  },
})

export default Products
