import React, { Component } from 'react'
import {em} from '../../common'
import { TouchableOpacity, StatusBar } from "react-native";
import { Actions } from 'react-native-router-flux';

import AccountLayout from '../../layouts/AccountLayout'
import HorizontalCenterLayout from '../../layouts/HorizontalCenterLayout'
import VerticalCenterFlowLayout from '../../layouts/VerticalCenterFlowLayout'

import LogoView from '../../components/LogoView'
import RoundButton from '../../components/button/RoundButton'
import {CommonText, TitleText, SmallText, RoundTextInput} from '../../components/text'
import {RoundDropDownButton} from '../../components/button'
import {AgreeCheckBox} from '../../components/checkbox'
import JobMetaAdapter from '../../components/custom/JobMetaAdapter'

class FavoritesTabScreen extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
        <AccountLayout>
          <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />
          <TitleText style={{marginTop: 35 * em, marginBottom: 30 * em}} theme="black">Favoris</TitleText>
          <JobMetaAdapter global={true} favorite={true} title="Chef de project digital" durationType="CDD" budget="33000" availability="ASAP" location="Bordeaux"/>
          <JobMetaAdapter global={false} favorite={true} title="Foreur h/f" durationType="CDi" budget="33000" availability="5 juin 2020" location="Bordeaux"/>
          <JobMetaAdapter global={false} favorite={true} title="Boulanger h/f" durationType="CDD" budget="33000" availability="15 juin 2020" location="Bordeaux"/>
          <JobMetaAdapter global={true} favorite={true} title="Boulanger h/f" durationType="CDD" budget="33000" availability="15 juin 2020" location="Bordeaux"/>
          <JobMetaAdapter global={true} favorite={true} title="Boulanger h/f" durationType="CDD" budget="33000" availability="15 juin 2020" location="Bordeaux"/>
          <JobMetaAdapter global={true} favorite={true} title="Boulanger h/f" durationType="CDD" budget="33000" availability="15 juin 2020" location="Bordeaux"/>
          <JobMetaAdapter global={true} favorite={true} title="Boulanger h/f" durationType="CDD" budget="33000" availability="15 juin 2020" location="Bordeaux"/>
        </AccountLayout>
    );
  }
}

export default FavoritesTabScreen
