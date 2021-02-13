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
import { geraCheckoutAPI, fazPagamentoJuno } from '../utils/boletofacil'

const Checkout = ({ navigation, route }) => {
  const [selectedPayment, setSelectedPayment] = useState("credit")
  const { cartState, cartDispatch } = useContext(CartContext);
  const { checkoutState, checkoutDispatch } = useContext(CheckoutContext);
  const { state, dispatch } = useContext(AppContext);
  // const [showHorario, setShowHorario] = useState("Tipo de entrega-Horário-0-0")
  const [showEndereco, setShowEndereco] = useState("Selecione")
  const [showCartao, setShowCartao] = useState("")
  const [cupom, setCupom] = useState("")

  useEffect(() => {
    console.log(cartState.markets)
    console.log(checkoutState.selectedMarketIndex)
    changeAddress()
    //changeHorario()
    changeCartao()
  }, [checkoutState.selectedMarketIndex])

  // useEffect(() => {
  //   console.log(checkoutState.horarioEntregaPorEstabelecimento)
  //   changeHorario()
  // }, [checkoutState.horarioEntregaPorEstabelecimento])

  useEffect(() => {
    console.log(checkoutState.enderecoEntregaPorEstabelecimento)
    changeAddress()
  }, [checkoutState.enderecoEntregaPorEstabelecimento])

  useEffect(() => {
    console.log(checkoutState.cupom)
    setCupom(checkoutState.cupom)
  }, [checkoutState.cupom])

  useEffect(() => {
    console.log(checkoutState.cartaoPorEstabelecimento)
    changeCartao()
  }, [checkoutState.cartaoPorEstabelecimento])

  async function changeAddress() {
    if (checkoutState.enderecoEntregaPorEstabelecimento.length == 0) return
    const selected = checkoutState.enderecoEntregaPorEstabelecimento[0]
    setShowEndereco(selected?.Beautify ?? "Selecione")
  }

  function changeHorario(IdEmpresa) {
    if (checkoutState.horarioEntregaPorEstabelecimento.length == 0) return
    const selected = checkoutState.horarioEntregaPorEstabelecimento[IdEmpresa]
    const ret = selected?.split('-').length > 0 ? selected : "Tipo de entrega-Horário-0-0-0"
    return ret
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
    if ('credit') {
      const market = cartState.markets[checkoutState.selectedMarketIndex]
      let he = { ...checkoutState.cartaoPorEstabelecimento }
      const cartao = he[`${market.IdEmpresa}`]
      cartao.opcao = opcao
      he[`${market.IdEmpresa}`] = cartao
      const action = { type: "setCartaoPorEstabelecimento", payload: { cartaoPorEstabelecimento: he } }
      checkoutDispatch(action);
      setSelectedPayment(opcao)
    }
  }

  async function fazerPedido() {
    const idCliente = state.sessao.IdCliente
    
    cartState.markets.forEach(market => {
      const endereco = checkoutState.enderecoEntregaPorEstabelecimento[0]
      const IdCartao = checkoutState.cartaoPorEstabelecimento[market.IdEmpresa].IdCartao
      let Valor = cartState.totalComprasPorEstabelecimento[`"${market.IdEmpresa}"`] +
        (checkoutState.horarioEntregaPorEstabelecimento[market.IdEmpresa]?.split('-').length > 0 ? (+checkoutState.horarioEntregaPorEstabelecimento[market.IdEmpresa].split('-')[2]) : 0)
      let IdCupom = market.IdEmpresa == cupom.IdEmpresa ? cupom.IdCupom : 0
      let Desconto = market.IdEmpresa == cupom.Valor ? cupom.IdCupom : 0
      // let TipoEntrega = checkoutState.horarioEntregaPorEstabelecimento[market.IdEmpresa].split('-')[0]
      let IdTipoEntrega = checkoutState.horarioEntregaPorEstabelecimento[market.IdEmpresa].split('-')[3]
      let Taxa = checkoutState.horarioEntregaPorEstabelecimento[market.IdEmpresa].split('-')[2]
      // let Horario = checkoutState.horarioEntregaPorEstabelecimento[market.IdEmpresa].split('-')[1]
      let IdHorario = checkoutState.horarioEntregaPorEstabelecimento[market.IdEmpresa].split('-')[4]
      let CEP = endereco.CEP
      let OpcaoPagamento = checkoutState.cartaoPorEstabelecimento[market.IdEmpresa].opcao
      
      let pedido = {
        IdEmpresa: market.IdEmpresa,
        IdCliente: idCliente,
        NumeroPedido: (Math.random() * 1000000).toFixed(0),
        Data: new Date().toLocaleDateString(),
        Valor,
        IdCupom,
        // TipoEntrega,
        IdTipoEntrega,
        // Horario,
        IdHorario,
        // CEP,
        IdCartao,
        Taxa,
        IdFormaPagamento: null,
        IdEndereco: endereco.IdEndereco,
        FormaPagamento: OpcaoPagamento,
        Observacao: "",
        Desconto
      }
      debugger
      postPedido(pedido)

      // postPagamento(pedido, market.IdEmpresa)
    });
  }

  const fazPagamento = (cartao, pedido) => {
    let checkout = geraCheckoutAPI()

    checkout.getCardHash(cartao, function (cardHash) {
      console.log('cardHash')
      /* Sucesso - A variável cardHash conterá o hash do cartão de crédito */
      fazPagamentoJuno(cardHash, pedido.NumeroPedido, pedido.Valor, "nomepessoas", "cpf")
    }, function (error) {
      console.log('error')
      /* Erro - A variável error conterá o erro ocorrido ao obter o hash */
    });
  }

  const errorAoPagar = (error) => {
    console.log(error)
  }

  async function postPagamento(pedido, IdEmpresa) {
    const cartao = checkoutState.cartaoPorEstabelecimento[IdEmpresa]

    var cardData = {
      cardNumber: cartao.Numero.split(' ').join(""),
      holderName: cartao.Titular,
      securityCode: cartao.CVV.trim(),
      expirationMonth: cartao.Validade.split('/')[0],
      expirationYear: cartao.Validade.split('/')[1]
    };

    fazPagamento(cardData, pedido)
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

        {cartState.markets.length > 0 && cartState.markets.map((market, index) => (
          <View>
            {/* TouchableOpacity onPress={() => checkoutDispatch({ type: "setSelectedMarketIndex", payload: { selectedMarketIndex: index } }) */}
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

            <ContentContainer>
              <TouchableOpacity onPress={() => navigation.navigate("Entrega", { IdEmpresa: market.IdEmpresa })}>
                <Box direction="row" justify="space-between" alignItems="center">
                  <Box direction="column" justify="center" alignItems="flex-start">
                    <Typography size="small" color={theme.palette.light}>
                      {checkoutState.horarioEntregaPorEstabelecimento[market.IdEmpresa]?.split('-').length > 0 ? changeHorario(market.IdEmpresa)?.split('-')[0] : "Tipo de entrega"}
                    </Typography>
                    <Typography size="small" color={theme.palette.dark}>
                      {checkoutState.horarioEntregaPorEstabelecimento[market.IdEmpresa]?.split('-').length > 0 ? changeHorario(market.IdEmpresa)?.split('-')[1] : "Horário"}
                    </Typography>
                  </Box>

                  <Typography size="small" color={theme.palette.primary}>
                    Trocar
              </Typography>
                </Box>
              </TouchableOpacity>
            </ContentContainer>
          </View>
        ))}

        {/* Coupons */}
        <TouchableOpacity onPress={() => navigation.navigate('Cupons')}>
          <ContentContainer>
            <View style={styles.couponContainer}>
              <Ionicons name="md-pricetag" size={25} color={cupom ? theme.palette.primary : theme.palette.light} />

              <View style={styles.couponTextContainer}>
                <Typography size="small" color={theme.palette.light}>
                  {cupom ?
                    `${cupom?.NomeCupom} - R$ ${cupom?.Valor.toFixed(2).replace('.', ',')}`
                    : "Selecionar Cupom"
                  }
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

            <View style={styles.paymentMethodContainer}>
              <View style={styles.paymentContainer}>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => selecionaOpcaoCartao("credit")}>
                  <RadioButton selected={selectedPayment === "credit"} />
                  <View>
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
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Pagamentos')}>
                <Typography size="small" color={theme.palette.primary}>
                  Trocar
                </Typography>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => selecionaOpcaoCartao("picpay")}>
              <View style={styles.paymentMethodContainer}>
                <RadioButton selected={selectedPayment === "picpay"} />
                <Typography size="small" color={theme.palette.dark}>
                  Picpay
                </Typography>
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
    </React.Fragment >
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


