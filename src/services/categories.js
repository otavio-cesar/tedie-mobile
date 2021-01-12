import Axios from 'axios'

export const getCategories = async () => {
  const response = await Axios.get(
    'http://tedie.azurewebsites.net/api/categorias'
  )

  return response.data
}