import React, { Component } from 'react'
import {WIDTH, HEIGHT, em} from '../common'
import { TouchableOpacity, StatusBar, Linking } from "react-native";
import { Actions } from 'react-native-router-flux';

import VerticalJustifyLayout from '../layouts/VerticalJustifyLayout'
import VerticalCenterLayout from '../layouts/VerticalCenterLayout'
import LogoView from '../components/LogoView'
import RoundButton from '../components/button/RoundButton'
import {CommonText} from '../components/text'

class HomeScreen extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <VerticalJustifyLayout source={require('../assets/images/bg_home.jpg')}>
        <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />
        <LogoView size="small" textShow = "false" style={{marginTop: 20 * em}}/>

        <VerticalCenterLayout style={{paddingLeft: '10%', paddingRight: '10%', width: '100%'}}>
          <TouchableOpacity
            style={{width: '100%'}}
            onPressIn={() => {Actions.login()}}>
            <RoundButton text="Me connecter" theme="negative" style={{width: '100%'}} />
          </TouchableOpacity>
          <TouchableOpacity style={{width: '100%'}} onPress={() => {Actions.subscribe()}}>
            <RoundButton text="M'inscrire" style={{marginTop: 10 * em, width: '100%'}}/>
          </TouchableOpacity>
          <TouchableOpacity
            // style={{width: '100%'}}
            onPress={() => {
              Linking.openURL('https://genesis.softy.pro')
          }}>
            <CommonText style={{marginTop: 20 * em, marginBottom: 20 * em}}>
              Consulter les offres sans m'inscrire
            </CommonText>
          </TouchableOpacity>
        </VerticalCenterLayout>
      </VerticalJustifyLayout>
    );
  }
}

export default HomeScreen
