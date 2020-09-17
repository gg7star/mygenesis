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
import MyInformationScreen from '../screens/main/MyInformationScreen'
import MyFollowUpScreen from '../screens/main/MyFollowUpScreen'
import MyFollowUpNavigator from '../screens/main/MyFollowUpNavigator'
import MyAvailabilityScreen from '../screens/main/MyAvailabilityScreen'
import ContactUsScreen from '../screens/main/ContactUsScreen'
import AboutScreen from '../screens/main/AboutScreen'
import LegalNoticeScreen from '../screens/main/LegalNoticeScreen'
import CGUScreen from '../screens/main/CGUScreen'
import { NavigationContainer } from '@react-navigation/native'

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
				  <Scene key="myinformation" hideNavBar component={MyInformationScreen} />
				  <Scene key="myfollowup" hideNavBar component={MyFollowUpNavigator} />
				  <Scene key="myavailability" hideNavBar component={MyAvailabilityScreen} />
					<Scene key="contactus" hideNavBar component={ContactUsScreen} />
					<Scene key="aboutmygenesis" hideNavBar component={AboutScreen} />
					<Scene key="legalnotice" hideNavBar component={LegalNoticeScreen} />
					<Scene key="cgu" hideNavBar component={CGUScreen} />
      		</Scene>
			</Router>
		)
	}
}

export default Routes;
