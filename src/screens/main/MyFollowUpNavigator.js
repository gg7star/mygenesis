import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MyFollowUpScreen from './MyFollowUpScreen'
import JobDetailScreen from './JobDetailScreen'
import { NavigationContainer } from '@react-navigation/native'

const MyFollowUpStack = createStackNavigator()

class MyFollowUpNavigator extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <NavigationContainer>
        <MyFollowUpStack.Navigator headerMode="none">
          <MyFollowUpStack.Screen name="MyFollowUp" component={MyFollowUpScreen} />
          <MyFollowUpStack.Screen name="JobDetail" component={JobDetailScreen} />
        </MyFollowUpStack.Navigator>
      </NavigationContainer>
    );
  }
}

export default MyFollowUpNavigator
