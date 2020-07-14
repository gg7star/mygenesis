import React, { Component } from 'react'
import { Router, Scene} from 'react-native-router-flux'
import LoadingScreen from '../screens/LoadingScreen'
import HomeScreen from '../screens/HomeScreen'
import SubscribeScreen from '../screens/SubscribeScreen'
import ConnectionMessageScreen from '../screens/ConnectionMessageScreen'
import CoordinatesScreen from '../screens/CoordinatesScreen'
import MyCVScreen from '../screens/MyCVScreen'
import LoginScreen from '../screens/LoginScreen'
import MainTabScreen from '../screens/main/MainTabScreen'

class Routes extends Component {
	render() {
		return (
			<Router>
      		<Scene key="root">
				  <Scene key="loading" hideNavBar component={LoadingScreen} />
				  <Scene key="home" hideNavBar component={HomeScreen} />
				  <Scene key="subscribe" hideNavBar component={SubscribeScreen} />
				  <Scene key="connectionMessage" hideNavBar component={ConnectionMessageScreen} />
				  <Scene key="coorindates" hideNavBar component={CoordinatesScreen} />
				  <Scene key="mycv" hideNavBar component={MyCVScreen} />
				  <Scene key="login" hideNavBar component={LoginScreen} />
				  <Scene key="mainTab" hideNavBar component={MainTabScreen} />
      		</Scene>
			</Router>
		)
	}
}

export default Routes;
