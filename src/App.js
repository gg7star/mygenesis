import React, { Component } from 'react';
import { Router } from 'react-native-router-flux';
import RootRoutes from './routes';
import LoadingScreen from './screens/LoadingScreen'
import HomeScreen from './screens/HomeScreen'
import SubscribeScreen from './screens/SubscribeScreen'
import ConnectionMessageScreen from './screens/ConnectionMessageScreen'
import CoordinatesScreen from './screens/CoordinatesScreen'
import MyCVScreen from './screens/MyCVScreen'
import MainTabScreen from './screens/main/MainTabScreen'
import { StatusBar, View, Text, Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// function Home1Screen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }
//
// function SettingsScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Settings!</Text>
//     </View>
//   );
// }
//
// const Tab = createBottomTabNavigator();
//
// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;
//
//             if (route.name === 'Home') {
//               iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
//             } else if (route.name === 'Settings') {
//               iconName = focused ? 'ios-list-box' : 'ios-list';
//             }
//
//             // You can return any component that you like here!
//             return <Image source={require('./assets/images/logo.png')} style={{width: 48, height: 48}} resizeMode={'stretch'} />;
//           },
//         })}
//         tabBarOptions={{
//           activeTintColor: 'tomato',
//           inactiveTintColor: 'gray',
//         }}
//       >
//         <Tab.Screen name="Home" component={Home1Screen} />
//         <Tab.Screen name="Settings" component={SettingsScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

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
          // <RootRoutes />
          <MainTabScreen />
      )
    }else{
      return null;
    }
  }
};

export default App;
