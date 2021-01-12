import React from 'react'
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
// components
import Navbar from '../components/Navbar'
import Typography from '../components/Typography'
import ScreenContainer from '../components/ScreenContainer'
import ContentContainer from '../components/ContentContainer'
import Box from '../components/Box'
// theme
import theme from '../theme'
// qrcode
import QRCode from 'react-native-qrcode-svg';

const MyCode = ({ navigation }) => {
  return (
    <React.Fragment>
      <Navbar
        left={
          <TouchableOpacity hitSlop={theme.hitSlop} onPress={() => navigation.pop()}>
            <Ionicons name="md-arrow-back" size={25} color="#fff" />
          </TouchableOpacity>
        }
        title={
          <Typography size="small" color="#fff">
            Indicação
          </Typography>
        }
      />

      <ScreenContainer>
        <Box direction="column" justify="center" alignItems="center">
          <Typography size="medium" color={theme.palette.dark}>
            Leia o código QR abaixo ou envie seu link para indicar!
          </Typography>

          <ContentContainer>
            <QRCode
              size={Dimensions.get('window').width - 64}
              value="Just some string value"
            />
          </ContentContainer>

          <TouchableOpacity hitSlop={theme.hitSlop}>
            <Typography size="large" color={theme.palette.primary}>
              tedie/meucodigo
            </Typography>
          </TouchableOpacity>
        </Box>
      </ScreenContainer>
    </React.Fragment>
  )
}

export default MyCode

const styles = StyleSheet.create({})
