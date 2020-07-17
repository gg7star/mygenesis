import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import CompleteTabScreen from './CompleteTabScreen'
import CompleteTabDetailScreen from './CompleteTabDetailScreen'

const CompleteStack = createStackNavigator();

class CompleteTabNavigator extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <CompleteStack.Navigator headerMode="none">
        <CompleteStack.Screen name="CompleteMain" component={CompleteTabScreen} />
        <CompleteStack.Screen name="CompleteDetail" component={CompleteTabDetailScreen} />
      </CompleteStack.Navigator>
    );
  }
}

export default CompleteTabNavigator
