import React, { Component } from 'react'
import { TouchableOpacity, StatusBar, Image, View } from "react-native"
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import {TitleText, CommonText, CommonRegularText, SmallText} from '../../components/text'
import {em, WIDTH} from '../../common'
import AccountLayout from '../../layouts/AccountLayout'
import HorizontalJustifyLayout from '../../layouts/HorizontalJustifyLayout'
import VerticalFlowLayout from '../../layouts/VerticalFlowLayout'
import RoundButton from '../../components/button/RoundButton'
import commonStyles from '../../components/common_styles';

class MyInformationScreen extends Component {
  constructor(props){
    super(props)
  }

  didClickLogout = () => {
    Actions.reset("login")
  }

  render() {
    const credential = this.props.credential;
    var civility = (credential && credential.civility) || 'Monsieur'
    var full_name = (credential && (credential.firstName) && `${credential.firstName} ${credential.lastName}`) || 'Caille Dylan'
    var email = (credential && credential.email) || 'dylan-caille@hotmail.fr'
    var zipCode = (credential && credential.zipCode) || '333000'
    var city = (credential && credential.city) || 'Bordeaux'
    var telephone = (credential && credential.telephone) || '06 12 34 56 78'
    var cvFileName = (credential && credential.cvFileName) || 'CV DylanCaille 2020.pdf'
    var activityArea = (credential && credential.activityArea) || 'Santé, sociale'
    var job = (credential && credential.job) || 'Médecin, Aide soignant, infirmier'

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
          <CommonRegularText theme="gray">{civility}</CommonRegularText>
          <TitleText theme="black" style={{marginTop: 5*em}}>{full_name}</TitleText>

          <VerticalFlowLayout
            style={[
              {
                padding: 20*em,
                backgroundColor: "#ffffff",
                width: WIDTH*0.85,
                borderRadius: 20*em,
                marginTop: 15*em,
              },
              commonStyles.shadow.card,
            ]}>
            <CommonText theme="blue_gray">Email</CommonText>
            <SmallText theme="light_gray" style={{marginTop: 5*em}}>{email}</SmallText>
            <CommonText theme="blue_gray" style={{marginTop: 15*em}}>Code postal</CommonText>
          <SmallText theme="light_gray" style={{marginTop: 5*em}}>{zipCode}</SmallText>
            <CommonText theme="blue_gray" style={{marginTop: 15*em}}>Ville</CommonText>
          <SmallText theme="light_gray" style={{ marginTop: 5 * em }}>{city}</SmallText>
            <CommonText theme="blue_gray" style={{marginTop: 15*em}}>Numéro de téléphone</CommonText>
          <SmallText theme="light_gray" style={{marginTop: 5*em}}>{telephone}</SmallText>
          </VerticalFlowLayout>

          <VerticalFlowLayout
            style={[
              {
                padding: 20*em,
                backgroundColor: "#ffffff",
                width: WIDTH*0.85,
                borderRadius: 20*em,
                marginTop: 15*em,
              },
              commonStyles.shadow.card,
            ]}>
            <CommonText theme="blue_gray">Mon CV</CommonText>
            <SmallText theme="light_gray" style={{marginTop: 5*em}}>{cvFileName}</SmallText>
            <CommonText theme="blue_gray" style={{marginTop: 15*em}}>Secteur d'activité</CommonText>
            <SmallText theme="light_gray" style={{marginTop: 5*em}}>{activityArea}</SmallText>
            <CommonText theme="blue_gray" style={{marginTop: 15*em}}>Métier</CommonText>
            <SmallText theme="light_gray" style={{marginTop: 5*em}}>{job}</SmallText>
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


const mapStateToProps = state => ({
  credential: state.app.credential,
})

export default connect(
  mapStateToProps,
  null,
)(MyInformationScreen);

// export default MyInformationScreen
