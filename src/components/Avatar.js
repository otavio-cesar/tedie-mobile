import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import PropTypes from 'prop-types'
// theme
import theme from '../theme'

const Avatar = ({ image, size, color, styles, selected }) => {
  return (
    <React.Fragment>
      {image && (
        <Image   
          style={[
            customStyles.avatar, 
            { width: size, height: size, backgroundColor: color }, 
            styles,
            selected ? customStyles.selected : null
          ]}
          source={{
            uri: image,
          }}  
          resizeMode="contain"
          // source={{ image }}
        />
      )}

      {!image && (
        <View
          style={[
            customStyles.avatar, 
            { width: size, height: size, backgroundColor: color }, 
            styles,
            selected ? customStyles.selected : null
          ]}
        />
      )}
    </React.Fragment>
  )
}

const customStyles = StyleSheet.create({
  avatar: {
    borderRadius: 100
  },
  selected: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: theme.palette.primary
  }
})

Avatar.propTypes = {
  image: PropTypes.func,
  size: PropTypes.number,
  color: PropTypes.string
}

export default Avatar
