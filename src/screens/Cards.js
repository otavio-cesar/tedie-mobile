import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
// components
import Navbar from '../components/Navbar'
import ScreenContainer from '../components/ScreenContainer'
import Typography from '../components/Typography'
import ContentContainer from '../components/ContentContainer'
import Box from '../components/Box'
// theme
import theme from '../theme'

const Cards = ({ navigation }) => {
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
            Pagamento
          </Typography>
        }
      />

      <ScreenContainer>
        <ContentContainer>
          <Box direction="row" justify="space-between" alignItems="center">
            <Box direction="column" justify="center" alignItems="flex-start">
              <Typography size="small" color={theme.palette.dark}>
                Cartão de Crédito/Débito
              </Typography>
              <Typography size="caption" color={theme.palette.light}>
                VISA **** 1234
              </Typography>
            </Box>

            <Box direction="row" justify="center" alignItems="center">
              <Ionicons name="md-card" size={25} color={theme.palette.dark} />
              <TouchableOpacity 
                style={styles.editButton} 
                hitSlop={styles.slope} 
                onPress={() => openBottomSheet(bottomSheetRef)}
              >
                <Ionicons name="md-more" size={25} color={theme.palette.primary} />
              </TouchableOpacity>
            </Box>
          </Box>
        </ContentContainer>
      </ScreenContainer>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  editButton: {
    marginLeft: 16
  }
})

export default Cards
