import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
// components
import MainNavbar from '../components/MainNavbar'
import ScreenContainer from '../components/ScreenContainer'
import ContentContainer from '../components/ContentContainer'
import Typography from '../components/Typography'
// theme
import theme from '../theme'

const Account = ({ navigation }) => {
  return (
    <React.Fragment>
      <MainNavbar />

      <ScreenContainer>
        {/* Profile data */}
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
          <ContentContainer>
            <View style={styles.optionContainer}>
              <View style={styles.optionTextAndIcon}>
                <Ionicons name="md-person" size={25} color={theme.palette.dark} />

                <View style={styles.optionTextContainer}>
                  <Typography size="medium" color={theme.palette.dark}>
                    Perfil
                  </Typography>
                  <Typography size="caption" color={theme.palette.light}>
                    Meus dados pessoais
                  </Typography>
                </View>
              </View>

              <Ionicons name="ios-arrow-forward" size={25} color={theme.palette.light} />
            </View>
          </ContentContainer>
        </TouchableOpacity>
        {/* End Profile data */}

        {/* Indication data */}
        <TouchableOpacity onPress={() => navigation.navigate('Indicação')}>
          <ContentContainer>
            <View style={styles.optionContainer}>
              <View style={styles.optionTextAndIcon}>
                <Ionicons name="md-gift" size={25} color={theme.palette.dark} />

                <View style={styles.optionTextContainer}>
                  <Typography size="medium" color={theme.palette.dark}>
                    Indicação
                  </Typography>
                  <Typography size="caption" color={theme.palette.light}>
                    Indique e ganhe benefícios!
                  </Typography>
                </View>
              </View>

              <Ionicons name="ios-arrow-forward" size={25} color={theme.palette.light} />
            </View>
          </ContentContainer>
        </TouchableOpacity>
        {/* End Indication data */}

        {/* Orders */}
        <TouchableOpacity onPress={() => navigation.navigate('Pedidos')}>
          <ContentContainer>  
              <View style={styles.optionContainer}>
                <View style={styles.optionTextAndIcon}>
                  <Ionicons name="ios-list-box" size={25} color={theme.palette.dark} />

                  <View style={styles.optionTextContainer}>
                    <Typography size="medium" color={theme.palette.dark}>
                      Pedidos
                    </Typography>
                    <Typography size="caption" color={theme.palette.light}>
                      Meu histórico de pedidos
                    </Typography>
                  </View>
                </View>

                <Ionicons name="ios-arrow-forward" size={25} color={theme.palette.light} />
              </View>
          </ContentContainer>
        </TouchableOpacity>
        {/* End orders */}

        {/* Notifications */}
        <ContentContainer>
          <View style={styles.optionContainer}>
            <View style={styles.optionTextAndIcon}>
              <Ionicons name="md-notifications" size={25} color={theme.palette.dark} />

              <View style={styles.optionTextContainer}>
                <Typography size="medium" color={theme.palette.dark}>
                  Notificações
                </Typography>
                <Typography size="caption" color={theme.palette.light}>
                  Minhas notificações recebidas
                </Typography>
              </View>
            </View>

            <Ionicons name="ios-arrow-forward" size={25} color={theme.palette.light} />
          </View>
        </ContentContainer>
        {/* End notifications */}

        {/* Coupons */}
        <TouchableOpacity onPress={() => navigation.navigate('Cupons')}>
          <ContentContainer>
            <View style={styles.optionContainer}>
              <View style={styles.optionTextAndIcon}>
                <Ionicons name="md-pricetag" size={25} color={theme.palette.dark} />

                <View style={styles.optionTextContainer}>
                  <Typography size="medium" color={theme.palette.dark}>
                    Cupons
                  </Typography>
                  <Typography size="caption" color={theme.palette.light}>
                    Meus cupons de desconto
                  </Typography>
                </View>
              </View>

              <Ionicons name="ios-arrow-forward" size={25} color={theme.palette.light} />
            </View>
          </ContentContainer>
        </TouchableOpacity>
        {/* End coupons */}

        {/* Locations */}
        <TouchableOpacity onPress={() => navigation.navigate('Localização')}>
          <ContentContainer>
            <View style={styles.optionContainer}>
              <View style={styles.optionTextAndIcon}>
                <Ionicons name="md-pin" size={25} color={theme.palette.dark} />

                <View style={styles.optionTextContainer}>
                  <Typography size="medium" color={theme.palette.dark}>
                    Endereços
                  </Typography>
                  <Typography size="caption" color={theme.palette.light}>
                    Meus locais para entrega
                  </Typography>
                </View>
              </View>

              <Ionicons name="ios-arrow-forward" size={25} color={theme.palette.light} />
            </View>
          </ContentContainer>
        </TouchableOpacity>
        {/* End Locations */}

        {/* Locations */}
        <TouchableOpacity onPress={() => navigation.navigate('Pagamento')}>
          <ContentContainer>
            <View style={styles.optionContainer}>
              <View style={styles.optionTextAndIcon}>
                <Ionicons name="md-card" size={25} color={theme.palette.dark} />

                <View style={styles.optionTextContainer}>
                  <Typography size="medium" color={theme.palette.dark}>
                    Pagamento
                  </Typography>
                  <Typography size="caption" color={theme.palette.light}>
                    Meus métodos de pagamento
                  </Typography>
                </View>
              </View>

              <Ionicons name="ios-arrow-forward" size={25} color={theme.palette.light} />
            </View>
          </ContentContainer>
        </TouchableOpacity>
        {/* End Locations */}

        {/* Locations */}
        <TouchableOpacity onPress={() => navigation.navigate('Tickets')}>
          <ContentContainer>
            <View style={styles.optionContainer}>
              <View style={styles.optionTextAndIcon}>
                <Ionicons name="md-chatboxes" size={25} color={theme.palette.dark} />

                <View style={styles.optionTextContainer}>
                  <Typography size="medium" color={theme.palette.dark}>
                    Atendimento
                  </Typography>
                  <Typography size="caption" color={theme.palette.light}>
                    Minhas conversas com estabelecimento
                  </Typography>
                </View>
              </View>

              <Ionicons name="ios-arrow-forward" size={25} color={theme.palette.light} />
            </View>
          </ContentContainer>
        </TouchableOpacity>
        {/* End Locations */}

        {/* Locations */}
        <TouchableOpacity onPress={() => navigation.navigate('Ajuda')}>
          <ContentContainer>
            <View style={styles.optionContainer}>
              <View style={styles.optionTextAndIcon}>
                <Ionicons name="md-help-circle" size={25} color={theme.palette.dark} />

                <View style={styles.optionTextContainer}>
                  <Typography size="medium" color={theme.palette.dark}>
                    Ajuda
                  </Typography>
                  <Typography size="caption" color={theme.palette.light}>
                    Perguntas frequentes
                  </Typography>
                </View>
              </View>

              <Ionicons name="ios-arrow-forward" size={25} color={theme.palette.light} />
            </View>
          </ContentContainer>
        </TouchableOpacity>
        {/* End Locations */}
      </ScreenContainer>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8
  },
  optionTextAndIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 8
  }
})

export default Account
