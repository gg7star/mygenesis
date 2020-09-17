import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeTabScreen from './HomeTabScreen'
import JobDetailScreen from './JobDetailScreen'

const HomeStack = createStackNavigator()

class HomeTabNavigator extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <HomeStack.Navigator headerMode="none">
        <HomeStack.Screen name="Home" component={HomeTabScreen} />
        <HomeStack.Screen name="JobDetail" component={JobDetailScreen} />
      </HomeStack.Navigator>
    );
  }
}

export default HomeTabNavigator
