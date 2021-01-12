import React, { useState } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import PropTypes from 'prop-types';
import { Hoshi } from 'react-native-textinput-effects'
// theme 
import theme from '../theme'

const TextField = ({ width, label, labelColor, borderColor, backgroundColor, keyboardType, returnKeyType, onEndEditing, useContainerWidth, value }) => {
  const propWidth = width ? Number.parseInt(width.replace('%', '')) : null
  const fieldWidth = width ? ((Dimensions.get('window').width * (propWidth / 100)) - 20) : null
  const windowSizeWidth = (Dimensions.get('window').width - 24)

  const [inputValue, setInputValue] = useState(value)

  return (
    <Hoshi
      style={[
        styles.input,
        { width: useContainerWidth ? '100%' : (width ? fieldWidth : windowSizeWidth) }
      ]}
      label={label}
      labelStyle={[styles.label, { color: labelColor ? labelColor : theme.palette.dark }]}
      borderColor={borderColor ? borderColor : theme.palette.primary}
      borderHeight={3}
      backgroundColor={backgroundColor}
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
      onEndEditing={onEndEditing}
      value={inputValue}
      onChange={(value) => setInputValue(value)}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    alignSelf: 'center',
    margin: 8
  },
  label: {
    fontWeight: 'bold'
  }
})

TextField.propTypes = { 
  width: PropTypes.string,
  label: PropTypes.string.isRequired, 
  backgroundColor: PropTypes.string, 
  keyboardType: PropTypes.string, 
  returnKeyType: PropTypes.string, 
  onEndEditing: PropTypes.func,
  value: PropTypes.string
}

export default TextField
