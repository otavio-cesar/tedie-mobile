import React, { useContext, useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Text, StatusBar, TouchableOpacity } from 'react-native'
// theme
import TextField from '../components/TextField'
import Box from '../components/Box'
import Button from '../components/Button'
import theme from '../theme'
import Typography from '../components/Typography'
import { login } from '../services/clients'
import { AppContext } from '../contexts/AppContext'
import Toast from 'react-native-easy-toast'

const Login = ({ navigation }) => {
  const [activePage, setActivePage] = useState('login')
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const toastRef = useRef();
  const { state, dispatch } = useContext(AppContext);

  async function handleLogin() {
    const resp = await login(usuario, senha)
    if (resp.IdCliente && resp.token) {
      const action = { type: "createSessao", payload: { sessao: { IdCliente: resp.IdCliente, Token: resp.token } } }
      dispatch(action)
      navigation.navigate('Tabs')
    } else {
      toastRef.current?.show('Usuário ou senha inválidos', 3000)
    }
  }

  useEffect(() => {
    if (state.sessao)
      navigation.navigate('Tabs')
  })

  return (
    <React.Fragment>

      <Toast ref={toastRef}
        style={{ backgroundColor: 'white' }}
        opacity={0.8}
        textStyle={{ color: 'black' }} />

      {activePage === 'login' && (
        <View style={styles.container}>
          <StatusBar backgroundColor={theme.palette.primary} />

          <Box direction="column" justify="center" alignItems="center">
            <Text style={styles.logoPlaceholder}>
              TEDIE
            </Text>

            <Typography size="medium" color={theme.palette.secondary}>
              Simples Assim!
            </Typography>
          </Box>

          <TextField
            width="100%"
            label="E-mail ou CPF"
            labelColor="#fff"
            borderColor={theme.palette.secondary}
            value={usuario}
            setValue={setUsuario}
          />
          <TextField
            width="100%"
            label="Senha"
            labelColor="#fff"
            borderColor={theme.palette.secondary}
            value={senha}
            setValue={setSenha}
          />

          <Box direction="row" justify="center" alignItems="center">
            <Button
              background="#fff"
              color={theme.palette.primary}
              width="80%"
              text="Entrar"
              onPress={() => handleLogin()}
            />
          </Box>

          <Box direction="row" justify="center" alignItems="center">
            <TouchableOpacity hitSlop={theme.hitSlop} onPress={() => setActivePage('cadastro')}>
              <Typography size="small" color={theme.palette.secondary}>
                Não é cadastrado? Faça sua conta!
              </Typography>
            </TouchableOpacity>
          </Box>
        </View>
      )}

      {activePage === 'cadastro' && (
        <View style={styles.container}>
          <StatusBar backgroundColor={theme.palette.primary} />

          <Box direction="column" justify="center" alignItems="center">
            <Typography size="small" color={theme.palette.secondary}>
              Cadastre-se no TEDIE!
            </Typography>
          </Box>

          <Box direction="row" justify="center" alignItems="center">
            <TextField
              width="50%"
              label="Nome"
              labelColor="#fff"
              borderColor={theme.palette.secondary}
            />
            <TextField
              width="50%"
              label="Sobrenome"
              labelColor="#fff"
              borderColor={theme.palette.secondary}
            />
          </Box>

          <TextField
            width="100%"
            label="E-mail"
            labelColor="#fff"
            borderColor={theme.palette.secondary}
          />

          <TextField
            width="100%"
            label="CPF"
            labelColor="#fff"
            borderColor={theme.palette.secondary}
          />

          <TextField
            width="100%"
            label="Data de Nascimento"
            labelColor="#fff"
            borderColor={theme.palette.secondary}
          />

          <TextField
            width="100%"
            label="Senha"
            labelColor="#fff"
            borderColor={theme.palette.secondary}
          />

          <TextField
            width="100%"
            label="Confirme a senha"
            labelColor="#fff"
            borderColor={theme.palette.secondary}
          />

          <Box direction="row" justify="center" alignItems="center">
            <Button
              background="#fff"
              color={theme.palette.primary}
              width="80%"
              text="Cadastrar"
              onPress={() => navigation.navigate('Tabs')}
            />
          </Box>

          <Box direction="row" justify="center" alignItems="center">
            <TouchableOpacity hitSlop={theme.hitSlop} onPress={() => setActivePage('login')}>
              <Typography size="small" color={theme.palette.secondary}>
                Já é cadastrado? Faça o login!
              </Typography>
            </TouchableOpacity>
          </Box>
        </View>
      )}
    </React.Fragment>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.palette.primary
  },
  logoPlaceholder: {
    fontSize: 48,
    fontWeight: 'bold',
    color: theme.palette.secondary
  }
})

export default Login


