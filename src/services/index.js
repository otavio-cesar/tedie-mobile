import Axios from 'axios'

export const getTokenData = async () => {
  const response = await Axios.get(
    'http://192.168.0.106:59618/api/token/?CredencialName=DEVTEDIE&Credencialkey=CAK23432KD0932DJ23D32IJD39'
  )

  return response.data[0]
}