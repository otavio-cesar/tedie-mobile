import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
// components
import MainNavbar from '../components/MainNavbar'
import ScreenContainer from '../components/ScreenContainer'
import Typography from '../components/Typography'
import CartItem from '../components/CartItem'
import Button from '../components/Button'
import Box from '../components/Box'
import Avatar from '../components/Avatar'
// theme
import theme from '../theme'
import { AppContext } from '../contexts/AppContext'
import { CartContext } from '../contexts/CartContext'
import { getMarketsListByIds } from '../services/market'
import { getProductsAtacadoByCEP } from '../services/products'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Cart = ({ navigation }) => {
  const { cartState, cartDispatch } = useContext(CartContext);
  const { state, dispatch } = useContext(AppContext);

  const [produtosAtacado, setProdutosAtacado] = useState([])

  function getSelectedMarkets() {
    return state.carrinho
      .filter((c, i, v) => v.findIndex((f) => f.product.IdEmpresa == c.product.IdEmpresa) == i)
      .map(c => c.product.IdEmpresa)
  }

  async function carregaCarrinho() {
    const selectedMarkets = getSelectedMarkets()
    getMarketsListByIds(selectedMarkets)
      .then(markets => {
        const action = { type: "setMarkets", payload: { markets: markets } }
        cartDispatch(action);
      })
  }

  async function calculaTotalCompraPorEstabelecimento() {
    const selectedMarkets = getSelectedMarkets()
    let est = []
    let valParc
    selectedMarkets.forEach(s => {
      valParc = state.carrinho.filter(c => c.product.IdEmpresa == s).reduce((acc, v) => {
        return acc + calculaValorItem(v.product.Id, v.quantity)
      }, 0)
      est[`"${s}"`] = valParc
    })
    const action = { type: "setTotalComprasPorEstabelecimento", payload: { totalComprasPorEstabelecimento: est } }
    cartDispatch(action);
  }

  async function calculaTotalCompras() {
    const valorCompra = state.carrinho.reduce((acc, v) => {
      return acc + calculaValorItem(v.product.Id, v.quantity)
    }, 0)
    const action = { type: "setTotalCompras", payload: { totalCompras: valorCompra } }
    cartDispatch(action);
  }

  async function loadProdutosAtacado() {
    if (!produtosAtacado || produtosAtacado.length == 0) {
      const pa = await getProductsAtacadoByCEP(state.address.CEP)
      setProdutosAtacado(pa)
    }
  }

  useEffect(() => {
    if (!produtosAtacado || produtosAtacado.length == 0) {
      loadProdutosAtacado()
      return
    }
    carregaCarrinho()
    calculaTotalCompras()
    calculaTotalCompraPorEstabelecimento()
  }, [state.carrinho, produtosAtacado])

  async function handleSelectMarket(market) {
    const action = { type: "select", payload: { IdEmpresa: market.IdEmpresa, Nome: market.Nome } }
    cartDispatch(action);
  }

  function calculaValorItem(idProduto, quantity) {
    let valor = 0;
    if (produtosAtacado.length == 0) return
    let pAtacado = produtosAtacado
      .filter(p => p.Id == idProduto)
      .filter(p => p.Qtde_Inicial <= quantity && p.Qtde_Final >= quantity)[0]
    if (!pAtacado) {
      const pMaior = produtosAtacado.reduce((acc, v) => {
        if (v.Qtde_Final > acc.Qtde_Final) return v
        return acc
      });
      if (quantity >= pMaior.Qtde_Final)
        pAtacado = pMaior
      else {
        const pMenor = produtosAtacado.reduce((acc, v) => {
          if (v.Qtde_Inicial <= acc.Qtde_Inicial) return v
          return acc
        });
        pAtacado = pMenor
      }
    }
    valor = quantity * pAtacado.Preco_De
    return valor;
  }

  return (
    <React.Fragment>
      <MainNavbar navigation={navigation} />
      <View style={styles.cartsContainer}>
        <Box direction="row" justify="flex-start" alignItems="center">
          <Typography size="medium" color={theme.palette.dark}>
            Meus Carrinhos
          </Typography>
        </Box>

        <ScrollView
          contentContainerStyle={styles.cartsList}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {cartState.markets.length > 0 && cartState.markets.map((market, index) => (
            <TouchableOpacity onPress={() => handleSelectMarket(market)}>
              <Avatar
                image={market.Logo}
                key={index + "-" + market.IdEmpresa}
                styles={styles.cartImage}
                size={60}
                color={theme.palette.secondary}
                selected={(cartState.selected ? cartState.selected : cartState.markets[0].IdEmpresa) == market.IdEmpresa ? true : false}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScreenContainer>
        <View style={styles.container}>
          <Typography size="medium" color="#000">
            {cartState.markets.length > 0 && (cartState.selectedNome ? cartState.selectedNome : cartState.markets[0].Nome)}
          </Typography>
          {cartState.markets.length > 0 && state.carrinho
            .filter(market => market.product.IdEmpresa == (cartState.selected ? cartState.selected : cartState.markets[0].IdEmpresa))
            .map((cartItem, index) => (
              <>
                <CartItem
                  key={index + "-" + cartItem.product.IdEmpresa}
                  cartItem={cartItem}
                  valorCalculado={calculaValorItem(cartItem.product.Id, cartItem.quantity)} />
              </>
            ))}
        </View>
      </ScreenContainer>

      <View style={styles.bottomContainer}>
        <Typography size="small" color="#000">
          {/* Total soma  {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
            .format(cartState.totalCompras)} */}
             Total soma R$ {Number.parseFloat(cartState.totalCompras).toFixed(2).replace('.', ',')}
        </Typography>

        <Button
          background={theme.palette.secondary}
          color={theme.palette.primary}
          width="50%"
          text="Checkout"
          onPress={() => navigation.navigate('Checkout')}
        />
      </View>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 96
  },

  bottomContainer: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0
  },

  cartsContainer: {
    paddingTop: 8
  },
  cartsList: {
    height: 65,
    flexDirection: 'row',
    paddingLeft: 16,
    marginVertical: 8
  },
  cartImage: {
    marginRight: 8
  }
})

export default Cart
