import React, { Component } from 'react'
import {em} from '../common'
import { TouchableOpacity, StatusBar } from "react-native"
import { Actions } from 'react-native-router-flux'

import AccountLayout from '../layouts/AccountLayout'
import HorizontalCenterLayout from '../layouts/HorizontalCenterLayout'
import {validateEmail} from '../utils/Validators'
import {showRootToast} from '../utils/misc'

import LogoView from '../components/LogoView'
import RoundButton from '../components/button/RoundButton'
import {CommonText, TitleText, SmallText, RoundTextInput} from '../components/text'
import {RoundDropDownButton} from '../components/button'

class SubscribeScreen extends Component {
  constructor(props){
    super(props)

    this.state = {
      email: "",
      password: "",
      showPassword: false,
    }
  }

  handleContinue = () => {
    const {email, password} = this.state
    const {civility, firstName, lastName} = this.props

    if (!validateEmail(email)) {
      showRootToast('Merci de mettre un email valide')
      return
    }

    if (password == ""){
      showRootToast('Merci de mettre votre mot de passe')
      return
    }
    Actions.coorindates({email, password, civility, firstName, lastName})
  }

  togglePasswordShow = () => {
    console.log("Press Right Text")
    const {showPassword} = this.state
    this.setState({showPassword: !showPassword})
  }

  render() {
    const {email, password, showPassword} = this.state
    let passwordShowButtonText = "VOIR"
    let textContentType = "password"
    if (showPassword) {
      passwordShowButtonText = "CACHER"
      textContentType = "none"
    }
    return (
      <AccountLayout style={{paddingLeft: '5%', paddingRight: '5%'}}>
        <StatusBar
          barstyle="dark-content"
          translucent
          backgroundColor="transparent"
        />
        <LogoView size="small" style={{marginTop: 20 * em}} />
        <TitleText style={{marginTop: 35 * em}} theme="black">
          Mes données de connexion
        </TitleText>

        <RoundTextInput
          placeHolder="Email"
          textContentType="emailAddress"
          style={{marginTop: 15 * em, width: '100%'}}
          value={email}
          handleChange={text => this.setState({email: text})}
        />
        <RoundTextInput
          placeHolder="Mot de passe"
          secureTextEntry={!showPassword}
          onPressRightText={this.togglePasswordShow}
          textContentType={textContentType}
          rightText={passwordShowButtonText}
          style={{marginTop: 15 * em, width: '100%'}}
          value={password}
          handleChange={text => this.setState({password: text})}
        />
        <TouchableOpacity style={{width: '100%'}} onPress={this.handleContinue}>
          <RoundButton
            text="Continuer"
            rightIcon="next"
            style={{marginTop: 75 * em}}
          />
        </TouchableOpacity>
      </AccountLayout>
    );
  }
}

export default SubscribeScreen
