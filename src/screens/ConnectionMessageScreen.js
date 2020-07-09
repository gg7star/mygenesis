import React, { Component } from 'react'
import {em} from '../common'
import { TouchableOpacity } from "react-native";
import { Actions } from 'react-native-router-flux';

import AccountLayout from '../layouts/AccountLayout'
import HorizontalCenterLayout from '../layouts/HorizontalCenterLayout'

import LogoView from '../components/LogoView'
import RoundButton from '../components/RoundButton'
import {CommonText, TitleText, SmallText, RoundTextInput} from '../components/text'
import {RoundDropDownButton} from '../components/button'
import AgreeCheckBox from '../components/AgreeCheckBox'

class SubscribeScreen extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
        <AccountLayout>
          <LogoView size="small"/>
          <TitleText style={{marginTop: 35 * em}} theme="black">Mess données de connexion</TitleText>

          <RoundTextInput placeHolder="Email" textContentType="emailAddress" style={{marginTop: 15 * em}} />
          <RoundTextInput placeHolder="Mot de passe" secureTextEntry={true} textContentType="password"  style={{marginTop: 15 * em}} />
          <TouchableOpacity onPress={() => {
            Actions.coorindates()}
          }>
            <RoundButton text="Continuer" rightIcon="next" style={{marginTop: 75 * em}}/>
          </TouchableOpacity>
        </AccountLayout>
    );
  }
}

export default SubscribeScreen
