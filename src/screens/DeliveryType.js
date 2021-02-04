import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
// components
import Navbar from '../components/Navbar'
import Typography from '../components/Typography'
import ScreenContainer from '../components/ScreenContainer'
import ContentContainer from '../components/ContentContainer'
import Box from '../components/Box'
import Divider from '../components/Divider'
import RadioButton from '../components/RadioButton'
// theme
import theme from '../theme'
import { CheckoutContext } from '../contexts/CheckoutContext'
import { CartContext } from '../contexts/CartContext'
import { buscaHorarios } from '../services/market'

const DeliveryType = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState(0)
  const { checkoutState, checkoutDispatch } = useContext(CheckoutContext);
  const { cartState, cartDispatch } = useContext(CartContext);
  const [horarios, setHorarios] = useState([])

  useEffect(() => {
    const market = cartState.markets[checkoutState.selectedMarketIndex]
    buscaHorariosEstabelecimento(market.IdEmpresa)
  }, [checkoutState.selectedMarketIndex])

  async function buscaHorariosEstabelecimento(idEmpresa) {
    const horarios = await buscaHorarios(idEmpresa)
    console.log(horarios)
    setHorarios(horarios)
  }

  return (
    <React.Fragment>
      <Navbar
        left={
          <TouchableOpacity hitSlop={theme.hitSlop} onPress={() => navigation.pop()}>
            <Ionicons name="md-arrow-back" size={25} color="#fff" />
          </TouchableOpacity>
        }
        title={
          <Typography size="small" color="#fff">
            Entrega
          </Typography>
        }
      />

      <ScreenContainer>
        {horarios.map((h, index) => (
          <ContentContainer>
            <Box direction="column" justify="center" alignContent="flex-start">
              <Typography size="large" color={theme.palette.dark}>
               {h.TIPOENTREGA}
              </Typography>

              <Divider />
              {horarios.filter(t => t.identrega == h.identrega)
                .map((th, index) => (
                  <TouchableOpacity onPress={() => setSelectedType(0)}>
                    <Box direction="row" justify="space-between" alignItems="center" fullwidth>
                      <Typography size="small" color={theme.palette.light}>
                        {th.horario}
                      </Typography>
                      <RadioButton selected={selectedType === 0} />
                    </Box>
                  </TouchableOpacity>
                ))}
            </Box>
          </ContentContainer>
        ))}


      </ScreenContainer>
    </React.Fragment>
  )
}

export default DeliveryType
