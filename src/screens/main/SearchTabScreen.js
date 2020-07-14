import React, { Component } from 'react'
import {em} from '../../common'
import { TouchableOpacity, StatusBar, Image, View } from "react-native";
import { Actions } from 'react-native-router-flux';

import AccountLayout from '../../layouts/AccountLayout'
import HorizontalJustifyLayout from '../../layouts/HorizontalJustifyLayout'

import LogoView from '../../components/LogoView'
import RoundButton from '../../components/RoundButton'
import {CommonText, TitleText, SmallText, RoundTextInput} from '../../components/text'
import {RoundDropDownButton} from '../../components/button'
import JobMetaAdapter from '../../components/custom/JobMetaAdapter'

class SearchTabScreen extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
        <AccountLayout style={{marginBottom: 60 * em}}>
          <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />
          <TitleText style={{marginTop: 35 * em}} theme="black">Recherer</TitleText>
          <RoundTextInput placeHolder="Métier" textContentType="familyName" style={{marginTop: 15 * em}} />
          <RoundTextInput placeHolder="Secteur d'activité" textContentType="familyName" style={{marginTop: 15 * em}} />
          <RoundTextInput placeHolder="Type de contrat" textContentType="familyName" style={{marginTop: 15 * em}} />
          <RoundTextInput placeHolder="Ville" textContentType="familyName" style={{marginTop: 15 * em}} />
          <TouchableOpacity onPress={() => {
          }}>
            <RoundButton text="Recherer" rightIcon="next" style={{marginTop: 15 * em}}/>
          </TouchableOpacity>
        </AccountLayout>
    );
  }
}

export default SearchTabScreen
