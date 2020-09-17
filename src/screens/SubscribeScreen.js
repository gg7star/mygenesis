import React, { Component } from 'react'
import {WIDTH, HEIGHT, em} from '../common'
import { TouchableOpacity, StatusBar } from "react-native"
import { Actions } from 'react-native-router-flux'
import {showRootToast} from '../utils/misc'

import AccountLayout from '../layouts/AccountLayout'
import HorizontalCenterLayout from '../layouts/HorizontalCenterLayout'
import VerticalCenterFlowLayout from '../layouts/VerticalCenterFlowLayout'

import LogoView from '../components/LogoView'
import AccountDropDown from '../components/custom/AccountDropDown'
import RoundButton from '../components/button/RoundButton'
import {CommonText, TitleText, SmallText, RoundTextInput} from '../components/text'
import {RoundDropDownButton} from '../components/button'
import {AgreeCheckBox} from '../components/checkbox'
import DropDownPicker from 'react-native-dropdown-picker'

class SubscribeScreen extends Component {
  constructor(props){
    super(props)

    this.state = {
      civility: "",
      firstName: "",
      lastName: "",
      toggleCheckBox: false
    }
  }

  handleContinue = () => {
    const {civility, firstName, lastName, toggleCheckBox} = this.state
    if (civility == "") {
      showRootToast('Please select civility')
      return
    }
    if (firstName == "") {
      showRootToast('Please enter first name')
      return
    }
    if (lastName == "") {
      showRootToast('Please enter last name')
      return
    }
    if (!toggleCheckBox) {
      showRootToast('Please agree with terms and policy')
      return
    }
    Actions.connectionMessage({civility, firstName, lastName})
  }

  setToggleCheckBox = (toggle) => {
      this.setState({toggleCheckBox: toggle})
  }

  handleGoLogin = () => {
    Actions.pop()
    Actions.login()
  }

  render() {
    return (
        <AccountLayout>
          <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />
          <LogoView size="small" style={{marginTop: 20 * em}}/>
          <TitleText style={{marginTop: 35 * em}} theme="black">M'inscrier</TitleText>
          <SmallText theme="gray">*Champ obligatoire</SmallText>

          <AccountDropDown defaultValue={this.state.civility}
            onChangeItem={item => this.setState({
                civility: item.value
            })}
            items={[
                {label: 'salut', value: 'salut'},
                {label: 'Bonjour', value: 'Bonjour'},
                {label: 'Comment allez-vous?', value: 'Comment allez-vous?'},
                {label: 'Ravi de vous rencontrer', value: 'Ravi de vous rencontrer'},
            ]}
            style={{marginTop: 20*em}}
            placeholder='Civilité'/>
          <RoundTextInput placeHolder="Nom*" textContentType="familyName" style={{marginTop: 15 * em}}
            value={this.state.firstName} handleChange={(text)=>this.setState({firstName:text})} />
          <RoundTextInput placeHolder="Prenom*"textContentType="givenName"  style={{marginTop: 15 * em}}
            value={this.state.lastName} handleChange={(text)=>this.setState({lastName:text})} />
          <TouchableOpacity onPress={this.handleContinue.bind(this)}>
            <RoundButton text="Continuer" rightIcon="next" style={{marginTop: 15 * em}}/>
          </TouchableOpacity>
          <AgreeCheckBox style={{marginTop: 15*em}} value={this.state.toggleCheckBox}
            onValueChange={() => this.state.toggleCheckBox ? this.setToggleCheckBox(false) : this.setToggleCheckBox(true)}/>
          <HorizontalCenterLayout style={{marginBottom: 30 * em}}>
            <CommonText theme="gray" style={{marginTop: 25 * em}}>Déjà un compte ? </CommonText>
            <CommonText theme="primary" style={{marginTop: 25 * em}} onPress={this.handleGoLogin}>Me connecter</CommonText>
          </HorizontalCenterLayout>
        </AccountLayout>
    );
  }
}

export default SubscribeScreen
