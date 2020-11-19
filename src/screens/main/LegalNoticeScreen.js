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
    title: 'Entreprise',
    content: 'Nom entreprise : Genesis RH\nForme sociale: SARL vicayla\nCapital Social: 60 000 €\nRCS: Mâcon',
  },
  {
    index: 1,
    title: 'Siège social',
    content: 'Siège social : 22.1 CONSULTING - 40 Rue Victor Hugo - 71 000 Mâcon\nResponsable de publication: Mathilde LOSSON\nMail et téléphone de contact du responsable de publication:\nrh@genesisrh.fr\n03 85 20 30 00',
  },
  {
    index: 2,
    title: 'Conception et développement',
    content: 'Altagile\n\
SAS au capital de 252 000 €\n\
5 rue de la Grande Fin 21 121 FONTAINE LES DIJON\n\
RCS 810145847 RDC Dijon',
  },
  {
    index: 3,
    title: 'Hébergeur',
    content: 'SAS au capital de 10 069 020 €\n\
RCS Lille Métropole 424 761 419 00045\n\
Code APE 2620Z\n\
N° TVA: FR 22 424 761 419\n\
Siège social: 2 rue Kellermann - 59100 Roubaix - France.\n\
',
  },
  {
    index: 4,
    title: 'La description',
    content: 'Les renseignements personnels que nous collectons sont conservés dans un environnement sécurisé. Les personnes travaillant pour nous sont tenues de respecter la confidentialité de vos informations. Pour assurer la sécurité de vos renseignements personnels, nous avons recours aux mesures suivantes :',
  },
  {
    index: 5,
    title: 'Gestion des accès',
    content: 'Gestion des accès - personne autorisée\n\
Logiciel de surveillance du réseau\n\
Sauvegarde informatique\n\
Pare- feu(Firewalls)',
  },
];

class LegalNoticeScreen extends Component {
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
            <CommonText theme="blue_gray" style={{marginLeft: 5 * em}}>Mentions légales</CommonText>
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

export default LegalNoticeScreen
