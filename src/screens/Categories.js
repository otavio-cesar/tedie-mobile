import React, { useCallback, useState, useEffect } from 'react'
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native'
// components
import MainNavbar from '../components/MainNavbar'
import Typography from '../components/Typography'
import CategoryItem from '../components/CategoryItem'
// services
import { getCategories } from '../services/categories' 

const Categories = ({ navigation }) => {
  const [categoriesLoader, setCategoriesLoader] = useState(false)
  const [categories, setCategories] = useState([])

  const loadCategories = useCallback(async () => {
    setCategoriesLoader(true)

    const categoriesResponse = await getCategories()
    setCategories(categoriesResponse)

    setCategoriesLoader(false)
  }, [setCategoriesLoader, setCategories, getCategories])

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  return (
    <React.Fragment>
      <MainNavbar />
      
      <View style={styles.container}>
        <Typography size="medium" color="#000">
          Categorias
        </Typography>

        <FlatList 
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Produtos')} >
              <CategoryItem 
                category={item} 
              />
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
  }
})

export default Categories
