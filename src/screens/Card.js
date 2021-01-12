import React from 'react'
import { StyleSheet, TouchableOpacity, TextInput, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
// component
import Navbar from '../components/Navbar'
import ScreenContainer from '../components/ScreenContainer'
import Typography from '../components/Typography'
import Button from '../components/Button'
// theme
import theme from '../theme'

const Card = ({ navigation }) => {
  return (
    <React.Fragment>
      <Navbar
        left={
          <TouchableOpacity 
            hitSlop={theme.hitSlop}
            onPress={() => navigation.pop()}
          >
            <Ionicons name="md-arrow-back" size={25} color="#fff" />
          </TouchableOpacity>
        }
        title={
          <Typography size="small" color="#fff">
            Novo Cartão
          </Typography>
        }
      />

      <ScreenContainer>
        <TextInput 
          style={styles.textInput}
          value="Número do Cartão"
        />

        <TextInput 
          style={styles.textInput}
          value="Validade"
        />

        <TextInput 
          style={styles.textInput}
          value="CVV"
        />

        <TextInput 
          style={styles.textInput}
          value="Nome do Titular"
        />

        <TextInput 
          style={styles.textInput}
          value="CPF / CNPJ"
        />

        <View style={styles.confirmButton}>
          <Button 
            background={theme.palette.secondary}
            color={theme.palette.primary}
            width="50%"
            text="Salvar"
          />
        </View>
      </ScreenContainer>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fafafa',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: theme.palette.primary,
    marginVertical: 8
  },

  confirmButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
})

export default Card


