import React, { useState } from 'react'
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

const DeliveryType = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState(0)

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
        <ContentContainer>
          <Box direction="column" justify="center" alignContent="flex-start">
            <Typography size="large" color={theme.palette.dark}>
              Entrega
            </Typography>

            <Divider />

            <TouchableOpacity onPress={() => setSelectedType(0)}>
              <Box direction="row" justify="space-between" alignItems="center" fullwidth> 
                <Typography size="small" color={theme.palette.light}>
                  Das 13:00 às 15:00
                </Typography>
                <RadioButton selected={selectedType === 0} />
              </Box>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedType(1)}>
              <Box direction="row" justify="space-between" alignItems="center" fullwidth> 
                <Typography size="small" color={theme.palette.light}>
                  Das 16:00 às 18:00
                </Typography>
                <RadioButton selected={selectedType === 1} />
              </Box>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedType(2)}>
              <Box direction="row" justify="space-between" alignItems="center" fullwidth> 
                <Typography size="small" color={theme.palette.light}>
                  Das 19:00 às 20:30
                </Typography>
                <RadioButton selected={selectedType === 2} />
              </Box>
            </TouchableOpacity>
          </Box>
        </ContentContainer>
        
        <ContentContainer>
          <Box direction="column" justify="center" alignItems="flex-start">
            <Typography size="large" color={theme.palette.dark}>
              Retirada
            </Typography>

            <Divider />

            <TouchableOpacity onPress={() => setSelectedType(3)}>
              <Box direction="row" justify="space-between" alignItems="center" fullwidth> 
                <Typography size="small" color={theme.palette.light}>
                  Das 13:00 às 15:00
                </Typography>
                <RadioButton selected={selectedType === 3} />
              </Box>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedType(4)}>
              <Box direction="row" justify="space-between" alignItems="center" fullwidth> 
                <Typography size="small" color={theme.palette.light}>
                  Das 19:00 às 20:30
                </Typography>
                <RadioButton selected={selectedType === 4} />
              </Box>
            </TouchableOpacity>
          </Box>
        </ContentContainer>
      </ScreenContainer>
    </React.Fragment>
  )
}

export default DeliveryType
