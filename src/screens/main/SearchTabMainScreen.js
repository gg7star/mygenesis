
import React, { Component } from 'react'
import {em} from '../../common'
import { TouchableOpacity, StatusBar } from "react-native"
import { Actions } from 'react-native-router-flux';

import AccountLayout from '../../layouts/AccountLayout'

import RoundButton from '../../components/button/RoundButton'
import {TitleText, RoundTextInput} from '../../components/text'

class SearchTabMainScreen extends Component {
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
            this.props.navigation.navigate("SearchResult")
          }}>
            <RoundButton text="Recherer" rightIcon="next" style={{marginTop: 15 * em}}/>
          </TouchableOpacity>
        </AccountLayout>
    );
  }
}

export default SearchTabMainScreen
