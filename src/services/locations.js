import Axios from 'axios'

export const getLocations = async () => {
  const response = await Axios.get(
    'http://localhost:59618/api/enderecos'
  )

  return response.data
}