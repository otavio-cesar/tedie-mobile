import React, { useCallback, useState, useEffect } from 'react'
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native'
// components
import MainNavbar from '../components/MainNavbar'
import Typography from '../components/Typography'
import CategoryItem from '../components/CategoryItem'
// services
import { getCategories } from '../services/categories'
import Navbar from '../components/Navbar'
import Avatar from '../components/Avatar'
// theme
import theme from '../theme'
import { Ionicons } from '@expo/vector-icons'

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
      {/* <MainNavbar navigation={navigation} /> */}

      <Navbar
        left={
          <React.Fragment>
            <Avatar
              size={35}
              color={theme.palette.secondary}
            />
            <Typography size="medium" color="#fff">
              TEDIE
          </Typography>
          </React.Fragment>
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
              onPress={() => navigation.navigate('Produtos')
              }
            >
              <Ionicons name="md-search" size={30} color="#fff" />
            </TouchableOpacity>
          </React.Fragment>
        }
      />

      <View style={styles.container}>
        <Typography size="medium" color="#000">
          Categorias
        </Typography>

        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Produtos', { categoriaId: item.IdCategoria })} >
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
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16
  },
  navbarButton: {
    marginHorizontal: 8
  }
})

export default Categories
