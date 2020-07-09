import React, { Component } from 'react'
import {em} from '../common'

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
          <TitleText style={{marginTop: 35 * em}} theme="black">Mes coordonnées</TitleText>
          <SmallText theme="gray">*Champ obligatoire</SmallText>

          <RoundTextInput placeHolder="Code Postale*" textContentType="postalCode" style={{marginTop: 20 * em}} />
          <RoundTextInput placeHolder="Ville*" style={{marginTop: 15 * em}} />
          <RoundTextInput placeHolder="Téléphone*" textContentType="telephoneNumber" style={{marginTop: 15 * em}} />
          <RoundButton text="Continuer" rightIcon="next" style={{marginTop: 15 * em}}/>
        </AccountLayout>
    );
  }
}

export default SubscribeScreen
