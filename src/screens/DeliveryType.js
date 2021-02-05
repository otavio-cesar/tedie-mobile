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

  useEffect(() => {
    if (horarios.length > 0) {
      setSelectedIndexSaved()
    }
  }, [horarios, checkoutState.selectedMarketIndex])

  async function setSelectedIndexSaved() {
    const market = cartState.markets[checkoutState.selectedMarketIndex]
    const horarioEntrega = checkoutState.horarioEntregaPorEstabelecimento[market.IdEmpresa]
    setSelectedType(horarioEntrega)
  }

  async function buscaHorariosEstabelecimento(idEmpresa) {
    const horarios = await buscaHorarios(idEmpresa)
    setHorarios(horarios)
  }

  async function setSelectedHorario(horario) {
    const horarioEntrega = `${horario.TIPOENTREGA}-${horario.horario}`
    setSelectedType(horarioEntrega)

    const market = cartState.markets[checkoutState.selectedMarketIndex]
    let he = { ...checkoutState.horarioEntregaPorEstabelecimento }
    he[`${market.IdEmpresa}`] = horarioEntrega
    const action = { type: "setHorarioEntregaPorEstabelecimento", payload: { horarioEntregaPorEstabelecimento: he } }
    checkoutDispatch(action);
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
          <ContentContainer key={`${h.identrega}-${h.horacod}`}>
            <Box direction="column" justify="center" alignContent="flex-start">
              <Typography size="large" color={theme.palette.dark}>
                {h.TIPOENTREGA}
              </Typography>

              <Divider />
              {horarios.filter(t => t.identrega == h.identrega)
                .map((th, index) => (
                  <TouchableOpacity key={`${th.identrega}-${th.horacod}`} onPress={() => setSelectedHorario(th)}>
                    <Box direction="row" justify="space-between" alignItems="center" fullwidth>
                      <Typography size="small" color={theme.palette.light}>
                        {th.horario}
                      </Typography>
                      <RadioButton selected={selectedType === `${th.TIPOENTREGA}-${th.horario}`} />
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
