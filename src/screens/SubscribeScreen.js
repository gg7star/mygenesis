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
          <TitleText style={{marginTop: 35 * em}} theme="black">M'inscrier</TitleText>
          <SmallText theme="gray">*Champ obligatoire</SmallText>

          <RoundDropDownButton text="Civilité" style={{marginTop: 20 * em}} />
          <RoundTextInput placeHolder="Nom*" textContentType="familyName" style={{marginTop: 15 * em}} />
          <RoundTextInput placeHolder="Prenom*"textContentType="givenName"  style={{marginTop: 15 * em}} />
          <TouchableOpacity onPress={() => {
            Actions.connectionMessage()}
          }>
            <RoundButton text="Continuer" rightIcon="next" style={{marginTop: 15 * em}}/>
          </TouchableOpacity>
          <AgreeCheckBox style={{marginTop: 15*em}}/>
          <HorizontalCenterLayout style={{marginBottom: 30 * em}}>
            <CommonText theme="gray" style={{marginTop: 25 * em}}>Déjà un compte ? </CommonText>
            <CommonText theme="primary" style={{marginTop: 25 * em}}>Me connecter</CommonText>
          </HorizontalCenterLayout>
        </AccountLayout>
    );
  }
}

export default SubscribeScreen
