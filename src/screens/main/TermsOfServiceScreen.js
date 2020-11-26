import React, { Component } from 'react'
import { TouchableOpacity, StatusBar, Image, View } from "react-native"
import { CommonText, CommonRegularText, MediumText } from '../../components/text'
import { em, WIDTH } from '../../common'
import AccountLayout from '../../layouts/AccountLayout'
import HorizontalJustifyLayout from '../../layouts/HorizontalJustifyLayout'
import HorizontalCenterLayout from '../../layouts/HorizontalCenterLayout'
import VerticalCenterLayout from '../../layouts/VerticalFlowLayout'
import RoundDropDownButton from '../../components/button/RoundDropDownButton'
import Accordion from 'react-native-collapsible/Accordion'

const SECTIONS = [
  {
    index: 0,
    title: 'Non-divulgation des renseignements personnels',
    content: 'Sauf tel que prévu au présent paragraphe, Genesis RH ne divulgue pas à des tiers les renseignements personnels recueillis sur son site Web à moins que Genesis RH obtienne votre autorisation de le faire ou en cas de circonstances particulières.\n\
Seuls les préposés, mandataires ou agents de Genesis RH qui s’occupent de la gestion et du développement du site Web de Genesis RH ont accès aux renseignements qui y sont recueillis.',
  },
  {
    index: 1,
    title: 'Confidentialité',
    content: 'En naviguant sur le site Web de Genesis RH, vous consentez, sans réserve, à la présente politique relative à la confidentialité.',
  },
];

class TermsOfServiceScreen extends Component {
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
      buttonStyle = { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }
    }
    return (
      <VerticalCenterLayout>
        <RoundDropDownButton theme="blue_gray" text={section.title} expand={isActive} style={[{ alignSelf: "center", marginTop: 10 * em }, buttonStyle]} />
      </VerticalCenterLayout>
    );
  };

  _renderContent(section, i, isActive, sections) {
    let buttonStyle = { borderBottomLeftRadius: 20 * em, borderBottomRightRadius: 20 * em }
    return (
      <HorizontalCenterLayout style={[{ width: '100%', backgroundColor: "#ffffff", paddingHorizontal: 20 * em, paddingVertical: 15 * em }, buttonStyle]}>
        <CommonRegularText theme="gray" style={{ flex: 1 }}>{section.content}</CommonRegularText>
      </HorizontalCenterLayout>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <AccountLayout style={{paddingLeft: '5%', paddingRight: '5%'}}>
        <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />
        <HorizontalJustifyLayout style={{ width: '100%', marginTop: 25 * em }}>
          <TouchableOpacity onPress={() => {
            this.props.navigation.goBack()
          }}>
            <Image source={require('../../assets/images/ic_back.png')} style={{ width: 30 * em, height: 30 * em }} resizeMode={'stretch'} />
          </TouchableOpacity>
          <CommonText theme="blue_gray" style={{ marginLeft: 5 * em }}>Confidentialité</CommonText>
          <View style={{ width: 30 * em }} />
        </HorizontalJustifyLayout>
        <VerticalCenterLayout style={{ width: '100%', marginTop: 20 * em, marginBottom: 20 * em }}>
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

export default TermsOfServiceScreen
