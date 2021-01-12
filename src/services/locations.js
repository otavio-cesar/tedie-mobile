import Axios from 'axios'

export const getLocations = async () => {
  const response = await Axios.get(
    'http://tedie.azurewebsites.net/api/enderecos'
  )

  return response.data
}