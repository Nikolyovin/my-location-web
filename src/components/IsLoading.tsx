import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React from 'react'

const IsLoading = () => {
  return (
    <View style = { styles.wrapper }>
      <ActivityIndicator size="large" color="#00c68f" />
    </View>
  )
}

export default IsLoading

const styles = StyleSheet.create({
    wrapper: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})