import React, { Component } from 'react'
import {em, WIDTH, HEIGHT} from '../../common'
import { TouchableOpacity, StatusBar, Image } from "react-native"

import VerticalCenterFlowLayout from '../../layouts/VerticalCenterFlowLayout'
import VerticalCenterLayout from '../../layouts/VerticalCenterLayout'

import LogoView from '../../components/LogoView'
import RoundButton from '../../components/button/RoundButton'
import {MediumRegularText, TitleText} from '../../components/text'
import {RoundDropDownButton} from '../../components/button'
import {AgreeCheckBox} from '../../components/checkbox'
import JobMetaAdapter from '../../components/custom/JobMetaAdapter'

class CompleteTabScreen extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
        <VerticalCenterFlowLayout style={{backgroundColor: "#f5f6fa", height: "100%"}}>
          <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />
          <TitleText style={{marginTop: 35 * em, marginBottom: 10 * em}} theme="black">Mon Compte</TitleText>
          <VerticalCenterLayout style={{height: HEIGHT - 130 * em, marginBottom: 120 * em}}>
            <Image source={require('../../assets/images/ic_user.png')} style={{width: 80 * em, height: 80 * em, marginBottom: 35 * em}} resizeMode={'stretch'} />
            <MediumRegularText theme="gray">Vous ñ'êtes pas connecté.</MediumRegularText>
            <MediumRegularText theme="gray">Connectez-vous pour pouvoir acceder a votre </MediumRegularText>
            <MediumRegularText theme="gray">compte.</MediumRegularText>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate("CompleteDetail")
            }
            }>
              <RoundButton text="Me connecter" rightIcon="next" style={{marginTop: 20 * em}}/>
            </TouchableOpacity>
          </VerticalCenterLayout>
        </VerticalCenterFlowLayout>
    );
  }
}

export default CompleteTabScreen
