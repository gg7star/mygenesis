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
    }
  }

  handleContinue = () => {
    const {email, password} = this.state
    const {civility, firstName, lastName} = this.props

    if (!validateEmail(email)) {
      showRootToast('Please enter valid email address')
      return
    }

    if (password == ""){
      showRootToast('Please enter your password')
      return
    }
    Actions.coorindates({email, password, civility, firstName, lastName})
  }

  render() {
    const {email, password} = this.state
    return (
        <AccountLayout>
          <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />
          <LogoView size="small" style={{marginTop: 20 * em}}/>
          <TitleText style={{marginTop: 35 * em}} theme="black">Mess données de connexion</TitleText>

          <RoundTextInput placeHolder="Email" textContentType="emailAddress" style={{marginTop: 15 * em}}
            value={email} handleChange={(text)=>this.setState({email:text})} />
          <RoundTextInput placeHolder="Mot de passe" secureTextEntry={true}
            textContentType="password" rightText="VOIR" style={{marginTop: 15 * em}}
            value={password} handleChange={(text)=>this.setState({password:text})} />
          <TouchableOpacity onPress={this.handleContinue.bind(this)}>
            <RoundButton text="Continuer" rightIcon="next" style={{marginTop: 75 * em}}/>
          </TouchableOpacity>
        </AccountLayout>
    );
  }
}

export default SubscribeScreen
