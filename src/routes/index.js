import React, { Component } from 'react'
import { Router, Scene} from 'react-native-router-flux'
import LoadingScreen from '../screens/LoadingScreen'
import HomeScreen from '../screens/HomeScreen'
import SubscribeScreen from '../screens/SubscribeScreen'
import ConnectionMessageScreen from '../screens/ConnectionMessageScreen'
import CoordinatesScreen from '../screens/CoordinatesScreen'

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
      		</Scene>
			</Router>
		)
	}
}

export default Routes;
