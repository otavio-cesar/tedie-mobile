import Axios from 'axios'

export const getCategories = async () => {
  const response = await Axios.get(
    'http://192.168.0.106:59618/api/categorias'
  )

  return response.data
}