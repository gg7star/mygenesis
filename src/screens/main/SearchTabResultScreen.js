import React, { Component } from 'react'
import { TouchableOpacity, StatusBar, Image } from "react-native"
import { createStackNavigator } from '@react-navigation/stack'
import SearchTabMainScreen from './SearchTabMainScreen'
import {TitleText, CommonText} from '../../components/text'
import {em, WIDTH} from '../../common'
import AccountLayout from '../../layouts/AccountLayout'
import HorizontalJustifyLayout from '../../layouts/HorizontalJustifyLayout'
import HorizontalLayout from '../../layouts/HorizontalLayout'
import JobMetaAdapter from '../../components/custom/JobMetaAdapter'
import { Tooltip } from 'react-native-elements'
import TooltipContent from './TooltipContent'

class SearchTabResultScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      tooltipShown: false
    }
  }

  render() {
    return (
        <AccountLayout>
          {this.state.tooltipShown &&
          <StatusBar barstyle="dark-content" translucent backgroundColor="#18277aef" />}
          {!this.state.tooltipShown &&
          <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />}
          <HorizontalJustifyLayout style={{marginTop: 25 * em, marginBottom: 20 * em}}>
            <HorizontalLayout>
              <TouchableOpacity onPress={() => {
                this.props.navigation.goBack()
              }}>
                <Image source={require('../../assets/images/ic_back.png')} style={styles.tooltipButton} resizeMode={'stretch'} />
              </TouchableOpacity>
              <CommonText theme="blue_gray" style={{marginLeft: 5 * em}}>12 résultats trouvés</CommonText>
            </HorizontalLayout>
            <Tooltip popover={<TooltipContent/>}
              onOpen={()=>{this.setState({tooltipShown: true})}}
              onClose={()=>{this.setState({tooltipShown: false})}}
              backgroundColor="#ffffff"
              overlayColor="#18277aef"
              width={150*em}
              height={150*em}>
              {this.state.tooltipShown &&
              <Image source={require('../../assets/images/ic_close_popover.png')} style={styles.tooltipButton} resizeMode={'stretch'} />}
              {!this.state.tooltipShown &&
                <Image source={require('../../assets/images/btn_sub_menu.png')} style={styles.tooltipButton} resizeMode={'stretch'} />
              }
            </Tooltip>
          </HorizontalJustifyLayout>
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('SearchDetail', {
              title: 'Chef de project digital',
              applied: true,
              favorite: false,
              isGlobal: true,
            })
          }}>
            <JobMetaAdapter global={true} favorite={false} applied={true} title="Chef de project digital" durationType="CDD" budget="33000" availability="ASAP" location="Bordeaux"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('SearchDetail', {
              title: 'Chef de project digital',
              applied: false,
              favorite: false,
              isGlobal: false,
            })
          }}>
            <JobMetaAdapter global={false} favorite={false} title="Foreur h/f" durationType="CDi" budget="33000" availability="5 juin 2020" location="Bordeaux"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('SearchDetail', {
              title: 'Foreur h/f',
              applied: true,
              favorite: false,
              isGlobal: false,
            })
          }}>
            <JobMetaAdapter global={false} favorite={false} applied={true} title="Boulanger h/f" durationType="CDD" budget="33000" availability="15 juin 2020" location="Bordeaux"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('SearchDetail', {
              title: 'Boulanger h/f',
              applied: false,
              favorite: false,
              isGlobal: true,
            })
          }}>
            <JobMetaAdapter global={true} favorite={false} title="Boulanger h/f" durationType="CDD" budget="33000" availability="15 juin 2020" location="Bordeaux"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('SearchDetail', {
              title: 'Boulanger h/f',
              applied: false,
              favorite: false,
              isGlobal: true,
            })
          }}>
            <JobMetaAdapter global={true} favorite={false} title="Boulanger h/f" durationType="CDD" budget="33000" availability="15 juin 2020" location="Bordeaux"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('SearchDetail', {
              title: 'Boulanger h/f',
              applied: false,
              favorite: false,
              isGlobal: true,
            })
          }}>
            <JobMetaAdapter global={true} favorite={false} title="Boulanger h/f" durationType="CDD" budget="33000" availability="15 juin 2020" location="Bordeaux"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('SearchDetail', {
              title: 'Boulanger h/f',
              applied: false,
              favorite: false,
              isGlobal: true,
            })
          }}>
            <JobMetaAdapter global={true} favorite={false} title="Boulanger h/f" durationType="CDD" budget="33000" availability="15 juin 2020" location="Bordeaux"/>
          </TouchableOpacity>
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

export default SearchTabResultScreen
