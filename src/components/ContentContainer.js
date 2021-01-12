import React from 'react'
import { View, StyleSheet } from 'react-native'

const ContentContainer = ({ children, background }) => {
  return (
    <View style={styles.container}>
      { children }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginVertical: 8,
    padding: 16,
    elevation: 2,
    borderRadius: 8
  }
})

export default ContentContainer
