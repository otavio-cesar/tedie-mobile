import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, TextInput, View, Picker } from 'react-native'
// import {Picker } from 'react-native-community/picker'
import { Ionicons } from '@expo/vector-icons'
// component
import Navbar from '../components/Navbar'
import ScreenContainer from '../components/ScreenContainer'
import Typography from '../components/Typography'
import Button from '../components/Button'
// theme
import theme from '../theme'
import { func } from 'prop-types'
import { postCard } from '../services/card'
import AsyncStorage from '@react-native-community/async-storage'

const Card = ({ navigation }) => {
  const [CVV, setCVV] = useState("")
  const [Numero, setNumero] = useState("")
  const [Validade, setValidade] = useState("")
  const [CPF, setCPF] = useState("")
  const [Titular, setTitular] = useState("")
  const [IdBandeira, setIdBandeira] = useState("1");

  async function salvarCartao() {
    const sessao = JSON.parse(await AsyncStorage.getItem("sessao"))

    const cartao = {
      IdCliente: sessao.IdCliente,
      Numero,
      Validade,
      CPF,
      Titular,
      CVV, 
      IdBandeira
    }

    await postCard(cartao)

    navigation.pop()
  }

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
          value={Numero}
          onChangeText={text => setNumero(text)}
          placeholder="Número do Cartão"
        />

        <TextInput
          style={styles.textInput}
          onChangeText={text => setValidade(text)}
          value={Validade}
          placeholder="Validade"
        />

        <TextInput
          style={styles.textInput}
          onChangeText={text => setCVV(text)}
          value={CVV}
          placeholder="CVV"
        />

        <TextInput
          style={styles.textInput}
          onChangeText={text => setTitular(text)}
          value={Titular}
          placeholder="Nome do Titular"
        />

        <TextInput
          style={styles.textInput}
          onChangeText={text => setCPF(text)}
          value={CPF}
          placeholder="CPF / CNPJ"
        />

        <Picker
          selectedValue={IdBandeira}
          style={styles.textInput}
          // style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setIdBandeira(itemValue)}
        >
          <Picker.Item label="Visa" value="1" />
          <Picker.Item label="Mastercard" value="2" />
        </Picker>

        <View style={styles.confirmButton}>
          <Button
            background={theme.palette.secondary}
            color={theme.palette.primary}
            width="50%"
            text="Salvar"
            onPress={salvarCartao}
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


