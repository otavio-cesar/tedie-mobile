import React, { useRef } from 'react'
import { 
  StyleSheet, 
  View, 
  TouchableOpacity
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import BottomSheet from 'reanimated-bottom-sheet'
// theme
import theme from '../theme'
// components
import Navbar from '../components/Navbar'
import Typography from '../components/Typography'
import ScreenContainer from '../components/ScreenContainer'
import ContentContainer from '../components/ContentContainer'
import Divider from '../components/Divider'
import Button from '../components/Button'

const OrderPayments = ({ navigation }) => {
  const bottomSheetRef = useRef(null)

  const openBottomSheet = (ref) => {
    ref.current.snapTo(150);
  }

  const closeBottomSheet = (ref) => {
    ref.current.snapTo(0);
  }

  const BotomSheetContent = ({ sheetRef }) => {
    return (
      <React.Fragment>
        <View style={styles.bottomSheetContainer}>
          <TouchableOpacity hitSlop={theme.hitSlop} onPress={() => closeBottomSheet(sheetRef)}>
            <View style={styles.bottomSheetHeader}>
              <Ionicons name="md-close-circle" size={25} color={theme.palette.light} />
              <Typography size="small" color={theme.palette.light}>
                Fechar
              </Typography>
            </View>
          </TouchableOpacity>
  
          <View style={styles.bottomSheetActions}>
            <TouchableOpacity>
              <View style={styles.bottomSheetItem}>
                <Ionicons name="md-create" size={25} color={theme.palette.primary} />
                <Typography size="small" color={theme.palette.dark}>
                  Editar
                </Typography>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.bottomSheetItem}>
                <Ionicons name="md-trash" size={25} color={theme.palette.primary} /> 
                <Typography size="small" color={theme.palette.dark}>
                  Excluir
                </Typography>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </React.Fragment>
    )
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
            Pagamento
          </Typography>
        }
      />

      <ScreenContainer>
        <Typography size="small" color={theme.palette.dark}>
          Estas são as opções de pagamento para esse estabelecimento
        </Typography>

        <ContentContainer>
          <View style={styles.columnContainer}>
            <Typography size="medium" color={theme.palette.dark}>
              Pagamento pelo TEDIE
            </Typography>

            <Divider />

            <View style={styles.lineSpaceContainer}>
              <View style={styles.columnContainer}>
                <Typography size="small" color={theme.palette.dark}>
                  Cartão de Crédito/Débito
                </Typography>
                <Typography size="caption" color={theme.palette.light}>
                  VISA **** 1234
                </Typography>
              </View>

              <View style={styles.lineContainer}>
                <Ionicons name="md-card" size={25} color={theme.palette.dark} />
                <TouchableOpacity 
                  style={styles.editButton} 
                  hitSlop={styles.slope} 
                  onPress={() => openBottomSheet(bottomSheetRef)}
                >
                  <Ionicons name="md-more" size={25} color={theme.palette.primary} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.lineSpaceContainer}>
              <View style={styles.columnContainer}>
                <Typography size="small" color={theme.palette.dark}>
                  Cartão de Crédito
                </Typography>
                <Typography size="caption" color={theme.palette.light}>
                  MASTERCARD **** 4567 
                </Typography>
              </View>

              <View style={styles.lineContainer}>
                <Ionicons name="md-card" size={25} color={theme.palette.dark} />
                <TouchableOpacity style={styles.editButton}>
                  <Ionicons name="md-more" size={25} color={theme.palette.primary} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.lineSpaceContainer}>
              <View style={styles.columnContainer}>
                <Typography size="small" color={theme.palette.dark}>
                  Cartão de Débito
                </Typography>
                <Typography size="caption" color={theme.palette.light}>
                  VISA **** 1234
                </Typography>
              </View>

              <View style={styles.lineContainer}>
                <Ionicons name="md-card" size={25} color={theme.palette.dark} />
                <TouchableOpacity style={styles.editButton}>
                  <Ionicons name="md-more" size={25} color={theme.palette.primary} />
                </TouchableOpacity>
              </View>
            </View>

            <Button 
              background={theme.palette.primary}
              color="#fff"
              width="100%"
              text="Adicionar Cartão"
              onPress={() => navigation.navigate('Cartão')}
            />
          </View>
        </ContentContainer>

        <ContentContainer>
          <View style={styles.columnContainer}>
            <Typography size="medium" color={theme.palette.dark}>
              Pagamento na Entrega
            </Typography>

            <Divider />

            <View style={styles.lineSpaceContainer}>
              <Typography size="small" color={theme.palette.dark}>
                Cartão de Crédito
              </Typography>
              <Ionicons name="md-card" size={25} color={theme.palette.dark} />
            </View>

            <View style={styles.lineSpaceContainer}>
              <Typography size="small" color={theme.palette.dark}>
                Cartão de Débito
              </Typography>
              <Ionicons name="md-card" size={25} color={theme.palette.dark} />
            </View>

            <View style={styles.lineSpaceContainer}>
              <Typography size="small" color={theme.palette.dark}>
                Dinheiro
              </Typography>
              <Ionicons name="md-cash" size={25} color={theme.palette.dark} />
            </View>
          </View>
        </ContentContainer>
      </ScreenContainer>

      <BottomSheet
        snapPoints = {[0, 1, 150]}
        renderContent = {() => (<BotomSheetContent sheetRef={bottomSheetRef} />)}
        ref={bottomSheetRef}
      />
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  lineContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  lineSpaceContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16
  },
  columnContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  editButton: {
    marginLeft: 16
  },
  slope: { 
    top: 25, 
    left: 25, 
    bottom: 25, 
    right: 25 
  },
  bottomSheetContainer: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 4,
    backgroundColor: '#fff'
  },
  bottomSheetHeader: {
    width: '100%',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
  },
  bottomSheetActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomSheetItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderColor: theme.palette.primary,
    borderWidth: 2,
    borderRadius: 8,
    marginHorizontal: 8
  }
})

export default OrderPayments