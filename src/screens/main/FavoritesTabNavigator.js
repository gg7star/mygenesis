import React, { Component, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import FavoritesTabScreen from './FavoritesTabScreen'
import JobDetailScreen from './JobDetailScreen'

const FavoritesStack = createStackNavigator()

function FavoritesTabNavigator({navigation}) {
  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('tabPress', e => {
  //     Prevent default behavior
  //     e.preventDefault()
  //
  //     alert('Default behavior prevented')
  //   })
  //
  //   return unsubscribe
  // }, [navigation])

  return (
    <FavoritesStack.Navigator headerMode="none">
      <FavoritesStack.Screen name="Favorites" component={FavoritesTabScreen} />
      <FavoritesStack.Screen name="JobDetail" component={JobDetailScreen} />
    </FavoritesStack.Navigator>
  )
}

export default FavoritesTabNavigator
