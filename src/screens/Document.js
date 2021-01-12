import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
// components
import Navbar from '../components/Navbar'
import Typography from '../components/Typography'
import ScreenContainer from '../components/ScreenContainer'
import Box from '../components/Box'
import TextField from '../components/TextField'
import Button from '../components/Button'
// theme
import theme from '../theme'

const Document = ({ navigation }) => {
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
            CPF na nota
          </Typography>
        }
      />

      <ScreenContainer>
        <Box direction="row" justify="center" alignItems="center">
          <TextField
            width="100%"
            label="CPF na nota"
          />
        </Box>
        
        <Button 
          background={theme.palette.secondary}
          color={theme.palette.primary}
          width="100%"
          text="Salvar"
        />
      </ScreenContainer>
    </React.Fragment>
  )
}

export default Document