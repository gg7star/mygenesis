import React, { Component } from 'react'
import {em} from '../common'
import { TouchableOpacity, StatusBar } from "react-native";
import { Actions } from 'react-native-router-flux';

import AccountLayout from '../layouts/AccountLayout'
import HorizontalCenterLayout from '../layouts/HorizontalCenterLayout'

import LogoView from '../components/LogoView'
import RoundButton from '../components/button/RoundButton'
import {CommonText, TitleText, SmallText, RoundTextInput} from '../components/text'
import {RoundDropDownButton} from '../components/button'

class SubscribeScreen extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
        <AccountLayout>
          <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />
          <LogoView size="small" style={{marginTop: 20 * em}}/>
          <TitleText style={{marginTop: 35 * em}} theme="black">Mes coordonnées</TitleText>
          <SmallText theme="gray">*Champ obligatoire</SmallText>

          <RoundTextInput placeHolder="Code Postale*" textContentType="postalCode" style={{marginTop: 20 * em}} />
          <RoundTextInput placeHolder="Ville*" style={{marginTop: 15 * em}} />
          <RoundTextInput placeHolder="Téléphone*" textContentType="telephoneNumber" style={{marginTop: 15 * em}} />
          <TouchableOpacity onPress={() => {
            Actions.mycv()}
          }>
            <RoundButton text="Continuer" rightIcon="next" style={{marginTop: 15 * em}}/>
          </TouchableOpacity>
        </AccountLayout>
    );
  }
}

export default SubscribeScreen
