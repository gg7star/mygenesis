import React, { Component } from 'react';
import { Router } from 'react-native-router-flux';
import RootRoutes from './routes';
import LoadingScreen from './screens/LoadingScreen'
import HomeScreen from './screens/HomeScreen'
import SubscribeScreen from './screens/SubscribeScreen'
import ConnectionMessageScreen from './screens/ConnectionMessageScreen'
import CoordinatesScreen from './screens/CoordinatesScreen'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      didFinish: true,
    }
  }

  render() {
    if (this.state.didFinish) {
      return(
          <RootRoutes />
          // <LoadingScreen/>
          // <HomeScreen/>
          // <SubscribeScreen/>
          // <ConnectionMessageScreen/>
          // <CoordinatesScreen/>
      )
    }else{
      return null;
    }
  }
};

export default App;
