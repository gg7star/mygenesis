import React, { Component } from 'react'
import { TouchableOpacity, StatusBar, Image, Button, View } from "react-native"
import { createStackNavigator } from '@react-navigation/stack';
import SearchTabMainScreen from './SearchTabMainScreen'
import AccountLayout from '../../layouts/AccountLayout'
import HorizontalJustifyLayout from '../../layouts/HorizontalJustifyLayout'
import HorizontalCenterLayout from '../../layouts/HorizontalCenterLayout'
import HorizontalLayout from '../../layouts/HorizontalLayout'
import VerticalFlowLayout from '../../layouts/VerticalFlowLayout'
import VerticalCenterFlowLayout from '../../layouts/VerticalCenterFlowLayout'
import JobPostSector from '../../components/custom/JobPostSector'
import RoundButton from '../../components/button/RoundButton'
import {em, WIDTH, HEIGHT} from '../../common'
import Modal from 'react-native-modal'

import {TitleText, CommonText, CommonRegularText, CommonItalicText, MediumRegularText} from '../../components/text'

class SearchTabDetailScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      isModalVisible: false
    }
  }

  render() {
    const { title } = this.props.route.params
    const { applied } = this.props.route.params
    const { favorite } = this.props.route.params
    const { isGlobal } = this.props.route.params
    let favoriteImageResource = require('../../assets/images/ic_favorite_off.png')
    if (favorite) {
      favoriteImageResource = require('../../assets/images/ic_favorite_on.png')
    }
    let responsibility = "Disponibilité: "

    return (
      <VerticalFlowLayout style={{width: WIDTH, height: HEIGHT, backgroundColor: "#f5f6fa"}}>
        <View style={{height: HEIGHT - 220*em}}>
          <AccountLayout>
            {this.state.isModalVisible &&
            <StatusBar barstyle="dark-content" translucent backgroundColor="#18277a" />}
            {!this.state.isModalVisible &&
            <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />}
            <HorizontalJustifyLayout style={{marginTop: 25 * em, marginBottom: 5 * em}}>
              <HorizontalLayout>
                <TouchableOpacity onPress={() => {
                  this.props.navigation.goBack()
                }}>
                  <Image source={require('../../assets/images/ic_back.png')} style={{width: 30 * em, height: 30 * em}} resizeMode={'stretch'} />
                </TouchableOpacity>
              </HorizontalLayout>
              <HorizontalLayout>
                {isGlobal &&
                <Image source={require('../../assets/images/ic_global.png')}
                  style={{width: 12 * em, height: 12 * em, marginRight: 5 * em}}
                  resizeMode={'stretch'} />
                }
                <CommonText theme="primary">{ title }</CommonText>
              </HorizontalLayout>
              <Image source={favoriteImageResource} style={{width: 20 * em, height: 20 * em}} resizeMode={'stretch'} />
            </HorizontalJustifyLayout>
            <CommonRegularText theme="black" style={{marginLeft: 15 * em}}>
              Cdi - 33000 Bordeaux
            </CommonRegularText>
            <HorizontalLayout style={{marginTop: 5 * em}}>
              <CommonRegularText theme="gray" style={{alignSelf: "flex-start"}}>
                {responsibility}
              </CommonRegularText>
              <CommonItalicText theme="black">
                ASAP
              </CommonItalicText>
            </HorizontalLayout>
            <VerticalFlowLayout style={{width: WIDTH * 0.85, backgroundColor: "#ffffff", borderRadius: 10 * em, marginTop: 20*em}}>
              <JobPostSector type="description" text='Venez "matcher" avec Cyllene ! Cyllene c&apos;est 400 collaborateurs, qui accompagnent quotidiennement leurs clients dans le domaine du numerique et de la gestion des donnees : hebergement en Datacenters prives ou en Cloud public, Cyber securite, developpement web & mobile, marketing digital, solutions collaboratives...' />
              <JobPostSector type="mission" applied={true} text='Venez "matcher" avec Cyllene ! Cyllene c&apos;est 400 collaborateurs, qui accompagnent quotidiennement leurs clients dans le domaine du numerique et de la gestion des donnees : hebergement en Datacenters prives ou en Cloud public, Cyber securite, developpement web & mobile, marketing digital, solutions collaboratives...' />
              <JobPostSector type="profile_research" text='Venez "matcher" avec Cyllene ! Cyllene c&apos;est 400 collaborateurs, qui accompagnent quotidiennement leurs clients dans le domaine du numerique et de la gestion des donnees : hebergement en Datacenters prives ou en Cloud public, Cyber securite, developpement web & mobile, marketing digital, solutions collaboratives...'/>
              <JobPostSector type="information" text='Venez "matcher" avec Cyllene ! Cyllene c&apos;est 400 collaborateurs, qui accompagnent quotidiennement leurs clients dans le domaine du numerique et de la gestion des donnees : hebergement en Datacenters prives ou en Cloud public, Cyber securite, developpement web & mobile, marketing digital, solutions collaboratives...'/>
            </VerticalFlowLayout>
          </AccountLayout>
        </View>
        <TouchableOpacity onPress={() => {
          this.setState({isModalVisible: true})
        }}>
          { applied &&
            <RoundButton text="Déjà postulé" leftIcon="applied" theme="green" style={{marginTop: 15 * em, alignSelf: "center"}}/>
          }
          { !applied &&
            <RoundButton text="Postuler" rightIcon="next" style={{marginTop: 15 * em, marginBottom: 80 * em, alignSelf: "center"}}/>
          }
        </TouchableOpacity>

        <Modal isVisible={this.state.isModalVisible} backdropColor="#18277a" backdropOpacity={0.95}>
          <VerticalCenterFlowLayout style={{flex: 1}}>
            <VerticalCenterFlowLayout style={{flex: 1}}/>
            <VerticalCenterFlowLayout style={{padding: 20*em, backgroundColor: "#ffffff", borderRadius: 22*em, width: WIDTH * 0.85, marginBottom: 15*em}}>
              <Image source={require('../../assets/images/ic_job_applied.png')}
                style={{width: 55 * em, height: 55 * em, marginTop: 10 * em}}
                resizeMode={'stretch'} />
              <TitleText theme="black" style={{marginTop: 10 * em, marginHorizontal: 45*em, textAlign: "center"}}>Votre candidature a bien ete envoyée !</TitleText>
              <CommonRegularText theme="gray" style={{marginTop: 10 * em}}>Votre agence:</CommonRegularText>
              <CommonText theme="black" style={{marginTop: 10 * em}}>Genesis-rh macon</CommonText>
              <HorizontalLayout style={{width: 130*em}}>
                <Image source={require('../../assets/images/ic_address.png')}
                  style={{width: 13 * em, height: 13 * em, marginTop: 10 * em}}
                  resizeMode={'stretch'} />
                <CommonRegularText theme="gray" style={{marginTop: 10 * em, marginLeft: 10*em}}>38-40 Rue Victor Hugo 71000 Macon</CommonRegularText>
              </HorizontalLayout>
              <HorizontalLayout style={{width: 130*em}}>
                <Image source={require('../../assets/images/ic_phone.png')}
                  style={{width: 13 * em, height: 13 * em, marginTop: 10 * em}}
                  resizeMode={'stretch'} />
                <CommonRegularText theme="gray" style={{marginTop: 10 * em, marginLeft: 10*em}}>03 85 20 30 00</CommonRegularText>
              </HorizontalLayout>
              <HorizontalLayout style={{width: 130*em}}>
                <Image source={require('../../assets/images/ic_cell_phone.png')}
                  style={{width: 13 * em, height: 13 * em, marginTop: 10 * em}}
                  resizeMode={'stretch'} />
                <CommonRegularText theme="gray" style={{marginTop: 10 * em, marginLeft: 10*em}}>06 00 00 00 00</CommonRegularText>
              </HorizontalLayout>
              <CommonRegularText theme="gray" style={{alignSelf: "center", marginTop: 15*em, textAlign: "center"}}>
                Lo ou la chargé(e) de recrutement vous recontactera.
              </CommonRegularText>
            </VerticalCenterFlowLayout>
            <TouchableOpacity onPress={() => {
              this.setState({isModalVisible: false})
            }}>
              <RoundButton text="Fermer" theme="negative"/>
            </TouchableOpacity>
          </VerticalCenterFlowLayout>
        </Modal>
      </VerticalFlowLayout>
    );
  }
}

export default SearchTabDetailScreen
