import React, { Component } from 'react'
import {em, WIDTH} from '../common'
import { TouchableOpacity, StatusBar } from "react-native";
import { Actions } from 'react-native-router-flux';

import AccountLayout from '../layouts/AccountLayout'
import HorizontalCenterLayout from '../layouts/HorizontalCenterLayout'
import VerticalCenterFlowLayout from '../layouts/VerticalCenterFlowLayout'

import LogoView from '../components/LogoView'
import RoundButton from '../components/button/RoundButton'
import Separator from '../components/Separator'
import {CommonText, TitleText, SmallText, RoundTextInput} from '../components/text'

class LoginScreen extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
        <AccountLayout>
          <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />
          <LogoView size="small" style={{marginTop: 20 * em}}/>
          <TitleText style={{marginTop: 35 * em, marginBottom: 15 * em}} theme="black">Me connecter</TitleText>

          <VerticalCenterFlowLayout style={{backgroundColor: "#ffffff", borderRadius: 22*em}}>
            <RoundTextInput placeHolder="Email" textContentType="emailAddress" />
            <Separator style={{width: WIDTH * 0.85, backgroundColor: "#f5f6fa"}}/>
            <RoundTextInput placeHolder="Most de passe" secureTextEntry={true} textContentType="password" rightText="OUBLIÉ ?" />
          </VerticalCenterFlowLayout>

          <TouchableOpacity onPress={() => {
            Actions.mainTab()
          }
          }>
            <RoundButton text="Me connecter" rightIcon="next" style={{marginTop: 75 * em}}/>
          </TouchableOpacity>
          <HorizontalCenterLayout style={{marginBottom: 30 * em}}>
            <CommonText theme="gray" style={{marginTop: 25 * em}}>Pas de compte ? </CommonText>
            <TouchableOpacity onPress={() => {
              Actions.subscribe()
            }
            }>
              <CommonText theme="primary" style={{marginTop: 25 * em}}>M'inscrier'</CommonText>
            </TouchableOpacity>
          </HorizontalCenterLayout>
        </AccountLayout>
    );
  }
}

export default LoginScreen
