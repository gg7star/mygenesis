import React, { Component } from 'react'
import {em} from '../common'
import { TouchableOpacity, StatusBar } from "react-native";
import { Actions } from 'react-native-router-flux';

import AccountLayout from '../layouts/AccountLayout'
import HorizontalCenterLayout from '../layouts/HorizontalCenterLayout'
import {showRootToast} from '../utils/misc'

import LogoView from '../components/LogoView'
import RoundButton from '../components/button/RoundButton'
import {CommonText, TitleText, SmallText, RoundTextInput} from '../components/text'
import {RoundDropDownButton} from '../components/button'

class SubscribeScreen extends Component {
  constructor(props){
    super(props)

    this.state = {
      zipCode: "",
      city: "",
      telephone: "",
    }
  }

  handleContinue = () => {
    const {zipCode, city, telephone} = this.state
    const {email, password, civility, firstName, lastName} = this.props

    if (zipCode == "") {
      showRootToast('Merci de mettre ton code postal')
      return
    }

    if (city == ""){
      showRootToast('Merci de mettre ta ville')
      return
    }

    if (telephone == ""){
      showRootToast('Merci de mettre ton téléphone')
      return
    }

    Actions.mycv({email, password, civility, firstName, lastName, zipCode, city, telephone})
  }

  render() {
    const {zipCode, city, telephone} = this.state
    return (
        <AccountLayout>
          <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />
          <LogoView size="small" style={{marginTop: 20 * em}}/>
          <TitleText style={{marginTop: 35 * em}} theme="black">Mes coordonnées</TitleText>
          <SmallText theme="gray">*Champ obligatoire</SmallText>

          <RoundTextInput
            placeHolder="Code Postale*"
            textContentType="postalCode"
            style={{marginTop: 20 * em}}
            value={zipCode}
            keyboardType='numeric'
            handleChange={(text)=>this.setState({zipCode:text})} />
          <RoundTextInput placeHolder="Ville*" style={{marginTop: 15 * em}}
            value={city} handleChange={(text)=>this.setState({city:text})} />
          <RoundTextInput
            placeHolder="Téléphone*"
            textContentType="telephoneNumber"
            style={{marginTop: 15 * em}}
            value={telephone}
            keyboardType='phone-pad'
            handleChange={(text)=>this.setState({telephone:text})} />
          <TouchableOpacity onPress={this.handleContinue.bind(this)}>
            <RoundButton text="Continuer" rightIcon="next" style={{marginTop: 15 * em}}/>
          </TouchableOpacity>
        </AccountLayout>
    );
  }
}

export default SubscribeScreen
