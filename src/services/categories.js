import Axios from 'axios'

export const getCategories = async () => {
  const response = await Axios.get(
    'http://localhost:59618/api/categorias'
  )

  return response.data
}