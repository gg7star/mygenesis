import React, { Component } from 'react'
import {em} from '../common'
import { TouchableOpacity, StatusBar } from "react-native";
import { Actions } from 'react-native-router-flux';

import AccountLayout from '../layouts/AccountLayout'
import HorizontalCenterLayout from '../layouts/HorizontalCenterLayout'

import LogoView from '../components/LogoView'
import RoundButton from '../components/button/RoundButton'
import {TitleText, SmallText} from '../components/text'
import {RoundUploadButton, RoundDropDownButton} from '../components/button'
import {AgreeCheckBox, CommonCheckBox} from '../components/checkbox'

class MyCVScreen extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
        <AccountLayout>
          <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />
          <LogoView size="small" style={{marginTop: 20 * em}}/>
          <TitleText style={{marginTop: 35 * em}} theme="black">Mon CV</TitleText>
          <SmallText theme="gray">*Champ obligatoire</SmallText>

          <RoundUploadButton text="Ajouter mon CV" style={{marginTop: 20 * em}} />
          <RoundDropDownButton text="Secteur d'activité*" style={{marginTop: 15 * em}} />
          <RoundDropDownButton text="Métier*" style={{marginTop: 15 * em}} />
          <CommonCheckBox text="J'autorise Genesis-RH à me contacter" style={{marginTop: 15*em}}/>
          <TouchableOpacity onPress={() => {
            Actions.login()
          }
          }>
            <RoundButton text="Enregistrer mes informations" style={{marginTop: 75 * em, marginBottom: 25 * em}}/>
          </TouchableOpacity>
        </AccountLayout>
    );
  }
}

export default MyCVScreen
