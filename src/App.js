import React, { Component } from 'react'
import { Router } from 'react-native-router-flux'
import RootRoutes from './routes'
import LoadingScreen from './screens/LoadingScreen'
import HomeScreen from './screens/HomeScreen'
import SubscribeScreen from './screens/SubscribeScreen'
import ConnectionMessageScreen from './screens/ConnectionMessageScreen'
import CoordinatesScreen from './screens/CoordinatesScreen'
import MyCVScreen from './screens/MyCVScreen'
import MainTabScreen from './screens/main/MainTabScreen'
import { StatusBar, View, Text, Image } from "react-native"
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AppView from './screens/AppView'
import { Provider } from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import rootReducer from './slices'

const store = configureStore({reducer: rootReducer})

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      didFinish: true,
    }
  }

  onComplete = () => {
  };

  onFailedLoad = () => {
  };

  render() {
    if (this.state.didFinish) {
      return(
          <Provider store={store}>
            <AppView />
          </Provider>
          // <RootRoutes />
          // <MainTabScreen />
      )
    }else{
      return null;
    }
  }
};

export default App;
