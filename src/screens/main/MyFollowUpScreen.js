import React, { Component } from 'react'
import { TouchableOpacity, StatusBar, Image, View } from "react-native"
import {TitleText, CommonText, CommonRegularText, SmallText} from '../../components/text'
import {em, WIDTH} from '../../common'
import AccountLayout from '../../layouts/AccountLayout'
import HorizontalJustifyLayout from '../../layouts/HorizontalJustifyLayout'
import VerticalFlowLayout from '../../layouts/VerticalFlowLayout'
import RoundButton from '../../components/button/RoundButton'
import JobMetaAdapter from '../../components/custom/JobMetaAdapter'

class MyFollowUpScreen extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
        <AccountLayout>
          <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />
          <HorizontalJustifyLayout style={{marginTop: 25 * em}}>
            <TouchableOpacity onPress={() => {
              this.props.navigation.goBack()
            }}>
              <Image source={require('../../assets/images/ic_back.png')} style={{width: 30*em, height: 30*em}} resizeMode={'stretch'} />
            </TouchableOpacity>
            <CommonText theme="blue_gray" style={{marginLeft: 5 * em}}>Mon suivi</CommonText>
            <View style={{width: 30*em}}/>
          </HorizontalJustifyLayout>
          <CommonRegularText theme="gray" style={{marginTop: 5*em, marginBottom: 15*em}}>Voici la liste des offres dont vous avez déjà postulé</CommonRegularText>
          <JobMetaAdapter global={true} favorite={false} applied={true} title="Chef de project digital" durationType="CDD" budget="33000" availability="ASAP" location="Bordeaux"/>
          <JobMetaAdapter global={true} favorite={false} applied={true} title="Chef de project digital" durationType="CDD" budget="33000" availability="ASAP" location="Bordeaux"/>
        </AccountLayout>
    );
  }
}

export default MyFollowUpScreen
