import React, { Component } from 'react'
import {em, WIDTH} from '../../common'
import { TouchableOpacity, StatusBar, Image } from "react-native"
import { Actions } from 'react-native-router-flux'

import VerticalCenterFlowLayout from '../../layouts/VerticalCenterFlowLayout'
import VerticalCenterLayout from '../../layouts/VerticalCenterLayout'
import AccountLayout from '../../layouts/AccountLayout'
import HorizontalJustifyLayout from '../../layouts/HorizontalJustifyLayout'

import RoundButton from '../../components/button/RoundButton'
import {MediumRegularText, TitleText, CommonText} from '../../components/text'
import {RoundDropDownButton} from '../../components/button'
import CompleteCard from '../../components/custom/CompleteCard'
import RoundExpandableButton from '../../components/button/RoundExpandableButton'

class CompleteTabDetailScreen extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
        <AccountLayout>
          <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />
          <TitleText style={{marginTop: 35 * em, marginBottom: 10 * em}} theme="black">Mon Compte</TitleText>
          <VerticalCenterFlowLayout style={{marginTop: 20*em}}>
            <HorizontalJustifyLayout>
              <TouchableOpacity onPress={() => {
                Actions.myinformation()
              }}>
                <CompleteCard type="my_information"/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                Actions.myfollowup()
              }}>
                <CompleteCard type="follow_up"/>
              </TouchableOpacity>
            </HorizontalJustifyLayout>
            <HorizontalJustifyLayout style={{marginTop: WIDTH * 0.05}}>
              <TouchableOpacity onPress={() => {
                Actions.myavailability()
              }}>
                <CompleteCard type="availability"/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                Actions.contactus()
              }}>
                <CompleteCard type="contact_us"/>
              </TouchableOpacity>
            </HorizontalJustifyLayout>
          </VerticalCenterFlowLayout>
          <TouchableOpacity onPress={() => {
            Actions.aboutmygenesis()
          }}>
            <RoundExpandableButton text="A propos de My Genesis" style={{marginTop: WIDTH * 0.05}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            Actions.cgu()
          }}>
            <RoundExpandableButton text="CGU" style={{marginTop: WIDTH * 0.05}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            Actions.legalnotice()
          }}>
            <RoundExpandableButton text="Mentions legalés" style={{marginTop: WIDTH * 0.05, marginBottom: 80*em}}/>
          </TouchableOpacity>
        </AccountLayout>
    );
  }
}

export default CompleteTabDetailScreen
