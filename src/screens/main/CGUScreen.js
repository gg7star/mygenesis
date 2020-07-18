import React, { Component } from 'react'
import { TouchableOpacity, StatusBar, Image, View } from "react-native"
import {TitleText, CommonText, CommonRegularText, MediumText} from '../../components/text'
import {em, WIDTH} from '../../common'
import AccountLayout from '../../layouts/AccountLayout'
import HorizontalJustifyLayout from '../../layouts/HorizontalJustifyLayout'
import HorizontalLayout from '../../layouts/HorizontalLayout'
import HorizontalCenterLayout from '../../layouts/HorizontalCenterLayout'
import VerticalFlowLayout from '../../layouts/VerticalFlowLayout'
import VerticalCenterLayout from '../../layouts/VerticalFlowLayout'
import RoundButton from '../../components/button/RoundButton'
import RoundDropDownButton from '../../components/button/RoundDropDownButton'
import Accordion from 'react-native-collapsible/Accordion'

const SECTIONS = [
  {
    index: 0,
    title: 'Condition 1',
    content: 'Lorem ipsum dolor sit amet, conseteur\nsadipscing elitr, sed diam nounmy eirmod\ntempor invidunt ut labore et dolore\nmagna aliquyam erat, sed diam voluptua.\nAt vero eos et accusam et justo duo\ndolores et ea rebum. Stet clita kasd gubergre, no sea takimata sanctus\nestundefined',
  },
  {
    index: 1,
    title: 'Condition 2',
    content: 'Lorem ipsum dolor sit amet, conseteur\nsadipscing elitr, sed diam nounmy eirmod\ntempor invidunt ut labore et dolore\nmagna aliquyam erat, sed diam voluptua.\nAt vero eos et accusam et justo duo\ndolores et ea rebum. Stet clita kasd gubergre, no sea takimata sanctus\nestundefined',
  },
  {
    index: 2,
    title: 'Condition 3',
    content: 'Lorem ipsum dolor sit amet, conseteur\nsadipscing elitr, sed diam nounmy eirmod\ntempor invidunt ut labore et dolore\nmagna aliquyam erat, sed diam voluptua.\nAt vero eos et accusam et justo duo\ndolores et ea rebum. Stet clita kasd gubergre, no sea takimata sanctus\nestundefined',
  },
  {
    index: 3,
    title: 'Condition 4',
    content: 'Lorem ipsum dolor sit amet, conseteur\nsadipscing elitr, sed diam nounmy eirmod\ntempor invidunt ut labore et dolore\nmagna aliquyam erat, sed diam voluptua.\nAt vero eos et accusam et justo duo\ndolores et ea rebum. Stet clita kasd gubergre, no sea takimata sanctus\nestundefined',
  },
  {
    index: 4,
    title: 'Condition 5',
    content: 'Lorem ipsum dolor sit amet, conseteur\nsadipscing elitr, sed diam nounmy eirmod\ntempor invidunt ut labore et dolore\nmagna aliquyam erat, sed diam voluptua.\nAt vero eos et accusam et justo duo\ndolores et ea rebum. Stet clita kasd gubergre, no sea takimata sanctus\nestundefined',
  },
];

class CGUScreen extends Component {
  state = {
    activeSections: [],
  };

  _renderSectionTitle = section => {
    return (
      <View>
      </View>
    );
  };

  isItemExpanded(section) {
    for (let activeSection in this.state.activeSections) {
      if (activeSection.index == section.index) {
        console.log("Active Sction Index : " + activeSection.title)
        console.log("Sction Index : " + section.index)
        return true
      }
    }
    return false
  }

  _renderHeader(section, i, isActive, sections) {
    let buttonStyle = {}
    if (isActive) {
      buttonStyle = {borderBottomLeftRadius: 0, borderBottomRightRadius: 0}
    }
    return (
      <VerticalCenterLayout>
        <RoundDropDownButton theme="blue_gray" text={section.title} expand={isActive} style={[{alignSelf:"center", marginTop: 10*em}, buttonStyle]}/>
      </VerticalCenterLayout>
    );
  };

  _renderContent(section, i, isActive, sections) {
    let buttonStyle = {borderBottomLeftRadius: 20*em, borderBottomRightRadius: 20*em}
    return (
      <HorizontalCenterLayout style={[{width: WIDTH * 0.85, backgroundColor: "#ffffff", paddingHorizontal: 20*em, paddingVertical: 15*em}, buttonStyle]}>
        <CommonRegularText theme="gray" style={{flex: 1}}>{section.content}</CommonRegularText>
      </HorizontalCenterLayout>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

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
            <CommonText theme="blue_gray" style={{marginLeft: 5 * em}}>CGU</CommonText>
            <View style={{width: 30*em}}/>
          </HorizontalJustifyLayout>
          <VerticalCenterLayout style={{marginTop: 20*em, marginBottom: 20*em}}>
            <Accordion
              sections={SECTIONS}
              activeSections={this.state.activeSections}
              renderSectionTitle={this._renderSectionTitle}
              renderHeader={this._renderHeader}
              renderContent={this._renderContent}
              onChange={this._updateSections}
              expandMultiple={true}
              touchableComponent={TouchableOpacity}
            />
          </VerticalCenterLayout>
        </AccountLayout>
    );
  }
}

export default CGUScreen
