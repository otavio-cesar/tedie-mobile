import React, { useEffect, useCallback, useState, useRef, useContext } from 'react'
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
import { getLocationByLatLong, getLocations } from '../services/locations'
import Toast, { DURATION } from 'react-native-easy-toast'
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-community/async-storage'
import { AppContext } from '../contexts/AppContext'
import { CheckoutContext } from '../contexts/CheckoutContext'
import { CartContext } from '../contexts/CartContext'

const LocationsCheckout = ({ route, navigation }) => {
  const { state, dispatch } = useContext(AppContext);
  const { checkoutState, checkoutDispatch } = useContext(CheckoutContext);
  const { cartState, cartDispatch } = useContext(CartContext);
  const [locationsLoader, setLocationsLoader] = useState(false)
  const [locations, setLocations] = useState([])
  const toastRef = useRef();

  const loadLocations = useCallback(async () => {
    setLocationsLoader(true)

    const locationsResponse = await getLocations()
    setLocations(locationsResponse)

    setLocationsLoader(false)
  }, [setLocationsLoader, setLocations, getLocations])

  useEffect(() => {
    loadLocations()
  }, [loadLocations])

  async function setLocalization(local) {
    let ee = { ...checkoutState.enderecoEntregaPorEstabelecimento }
    ee[`${0}`] = local
    const action = { type: "setEnderecoEntregaPorEstabelecimento", payload: { enderecoEntregaPorEstabelecimento: ee } }
    checkoutDispatch(action);

    navigation.pop()
  }

  return (
    <React.Fragment>

      <Toast ref={toastRef}
        style={{ backgroundColor: 'black' }}
        opacity={0.8}
        textStyle={{ color: 'white' }} />

      <StatusBar backgroundColor={theme.palette.primary} />
      <Navbar
        left={
          <TouchableOpacity hitSlop={theme.hitSlop} onPress={() => navigation.back}>
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
              setLocalization={setLocalization}
            />
          )
          )}

      </ScreenContainer>
    </React.Fragment >

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

export default LocationsCheckout
