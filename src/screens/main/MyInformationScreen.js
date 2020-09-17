import React, { Component } from 'react'
import { TouchableOpacity, StatusBar, Image, View } from "react-native"
import { Actions } from 'react-native-router-flux'
import {TitleText, CommonText, CommonRegularText, SmallText} from '../../components/text'
import {em, WIDTH} from '../../common'
import AccountLayout from '../../layouts/AccountLayout'
import HorizontalJustifyLayout from '../../layouts/HorizontalJustifyLayout'
import VerticalFlowLayout from '../../layouts/VerticalFlowLayout'
import RoundButton from '../../components/button/RoundButton'

class MyInformationScreen extends Component {
  constructor(props){
    super(props)
  }

  didClickLogout = () => {
    Actions.reset("login")
  }

  render() {
    return (
        <AccountLayout>
          <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />
          <HorizontalJustifyLayout style={{marginTop: 25 * em, marginBottom: 20 * em}}>
            <TouchableOpacity onPress={() => {
              this.props.navigation.goBack()
            }}>
              <Image source={require('../../assets/images/ic_back.png')} style={{width: 30*em, height: 30*em}} resizeMode={'stretch'} />
            </TouchableOpacity>
            <CommonText theme="blue_gray" style={{marginLeft: 5 * em}}>Mes informations</CommonText>
            <View style={{width: 30*em}}/>
          </HorizontalJustifyLayout>
          <CommonRegularText theme="gray">Monsieur</CommonRegularText>
          <TitleText theme="black" style={{marginTop: 5*em}}>Caille Dylan</TitleText>

          <VerticalFlowLayout style={{padding: 20*em, backgroundColor: "#ffffff", width: WIDTH*0.85, borderRadius: 20*em, marginTop: 15*em}}>
            <CommonText theme="blue_gray">Email</CommonText>
            <SmallText theme="light_gray" style={{marginTop: 5*em}}>dylan-caille@hotmail.fr</SmallText>
            <CommonText theme="blue_gray" style={{marginTop: 15*em}}>Code postal</CommonText>
            <SmallText theme="light_gray" style={{marginTop: 5*em}}>33000</SmallText>
            <CommonText theme="blue_gray" style={{marginTop: 15*em}}>Ville</CommonText>
            <SmallText theme="light_gray" style={{marginTop: 5*em}}>Bordeaux</SmallText>
            <CommonText theme="blue_gray" style={{marginTop: 15*em}}>Numéro de téléphone</CommonText>
            <SmallText theme="light_gray" style={{marginTop: 5*em}}>06 12 34 56 78</SmallText>
          </VerticalFlowLayout>

          <VerticalFlowLayout style={{padding: 20*em, backgroundColor: "#ffffff", width: WIDTH*0.85, borderRadius: 20*em, marginTop: 15*em}}>
            <CommonText theme="blue_gray">Mon CV</CommonText>
            <SmallText theme="light_gray" style={{marginTop: 5*em}}>CV DylanCaille 2020.pdf</SmallText>
            <CommonText theme="blue_gray" style={{marginTop: 15*em}}>Secteur d'activité</CommonText>
            <SmallText theme="light_gray" style={{marginTop: 5*em}}>Santé, sociale</SmallText>
            <CommonText theme="blue_gray" style={{marginTop: 15*em}}>Métier</CommonText>
            <SmallText theme="light_gray" style={{marginTop: 5*em}}>Médecin, Aide soignant, infirmier</SmallText>
          </VerticalFlowLayout>
          <TouchableOpacity onPress={() => {
            this.didClickLogout()
          }}>
            <RoundButton style={{marginTop: 20*em, marginBottom: 20*em}} text="DÉCONNEXION" theme="gray"/>
          </TouchableOpacity>
        </AccountLayout>
    );
  }
}

export default MyInformationScreen
