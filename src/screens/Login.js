import React, { useContext, useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Text, StatusBar, TouchableOpacity } from 'react-native'
// theme
import TextField from '../components/TextField'
import Box from '../components/Box'
import Button from '../components/Button'
import theme from '../theme'
import Typography from '../components/Typography'
import { login, postCliente } from '../services/clients'
import { AppContext } from '../contexts/AppContext'
import Toast from 'react-native-easy-toast'

const Login = ({ navigation }) => {
  const [activePage, setActivePage] = useState('login')
  const [usuario, setUsuario] = useState('otavio@gmail.com')
  const [senha, setSenha] = useState('123123')
  const [sobrenome, setSobrenome] = useState('')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [nascimento, setNascimento] = useState('')
  const toastRef = useRef();
  const { state, dispatch } = useContext(AppContext);

  async function handleLogin() {
    const resp = await login(usuario.toLowerCase(), senha.toLowerCase())
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

  async function cadastrarUsuario() {
    const cliente = {
      NomeCliente: `${nome} ${sobrenome}`,
      datanasc: nascimento,
      Email: email.toLowerCase(),
      CPF: cpf,
      Senha: senha.toLowerCase(),
      Apelido: nome
    }

    if (await postCliente(cliente)) {
      toastRef.current?.show('Cadastro realizado. Faça login.', 3000)
      setActivePage('login')
      setSenha('')
    } else {
      toastRef.current?.show('Ocorreu um erro inesperado.', 3000)
    }
  }

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
            // password
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
              value={nome}
              setValue={setNome}
              labelColor="#fff"
              borderColor={theme.palette.secondary}
            />
            <TextField
              width="50%"
              label="Sobrenome"
              // value={sobrenome}
              setValue={setSobrenome}
              labelColor="#fff"
              borderColor={theme.palette.secondary}
            />
          </Box>

          <TextField
            width="100%"
            label="E-mail"
            value={email}
            setValue={setEmail}
            labelColor="#fff"
            borderColor={theme.palette.secondary}
          />

          <TextField
            width="100%"
            label="CPF"
            value={cpf}
            setValue={setCpf}
            labelColor="#fff"
            borderColor={theme.palette.secondary}
          />

          <TextField
            width="100%"
            label="Data de Nascimento"
            // value={nascimento}
            date
            setValue={setNascimento}
            labelColor="#fff"
            borderColor={theme.palette.secondary}
          />

          <TextField
            width="100%"
            label="Senha"
            value={senha}
            setValue={setSenha}
            labelColor="#fff"
            // password
            borderColor={theme.palette.secondary}
          />

          {/* <TextField
            width="100%"
            label="Confirme a senha"
            labelColor="#fff"
            borderColor={theme.palette.secondary}
          /> */}

          <Box direction="row" justify="center" alignItems="center">
            <Button
              background="#fff"
              color={theme.palette.primary}
              width="80%"
              text="Cadastrar"
              onPress={() => cadastrarUsuario()}
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


