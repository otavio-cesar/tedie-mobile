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

const Locations = ({ route, navigation }) => {
  const { state, dispatch } = useContext(AppContext);
  const [locationsLoader, setLocationsLoader] = useState(false)
  const [locations, setLocations] = useState([])
  const toastRef = useRef();

  const { setLocalHome } = route.params;

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
    if (local == 'gps') {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const address = await getLocationByLatLong(location.coords.latitude, location.coords.longitude);
        await AsyncStorage.setItem("Localization", JSON.stringify(address));

        const action = { type: "createAddress", payload: address };
        dispatch(action);

        toastRef.current?.show('Endereço selecionado', 2000)
      })()
    } else {
      await AsyncStorage.setItem('Localization', JSON.stringify(local));

      const action = { type: "createAddress", payload: local };
      dispatch(action);

      toastRef.current?.show('Endereço selecionado', 2000)
    }
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

        <ContentContainer background="#fff" >
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <TouchableOpacity onPress={() => setLocalization('gps')}
              style={{
                flex: 1,
                width: '100%',
                minWidth: '50%',
                paddingLeft: '25%',
                flexDirection: 'row'
              }}
            >
              <View style={{ position: 'absolute', left: 0 }}>
                <Ionicons name="md-locate" size={30} color={theme.palette.primary} />
              </View>
              <Text style={{ paddingLeft: 8 }}>
                Usar Localização Atual
              </Text>
            </TouchableOpacity>
            <View style={{ position: 'absolute', right: 0 }}>
              <Ionicons name="ios-arrow-forward" size={30} color={theme.palette.primary} />
            </View>
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

export default Locations
