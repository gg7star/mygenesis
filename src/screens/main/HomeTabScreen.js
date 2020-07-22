import React, { Component } from 'react'
import {em} from '../../common'
import { TouchableOpacity, StatusBar, Image, Text } from "react-native";
import { Actions } from 'react-native-router-flux';

import AccountLayout from '../../layouts/AccountLayout'
import HorizontalJustifyLayout from '../../layouts/HorizontalJustifyLayout'

import LogoView from '../../components/LogoView'
import RoundButton from '../../components/button/RoundButton'
import {CommonText} from '../../components/text'
import {RoundDropDownButton} from '../../components/button'
import JobMetaAdapter from '../../components/custom/JobMetaAdapter'
import {Tooltip, Divider} from 'react-native-elements'
import TooltipContent from './TooltipContent'

class HomeTabScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      tooltipShown: false
    }
  }

  render() {
    return (
        <AccountLayout style={{marginBottom: 65 * em}}>
          {this.state.tooltipShown &&
          <StatusBar barstyle="dark-content" translucent backgroundColor="#18277aef" />}
          {!this.state.tooltipShown &&
          <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />}
          <LogoView size="small" style={{marginTop: 20 * em}}/>
          <HorizontalJustifyLayout style={{marginTop: 25 * em, marginBottom: 20 * em}}>
            <CommonText theme="blue_gray">Mess données de connexion</CommonText>
            <Tooltip popover={<TooltipContent/>}
              onOpen={()=>{this.setState({tooltipShown: true})}}
              onClose={()=>{this.setState({tooltipShown: false})}}
              backgroundColor="#ffffff"
              overlayColor="#18277aef"
              width={150*em}
              height={170*em}>
              {this.state.tooltipShown &&
              <Image source={require('../../assets/images/ic_close_popover.png')} style={styles.tooltipButton} resizeMode={'stretch'} />}
              {!this.state.tooltipShown &&
                <Image source={require('../../assets/images/btn_sub_menu.png')} style={styles.tooltipButton} resizeMode={'stretch'} />
              }
            </Tooltip>
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

const styles = {
  tooltipButton: {
    width: 30 * em,
    height: 30 * em,
  }
}

export default HomeTabScreen
