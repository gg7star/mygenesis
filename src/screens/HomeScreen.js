import React, { Component } from 'react'
import {em} from '../common'
import { TouchableHighlight } from "react-native";
import { Actions } from 'react-native-router-flux';

import VerticalJustifyLayout from '../layouts/VerticalJustifyLayout'
import VerticalCenterLayout from '../layouts/VerticalCenterLayout'
import LogoView from '../components/LogoView'
import RoundButton from '../components/RoundButton'
import {CommonText} from '../components/text'

class HomeScreen extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <VerticalJustifyLayout source={require('../assets/images/bg_home.jpg')}>
        <LogoView size="small" textShow = "false"/>

        <VerticalCenterLayout>
            <RoundButton text="Me connecter" theme="negative"/>
            <TouchableHighlight onPress={() => {
              Actions.subscribe()}
            }>
              <RoundButton text="M'inscrier" style={{marginTop: 10 * em}}/>
            </TouchableHighlight>
            <CommonText style={{marginTop: 20 * em, marginBottom: 20 * em}}>Consulter les offres sans m'inscrier</CommonText>
        </VerticalCenterLayout>
      </VerticalJustifyLayout>
    );
  }
}

export default HomeScreen
