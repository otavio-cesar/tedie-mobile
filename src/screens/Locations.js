import React, { useEffect, useCallback, useState } from 'react'
import { View, Text, StatusBar, TouchableWithoutFeedback, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
// components
import ScreenContainer from '../components/ScreenContainer'
import ContentContainer from '../components/ContentContainer'
import Navbar from '../components/Navbar'
import Typography from '../components/Typography'
import LocationItem from '../components/LocationItem'
// theme
import theme from '../theme'
// services
import { getLocations } from '../services/locations'

const Locations = ({ navigation }) => {
  const [locationsLoader, setLocationsLoader] = useState(false)
  const [locations, setLocations] = useState([])

  const loadLocations = useCallback(async () => {
    setLocationsLoader(true)

    const locationsResponse = await getLocations()
    setLocations(locationsResponse)
    
    setLocationsLoader(false)
  }, [setLocationsLoader, setLocations, getLocations])
  
  useEffect(() => {
    loadLocations()
  }, [loadLocations])

  return (
    <React.Fragment>
      <StatusBar backgroundColor={theme.palette.primary} />
      <Navbar
        left={
          <TouchableOpacity hitSlop={theme.hitSlop} onPress={() => navigation.pop()}>
            <Ionicons name="md-arrow-back" size={25} color="#fff" />
          </TouchableOpacity>
        }
        title={
          <Typography size="small" color="#fff">
            Localização
          </Typography>
        }
      />

      <ScreenContainer>

        <ContentContainer>
          <View style={styles.searchContainer}>
            <Ionicons name="md-search" size={30} color={theme.palette.primary} />
            <TextInput 
              style={styles.textInput}
              value="Digite o endereço"
            />
          </View>
        </ContentContainer>
        

        <TouchableWithoutFeedback>
          <ContentContainer background="#fff">
            <View style={styles.getLocationButton}>
              <Ionicons name="md-locate" size={30} color={theme.palette.primary} />

              <Text>
                Usar Localização Atual
              </Text>

              <Ionicons name="ios-arrow-forward" size={30} color={theme.palette.primary} />
            </View>
            
          </ContentContainer>
        </TouchableWithoutFeedback>

        {locationsLoader && (
          <React.Fragment>
            <LocationItem skeleton />
            <LocationItem skeleton />
            <LocationItem skeleton />
          </React.Fragment>
        )}

        {locations.length > 0 && !locationsLoader 
          && locations.map(location => (
            <LocationItem 
              key={`${location.Endereco}-${location.Num}`}
              location={location}
              onPressEdit={() => navigation.navigate('Localização', { location: location })} 
            />
          )
        )}

      </ScreenContainer>
    </React.Fragment>  
    
  )
}

const styles = StyleSheet.create({
  getLocationButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  touchable: {
    marginVertical: 16
  },

  textInput: {
    width: '85%',
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginLeft: 16,
    backgroundColor: '#fafafa',
    borderRadius: 16
  },

  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})

export default Locations
