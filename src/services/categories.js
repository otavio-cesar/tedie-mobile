import Axios from 'axios'

export const getCategories = async () => {
  const response = await Axios.get(
    'http://tedie.azurewebsites.net/categorias'
  )

  return response.data
}