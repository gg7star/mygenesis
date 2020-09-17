import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MyOffersTabScreen from './MyOffersTabScreen'
import JobDetailScreen from './JobDetailScreen'

const MyOffersStack = createStackNavigator()

class MyOffersTabNavigator extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <MyOffersStack.Navigator headerMode="none">
        <MyOffersStack.Screen name="MyOffers" component={MyOffersTabScreen} />
        <MyOffersStack.Screen name="JobDetail" component={JobDetailScreen} />
      </MyOffersStack.Navigator>
    );
  }
}

export default MyOffersTabNavigator
