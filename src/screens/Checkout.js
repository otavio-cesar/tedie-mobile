import React, { useContext, useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
// theme
import theme from '../theme'
// components
import Navbar from '../components/Navbar'
import Typography from '../components/Typography'
import ScreenContainer from '../components/ScreenContainer'
import ContentContainer from '../components/ContentContainer'
import Divider from '../components/Divider'
import Button from '../components/Button'
import RadioButton from '../components/RadioButton'
import Box from '../components/Box'
import { CartContext } from '../contexts/CartContext'
import { CheckoutContext } from '../contexts/CheckoutContext'
import { AppContext } from '../contexts/AppContext'
import { postPedido } from '../services/products'

const Checkout = ({ navigation, route }) => {
  const [selectedPayment, setSelectedPayment] = useState("credit")
  const { cartState, cartDispatch } = useContext(CartContext);
  const { checkoutState, checkoutDispatch } = useContext(CheckoutContext);
  const { state, dispatch } = useContext(AppContext);
  const [showHorario, setShowHorario] = useState("Tipo de entrega-Horário-0")
  const [showEndereco, setShowEndereco] = useState("Selecione")
  const [showCartao, setShowCartao] = useState("")

  useEffect(() => {
    console.log(cartState.markets)
    console.log(checkoutState.selectedMarketIndex)
    changeAddress()
    changeHorario()
    changeCartao()
  }, [checkoutState.selectedMarketIndex])

  useEffect(() => {
    console.log(checkoutState.horarioEntregaPorEstabelecimento)
    changeHorario()
  }, [checkoutState.horarioEntregaPorEstabelecimento])

  useEffect(() => {
    console.log(checkoutState.enderecoEntregaPorEstabelecimento)
    changeAddress()
  }, [checkoutState.enderecoEntregaPorEstabelecimento])

  useEffect(() => {
    console.log(checkoutState.cartaoPorEstabelecimento)
    changeCartao()
  }, [checkoutState.cartaoPorEstabelecimento])

  async function changeAddress() {
    if (checkoutState.enderecoEntregaPorEstabelecimento.length == 0) return
    const market = cartState.markets[checkoutState.selectedMarketIndex]
    const selected = checkoutState.enderecoEntregaPorEstabelecimento[market.IdEmpresa]
    setShowEndereco(selected?.Beautify ?? "Selecione")
  }

  async function changeHorario() {
    if (checkoutState.horarioEntregaPorEstabelecimento.length == 0) return
    const market = cartState.markets[checkoutState.selectedMarketIndex]
    const selected = checkoutState.horarioEntregaPorEstabelecimento[market.IdEmpresa]
    setShowHorario(selected?.split('-').length > 0 ? selected : "Tipo de entrega-Horário-0")
  }

  async function changeCartao() {
    if (checkoutState.cartaoPorEstabelecimento.length == 0) return
    const market = cartState.markets[checkoutState.selectedMarketIndex]
    const selected = checkoutState.cartaoPorEstabelecimento[market.IdEmpresa]
    setShowCartao(selected)
    if (selected)
      setSelectedPayment(selected.opcao)
  }

  function selecionaOpcaoCartao(opcao) {
    const market = cartState.markets[checkoutState.selectedMarketIndex]
    let he = { ...checkoutState.cartaoPorEstabelecimento }
    const cartao = he[`${market.IdEmpresa}`]
    cartao.opcao = opcao
    he[`${market.IdEmpresa}`] = cartao
    const action = { type: "setCartaoPorEstabelecimento", payload: { cartaoPorEstabelecimento: he } }
    checkoutDispatch(action);
    setSelectedPayment(opcao)
    // changeCartao()
  }

  async function fazerPedido() {
    const idCliente = state.sessao.IdCliente
    cartState.markets.forEach(market => {
      let Valor = cartState.totalComprasPorEstabelecimento[`"${market.IdEmpresa}"`] +
        (checkoutState.horarioEntregaPorEstabelecimento[market.IdEmpresa]?.split('-').length > 0 ? (+checkoutState.horarioEntregaPorEstabelecimento[market.IdEmpresa].split('-')[2]) : 0)
      let Cupom = 0// TODO
      let TipoEntrega = checkoutState.horarioEntregaPorEstabelecimento[market.IdEmpresa].split('-')[0]
      let Horario = checkoutState.horarioEntregaPorEstabelecimento[market.IdEmpresa].split('-')[1]
      let CEP = checkoutState.enderecoEntregaPorEstabelecimento[market.IdEmpresa].CEP
      let OpcaoPagamento = checkoutState.cartaoPorEstabelecimento[market.IdEmpresa].opcao

      let pedido = {
        IdCliente: idCliente,
        NumeroPedido: Math.random() * 9999,
        Data: Date.now(),
        Valor,
        Cupom,
        TipoEntrega,
        Horario,
        CEP,
        FormaPagamento: OpcaoPagamento
      }

      postPedido(pedido)
    });
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
            Checkout
          </Typography>
        }
      />

      <ScreenContainer>
        {/* Delivery mode */}
        <ContentContainer>
          <TouchableOpacity onPress={() => navigation.navigate("Entrega")}>
            <Box direction="row" justify="space-between" alignItems="center">
              <Box direction="column" justify="center" alignItems="flex-start">
                <Typography size="small" color={theme.palette.light}>
                  {showHorario?.split('-').length > 0 ? showHorario.split('-')[0] : "Tipo de entrega"}
                </Typography>
                <Typography size="small" color={theme.palette.dark}>
                  {showHorario?.split('-').length > 0 ? showHorario.split('-')[1] : "Horário"}
                </Typography>
              </Box>

              <Typography size="small" color={theme.palette.primary}>
                Trocar
              </Typography>
            </Box>
          </TouchableOpacity>
        </ContentContainer>
        {/* End delivery mode */}

        {/* Delivery Location */}
        <ContentContainer>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('LocalizaçõesCheckout')}>
            <View style={styles.locationOuterContainer}>
              <Typography size="caption" color={theme.palette.light}>
                Entregar em
              </Typography>

              <View style={styles.locationContainer}>
                <Ionicons name="md-locate" size={25} color={theme.palette.primary} />

                <View style={styles.locationInfo}>
                  <Typography size="small" color={theme.palette.dark}>
                    {showEndereco}
                  </Typography>
                </View>

                <Ionicons name="ios-arrow-forward" size={25} color={theme.palette.primary} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ContentContainer>
        {/* End Delivery Location */}

        {/* Prices and Totals */}

        {cartState.markets.length > 0 && cartState.markets.map((market, index) => (
          <TouchableOpacity onPress={() => checkoutDispatch({ type: "setSelectedMarketIndex", payload: { selectedMarketIndex: index } })}>
            <ContentContainer>
              <View style={styles.pricesOuterContiner}>
                <Typography size="large" color={theme.palette.dark}>
                  {market.Nome}
                </Typography>

                <Divider />

                <View style={styles.priceContainer}>
                  <Typography size="small" color={theme.palette.light}>
                    Total em produtos
              </Typography>
                  <Typography size="small" color={theme.palette.light}>
                    R$ {cartState.totalComprasPorEstabelecimento[`"${market.IdEmpresa}"`].toFixed(2).replace('.', ',')}
                  </Typography>
                </View>

                <View style={styles.priceContainer}>
                  <Typography size="small" color={theme.palette.light}>
                    Entrega
              </Typography>
                  <Typography size="small" color={theme.palette.light}>
                    R$ {checkoutState.horarioEntregaPorEstabelecimento[market.IdEmpresa]?.split('-').length > 0 ?
                      (+checkoutState.horarioEntregaPorEstabelecimento[market.IdEmpresa].split('-')[2]).toFixed(2).replace('.', ',')
                      : "0,00"}
                  </Typography>
                </View>

                <Divider />

                <View style={styles.priceContainer}>
                  <Typography size="medium" color={theme.palette.dark}>
                    TOTAL
              </Typography>
                  <Typography size="medium" color={theme.palette.dark}>
                    R$ {
                      (cartState.totalComprasPorEstabelecimento[`"${market.IdEmpresa}"`]
                        +
                        (checkoutState.horarioEntregaPorEstabelecimento[market.IdEmpresa]?.split('-').length > 0 ? (+checkoutState.horarioEntregaPorEstabelecimento[market.IdEmpresa].split('-')[2]) : 0)
                      ).toFixed(2).replace('.', ',')
                    }
                  </Typography>
                </View>
              </View>
            </ContentContainer>
          </TouchableOpacity>
        ))}


        {/* End Prices and Totals */}

        {/* Coupons */}
        <TouchableOpacity onPress={() => navigation.navigate('Cupons')}>
          <ContentContainer>
            <View style={styles.couponContainer}>
              <Ionicons name="md-pricetag" size={25} color={theme.palette.light} />

              <View style={styles.couponTextContainer}>
                <Typography size="small" color={theme.palette.light}>
                  Selecionar Cupom
                </Typography>
              </View>

              <Ionicons name="ios-arrow-forward" size={25} color={theme.palette.primary} />
            </View>
          </ContentContainer>
        </TouchableOpacity>
        {/* End Coupons */}

        {/* Payment methods */}
        <ContentContainer>
          <View style={styles.paymentContainer}>
            <Typography size="large" color={theme.palette.dark}>
              Pagamento
            </Typography>

            <Divider />

            <TouchableOpacity onPress={() => navigation.navigate('Pagamentos')}>
              <View style={styles.paymentMethodContainer}>
                <View style={styles.paymentContainer}>
                  <Typography size="small" color={theme.palette.dark}>
                    Cartão pelo TEDIE
                  </Typography>
                  <Typography size="small" color={theme.palette.light}>
                    {showCartao &&
                      <>
                        {showCartao.Bandeira} {showCartao.Numero.split(" ").map((y, i) => { return i == 1 || i == 2 ? "****" : y }).join(" ")}
                      </>
                    }
                  </Typography>
                </View>


                <Typography size="small" color={theme.palette.primary}>
                  Trocar
                </Typography>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => selecionaOpcaoCartao("credit")}>
              <View style={styles.paymentMethodContainer}>
                <Typography size="small" color={theme.palette.dark}>
                  Crédito
                </Typography>
                <RadioButton selected={selectedPayment === "credit"} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => selecionaOpcaoCartao("debit")}>
              <View style={styles.paymentMethodContainer}>
                <Typography size="small" color={theme.palette.dark}>
                  Débito
                </Typography>
                <RadioButton selected={selectedPayment === "debit"} />
              </View>
            </TouchableOpacity>

            <Divider />

            <TouchableOpacity onPress={() => navigation.navigate('Documento')}>
              <View style={styles.paymentMethodContainer}>
                <View style={styles.paymentContainer}>
                  <Typography size="small" color={theme.palette.dark}>
                    CPF/CNPJ na Nota
                  </Typography>
                  <Typography size="small" color={theme.palette.light}>
                    123.456.789-00
                  </Typography>
                </View>

                <Typography size="small" color={theme.palette.primary}>
                  Trocar
                </Typography>
              </View>
            </TouchableOpacity>
          </View>
        </ContentContainer>
        {/* End Payment Methods */}

        <Button
          background={theme.palette.primary}
          color="#fff"
          width="100%"
          text="Fazer pedido"
          onPress={() => fazerPedido()}
        />
      </ScreenContainer>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  locationOuterContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  locationContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginTop: 8
  },
  locationInfo: {
    maxWidth: 200,
    marginHorizontal: 16
  },

  pricesOuterContiner: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    textShadow: '0 0 black'
  },
  priceContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  couponContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8
  },

  paymentContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  paymentMethodContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8
  }
})

export default Checkout


