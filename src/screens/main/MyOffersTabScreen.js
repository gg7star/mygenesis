import React, { Component } from 'react'
import {em} from '../../common'
import { TouchableOpacity, StatusBar } from "react-native";
import { Actions } from 'react-native-router-flux';

import AccountLayout from '../../layouts/AccountLayout'
import HorizontalCenterLayout from '../../layouts/HorizontalCenterLayout'
import VerticalCenterFlowLayout from '../../layouts/VerticalCenterFlowLayout'

import LogoView from '../../components/LogoView'
import RoundButton from '../../components/RoundButton'
import {CommonText, TitleText, SmallText, RoundTextInput} from '../../components/text'
import {RoundDropDownButton} from '../../components/button'
import {AgreeCheckBox} from '../../components/checkbox'
import JobMetaAdapter from '../../components/custom/JobMetaAdapter'

class MyOffersTabScreen extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
        <AccountLayout>
          <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />
          <TitleText style={{marginTop: 35 * em, marginBottom: 10 * em}} theme="black">Mes offres</TitleText>
          <SmallText theme="gray" style={{marginBottom: 20 * em}}>Pour supprimer l'offre glisser vers la droite</SmallText>
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

export default MyOffersTabScreen
