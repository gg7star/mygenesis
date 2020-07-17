import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SearchTabMainScreen from './SearchTabMainScreen'
import SearchTabResultScreen from './SearchTabResultScreen'
import SearchTabDetailScreen from './SearchTabDetailScreen'

const SearchStack = createStackNavigator();

class SearchTabNavigator extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <SearchStack.Navigator headerMode="none">
        <SearchStack.Screen name="SearchMain" component={SearchTabMainScreen} />
        <SearchStack.Screen name="SearchResult" component={SearchTabResultScreen} />
        <SearchStack.Screen name="SearchDetail" component={SearchTabDetailScreen} />
      </SearchStack.Navigator>
    );
  }
}

export default SearchTabNavigator
