import React, { Component } from 'react'
import {em, WIDTH, HEIGHT} from '../../common'
import { TouchableOpacity, StatusBar, Image } from "react-native";
import { Actions } from 'react-native-router-flux';

import VerticalCenterFlowLayout from '../../layouts/VerticalCenterFlowLayout'
import VerticalCenterLayout from '../../layouts/VerticalCenterLayout'
import AccountLayout from '../../layouts/VerticalCenterLayout'
import HorizontalJustifyLayout from '../../layouts/HorizontalJustifyLayout'

import LogoView from '../../components/LogoView'
import RoundButton from '../../components/button/RoundButton'
import {MediumRegularText, TitleText, CommonText} from '../../components/text'
import {RoundDropDownButton} from '../../components/button'

class CompleteTabDetailScreen extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
        <AccountLayout>
          <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />
          <TitleText style={{marginTop: 35 * em, marginBottom: 10 * em}} theme="black">Mon Compte</TitleText>
          <VerticalCenterFlowLayout>
            <HorizontalJustifyLayout>
              <VerticalCenterLayout style={{width: WIDTH * 0.4}}>
                <Image source={require('../../assets/images/ic_my_information.png')}
                  style={{width: 60 * em, height: 60 * em}} resizeMode={'stretch'} />
                <CommonText theme="primary">Mes informations</CommonText>
              </VerticalCenterLayout>
            </HorizontalJustifyLayout>
          </VerticalCenterFlowLayout>
        </AccountLayout>
    );
  }
}

export default CompleteTabDetailScreen
