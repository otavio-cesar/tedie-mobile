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
import { AppContext } from '../contexts/AppContext'

const Checkout = ({ navigation, route }) => {
  const [selectedPayment, setSelectedPayment] = useState("credit")
  const { state, dispatch } = useContext(AppContext);

  const markets = route.params.markets

  useEffect(() => {
  })

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
                  Entrega
                </Typography>
                <Typography size="small" color={theme.palette.dark}>
                  A partir de 16:30
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
          <TouchableWithoutFeedback onPress={() => navigation.navigate('Localizações')}>
            <View style={styles.locationOuterContainer}>
              <Typography size="caption" color={theme.palette.light}>
                Entregar em
              </Typography>

              <View style={styles.locationContainer}>
                <Ionicons name="md-locate" size={25} color={theme.palette.primary} />

                <View style={styles.locationInfo}>
                  <Typography size="small" color={theme.palette.dark}>
                    Avenida Dona Gertrudes, 100
                  </Typography>
                </View>

                <Ionicons name="ios-arrow-forward" size={25} color={theme.palette.primary} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ContentContainer>
        {/* End Delivery Location */}

        {/* Prices and Totals */}

        {markets.length > 0 && markets.map((market, index) => (
          <TouchableOpacity onPress={() => cartDispatch({ type: "select", payload: market.IdEmpresa })}>
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
                    R$ 526,39
              </Typography>
                </View>

                <View style={styles.priceContainer}>
                  <Typography size="small" color={theme.palette.light}>
                    Entrega
              </Typography>
                  <Typography size="small" color={theme.palette.light}>
                    R$ 10,00
              </Typography>
                </View>

                <Divider />

                <View style={styles.priceContainer}>
                  <Typography size="medium" color={theme.palette.dark}>
                    TOTAL
              </Typography>
                  <Typography size="medium" color={theme.palette.dark}>
                    R$ 536,39
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
                    VISA **** 1234
                  </Typography>
                </View>


                <Typography size="small" color={theme.palette.primary}>
                  Trocar
                </Typography>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setSelectedPayment("credit")}>
              <View style={styles.paymentMethodContainer}>
                <Typography size="small" color={theme.palette.dark}>
                  Crédito
                </Typography>
                <RadioButton selected={selectedPayment === "credit"} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setSelectedPayment("debit")}>
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
          onPress={() => alert("wooohooo")}
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
    alignItems: 'flex-start'
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


