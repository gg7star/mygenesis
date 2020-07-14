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

class HomeTabScreen extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
        <AccountLayout style={{marginBottom: 60 * em}}>
          <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />
          <LogoView size="small" style={{marginTop: 20 * em}}/>
          <HorizontalJustifyLayout style={{marginTop: 25 * em, marginBottom: 20 * em}}>
            <CommonText theme="blue_gray">Mess données de connexion</CommonText>
            <Image source={require('../../assets/images/btn_sub_menu.png')} style={{width: 30 * em, height: 30 * em}} resizeMode={'stretch'} />
          </HorizontalJustifyLayout>
          <JobMetaAdapter global={true} favorite={false} title="Chef de project digital" durationType="CDD" budget="33000" availability="ASAP" location="Bordeaux"/>
          <JobMetaAdapter global={false} favorite={false} title="Foreur h/f" durationType="CDi" budget="33000" availability="5 juin 2020" location="Bordeaux"/>
          <JobMetaAdapter global={false} favorite={false} title="Boulanger h/f" durationType="CDD" budget="33000" availability="15 juin 2020" location="Bordeaux"/>
          <JobMetaAdapter global={true} favorite={false} title="Boulanger h/f" durationType="CDD" budget="33000" availability="15 juin 2020" location="Bordeaux"/>
          <JobMetaAdapter global={true} favorite={false} title="Boulanger h/f" durationType="CDD" budget="33000" availability="15 juin 2020" location="Bordeaux"/>
          <JobMetaAdapter global={true} favorite={false} title="Boulanger h/f" durationType="CDD" budget="33000" availability="15 juin 2020" location="Bordeaux"/>
          <JobMetaAdapter global={true} favorite={false} title="Boulanger h/f" durationType="CDD" budget="33000" availability="15 juin 2020" location="Bordeaux"/>
        </AccountLayout>
    );
  }
}

export default HomeTabScreen
