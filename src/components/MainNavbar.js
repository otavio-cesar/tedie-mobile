import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
// components
import Avatar from './Avatar'
import Typography from './Typography'
import Navbar from './Navbar'
// theme
import theme from '../theme'

const MainNavbar = () => {
  return (
    <Navbar
      left={
        <React.Fragment>
          <Avatar 
            size={35} 
            color={theme.palette.secondary} 
          />
          <Typography size="medium" color="#fff">
            TEDIE
          </Typography>
        </React.Fragment>
      }

      right={
        <React.Fragment>
          <TouchableOpacity 
            style={styles.navbarButton}
            hitSlop={theme.hitSlop}  
          >
            <Ionicons name="md-pin" size={30} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.navbarButton}
            hitSlop={theme.hitSlop}
          >
            <Ionicons name="md-search" size={30} color="#fff" />
          </TouchableOpacity>
        </React.Fragment>
      }
    />
  )
}

const styles = StyleSheet.create({
  navbarButton: {
    marginHorizontal: 8
  }
})

export default MainNavbar
