import React, { Component } from 'react'
import { TouchableOpacity, StatusBar, Image, View, StyleSheet, Text} from "react-native"
import {TitleText, CommonText, CommonRegularText, MediumText, SmallText, TinyText} from '../../components/text'
import {em, WIDTH} from '../../common'
import AccountLayout from '../../layouts/AccountLayout'
import HorizontalJustifyLayout from '../../layouts/HorizontalJustifyLayout'
import HorizontalLayout from '../../layouts/HorizontalLayout'
import HorizontalCenterLayout from '../../layouts/HorizontalCenterLayout'
import VerticalCenterFlowLayout from '../../layouts/VerticalCenterFlowLayout'
import VerticalFlowLayout from '../../layouts/VerticalFlowLayout'
import RoundButton from '../../components/button/RoundButton'
import Modal from 'react-native-modal'
import DatePicker from 'react-native-date-picker'

class MyAvailabilityScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      isModalVisible: false
    }
    this.state = { chosenDate: new Date() }
    this.setDate = this.setDate.bind(this)
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  render() {
    let checkImageSource = require('../../assets/images/check_circled.png')
    return (
        <AccountLayout>
          {this.state.isModalVisible &&
          <StatusBar barstyle="dark-content" translucent backgroundColor="#18277a" />}
          {!this.state.isModalVisible &&
          <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />}
          <HorizontalJustifyLayout style={{marginTop: 25 * em}}>
            <TouchableOpacity onPress={() => {
              this.props.navigation.goBack()
            }}>
              <Image source={require('../../assets/images/ic_back.png')} style={{width: 30*em, height: 30*em}} resizeMode={'stretch'} />
            </TouchableOpacity>
            <CommonText theme="blue_gray" style={{marginLeft: 5 * em}}>Mes disponibilités</CommonText>
            <View style={{width: 30*em}}/>
          </HorizontalJustifyLayout>
          <CommonRegularText theme="gray" style={{marginTop: 5*em}}>Si vous avez des indisponibilités merci de nous</CommonRegularText>
          <CommonRegularText theme="green" style={{textDecorationLine: "underline"}}>contacter</CommonRegularText>
          <HorizontalLayout style={{backgroundColor: "#ffffff", borderRadius: 20*em, marginTop: 15*em, width: WIDTH * 0.85}}>
            <HorizontalJustifyLayout style={{flex: 3}}>
              <HorizontalLayout style={{padding: 15*em}}>
                <View style={{backgroundColor: "#01d9ce", width: 12*em, height: 12*em, borderRadius: 6*em}}/>
                <VerticalFlowLayout style={{marginLeft: 10*em}}>
                  <MediumText theme="gray">Je suis disponible</MediumText>
                  <CommonRegularText theme="gray">à partir du:</CommonRegularText>
                </VerticalFlowLayout>
              </HorizontalLayout>
              <View style={{width: 1, height: 22*em}}/>
            </HorizontalJustifyLayout>
            <HorizontalJustifyLayout style={{flex: 2}}>
              <View style={{width: 1*em, height: 22*em, backgroundColor: "#f4f5f9"}}/>
              <TouchableOpacity onPress={() => {
                this.setState({isModalVisible: true})
              }}>
                <HorizontalLayout>
                  <TitleText theme="primary">04</TitleText>
                  <VerticalFlowLayout style={{marginLeft: 6*em}}>
                    <SmallText theme="primary">juin</SmallText>
                    <SmallText theme="primary">2020</SmallText>
                  </VerticalFlowLayout>
                </HorizontalLayout>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                this.setState({isModalVisible: true})
              }}>
                <Image source={require('../../assets/images/btn_dot_menu.png')} style={{width: 20*em, height: 20*em}} resizeMode={'stretch'} />
              </TouchableOpacity>
            </HorizontalJustifyLayout>
          </HorizontalLayout>

          <MediumText theme="primary" style={{marginTop: 25*em}}>Mes creneaux horaires par jour</MediumText>
          <VerticalCenterFlowLayout style={styles.weekDataContainer}>
            <HorizontalLayout style={[{borderRadius: 20*em}, styles.weekItemContainer]}>
              <HorizontalCenterLayout style={styles.weekItem}>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
                <TinyText theme="black">Martin</TinyText>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
                <TinyText theme="black">Soir</TinyText>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
                <TinyText theme="black">Nuit</TinyText>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
                <TinyText theme="black">Journée</TinyText>
              </HorizontalCenterLayout>
            </HorizontalLayout>
            <HorizontalLayout style={[{borderRadius: 20*em}, styles.weekItemContainer]}>
              <HorizontalCenterLayout style={styles.weekItemGrayShadow}>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <CommonText theme="black">Lun</CommonText>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
                <Image source={checkImageSource} style={styles.checkImage} resizeMode={'stretch'} />
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
                <Image source={checkImageSource} style={styles.checkImage} resizeMode={'stretch'} />
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
              </HorizontalCenterLayout>
            </HorizontalLayout>
            <HorizontalLayout style={[{borderRadius: 20*em}, styles.weekItemContainer]}>
              <HorizontalCenterLayout style={styles.weekItem}>
                <CommonText theme="black">Mar</CommonText>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
                <Image source={checkImageSource} style={styles.checkImage} resizeMode={'stretch'} />
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
              </HorizontalCenterLayout>
            </HorizontalLayout>
            <HorizontalLayout style={[{borderRadius: 20*em}, styles.weekItemContainer]}>
              <HorizontalCenterLayout style={styles.weekItemGrayShadow}>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <CommonText theme="black">Mer</CommonText>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
              </HorizontalCenterLayout>
            </HorizontalLayout>
            <HorizontalLayout style={[{borderRadius: 20*em}, styles.weekItemContainer]}>
              <HorizontalCenterLayout style={styles.weekItem}>
                <CommonText theme="black">Jeu</CommonText>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
              </HorizontalCenterLayout>
            </HorizontalLayout>
            <HorizontalLayout style={[{borderRadius: 20*em}, styles.weekItemContainer]}>
              <HorizontalCenterLayout style={styles.weekItemGrayShadow}>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <CommonText theme="black">Ven</CommonText>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
              </HorizontalCenterLayout>
            </HorizontalLayout>
            <HorizontalLayout style={[{borderRadius: 20*em}, styles.weekItemContainer]}>
              <HorizontalCenterLayout style={styles.weekItem}>
                <CommonText theme="black">Sam</CommonText>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
                <Image source={checkImageSource} style={styles.checkImage} resizeMode={'stretch'} />
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
              </HorizontalCenterLayout>
            </HorizontalLayout>
            <HorizontalLayout style={[{borderRadius: 20*em}, styles.weekItemContainer]}>
              <HorizontalCenterLayout style={styles.weekItemGrayShadow}>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <CommonText theme="black">Dim</CommonText>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
              </HorizontalCenterLayout>
              <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
              </HorizontalCenterLayout>
            </HorizontalLayout>
          </VerticalCenterFlowLayout>

          <Modal isVisible={this.state.isModalVisible} backdropColor="#18277a" backdropOpacity={0.95}>
              <VerticalCenterFlowLayout style={styles.modalRoundContainer}>
                <HorizontalLayout style={{backgroundColor: "#ffffff", borderRadius: 20*em}}>
                  <HorizontalJustifyLayout style={{flex: 3}}>
                    <HorizontalLayout>
                      <View style={styles.borderdCircle}/>
                      <VerticalFlowLayout style={{marginLeft: 10*em}}>
                        <MediumText theme="gray">Je suis disponible</MediumText>
                        <CommonRegularText theme="gray">à partir du:</CommonRegularText>
                      </VerticalFlowLayout>
                    </HorizontalLayout>
                    <View style={{width: 1, height: 22*em}}/>
                  </HorizontalJustifyLayout>
                  <HorizontalLayout style={{flex: 2}}>
                    <View style={{width: 1*em, height: 22*em, backgroundColor: "#f4f5f9"}}/>
                    <HorizontalLayout style={{marginLeft: 20*em}}>
                      <TitleText theme="green">04</TitleText>
                      <VerticalFlowLayout style={{marginLeft: 6*em}}>
                        <SmallText theme="green">juin</SmallText>
                        <SmallText theme="green">2020</SmallText>
                      </VerticalFlowLayout>
                    </HorizontalLayout>
                  </HorizontalLayout>
                </HorizontalLayout>
                <HorizontalLayout style={{backgroundColor: "#f4f5f9", borderRadius: 15*em, marginTop: 15*em, marginBottom: 5*em}}>
                  <DatePicker
                    date={this.state.chosenDate}
                    onDateChange={this.setDate}
                    mode='date'
                    locale='fr'
                    fadeToColor="#f4f5f9"
                    textColor="#1de1d7"
                    style={{width: WIDTH * 0.78, borderRadius: 15*em, marginVertical: 10*em}}
                  />
                </HorizontalLayout>
                <HorizontalJustifyLayout style={{width: "100%", marginTop: 10*em}}>
                  <TouchableOpacity onPress={() => {
                    this.setState({isModalVisible: false})
                  }}>
                    <RoundButton text="Annuler" style={styles.modalButton} theme="gray"/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    this.setState({isModalVisible: false})
                  }}>
                    <RoundButton text="Enregistrer" style={styles.modalButton} theme="primary"/>
                  </TouchableOpacity>
                </HorizontalJustifyLayout>
              </VerticalCenterFlowLayout>
          </Modal>
        </AccountLayout>
    );
  }
}

const styles = {
  weekDataContainer: {
    width: WIDTH * 0.85,
    borderRadius: 20*em,
    marginTop: 10*em,
    marginBottom: 20*em,
    paddingBottom: 10*em,
    backgroundColor: "#ffffff",
  },

  weekItemContainer: {
    width: WIDTH * 0.85,
    height: 56*em,
    backgroundColor: '#ffffff',
  },

  weekItemGrayShadow: {
    position: 'absolute',
    left: 10*em,
    top: 5*em,
    width: WIDTH * 0.85 - 20 * em,
    height: 56*em - 10*em,
    backgroundColor: "#d4d5d911",
    borderRadius: 15*em,
  },

  weekItem: {
    flex: 1,
    height: "100%",
  },

  realSeparator: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: 1*em,
      height: 58*em,
      backgroundColor: "#f4f5f9"
  },

  checkImage: {
    width: 22*em,
    height: 22*em,
  },

  modalButton: {
    width: WIDTH * 0.37,
    height: 40*em,
  },

  borderdCircle: {
    backgroundColor: "transparent",
    width: 12*em,
    height: 12*em,
    borderRadius: 6*em,
    borderColor:"#01d9ce",
    borderWidth: 1.5*em
  },

  modalRoundContainer: {
    padding: 15*em,
    backgroundColor: "#ffffff",
    borderRadius: 22*em,
    alignSelf: "center",
    width: WIDTH * 0.85
  }
}

export default MyAvailabilityScreen
