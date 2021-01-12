import React, { useState, useCallback, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
// components
import theme from '../theme'
import Navbar from '../components/Navbar'
import ScreenContainer from '../components/ScreenContainer'
import Typography from '../components/Typography'
import CouponItem from '../components/CouponItem'
// services
import { getCoupons } from '../services/coupons'

const Coupons = ({ navigation }) => {
  const [couponsLoader, setCouponsLoader] = useState(false)
  const [coupons, setCoupons] = useState([])

  const loadCoupons = useCallback(async () => {
    setCouponsLoader(true)

    const couponsResponse = await getCoupons()
    setCoupons(couponsResponse)

    setCouponsLoader(false)
  }, [setCouponsLoader,setCoupons, getCoupons])

  useEffect(() => {
    loadCoupons()
  }, [loadCoupons])

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
            Cupons
          </Typography>
        }
      />

      <ScreenContainer>
        {coupons.length > 0 && !couponsLoader 
          && coupons.map(coupon => (
            <CouponItem 
              key={coupon.IdCupom}
              coupon={coupon} 
            />
          )
        )}
      </ScreenContainer>
    </React.Fragment>
  )
}

export default Coupons