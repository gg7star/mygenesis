import React, { Component } from 'react'
import { TouchableOpacity, StatusBar, Image, View, StyleSheet, Text} from "react-native"
import { connect } from 'react-redux'

import { getAvailability, getDefaultAvailability, updateAvailability } from '../../utils/firebase/database'

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
import Spinner from 'react-native-loading-spinner-overlay'

class MyAvailabilityScreen extends Component {
  _daysOfWeek = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]
  constructor(props){
    super(props)
    this.state = {
      isModalVisible: false,
      chosenDate: new Date(),
      tempDate: new Date(),
      availability: getDefaultAvailability(),
      renderAvailability: true,
      showLoading: false,
    }
    this.setDate = this.setDate.bind(this)
    this.setTempDate = this.setTempDate.bind(this)
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate })
  }

  setTempDate(newDate) {
    this.setState({ tempDate: newDate })
  }

  getMonthOfDate(date) {
    const monthString = ["janvier", "février", "mars", "avril", "mai", "juin",
            "juillet", "août", "septembre", "octobre", "novembre", "décembre"]
    const month = date.getMonth()
    return monthString[month]
  }

  getDayOfDate(date) {
    const day = date.getDate()
    if (day < 10) {
      return "0" + day
    }
    return String(day)
  }

  getYearOfDate(date) {
    return date.getYear() + 1900
  }

  UNSAFE_componentWillMount() {
    const _this = this
    this.setState({showLoading: true})
    getAvailability().then(res => {
      let availability = res
      _this.setState({availability})
      _this.setDate(new Date(availability["startDate"]))
      _this.setTempDate(new Date(availability["startDate"]))
      _this.setState({showLoading: false})
    }).catch(e => {
      console.log("======= error", e)
    })
  }

  updateStartDateState(newDate) {
    const _this = this
    let newAvailability = JSON.parse(JSON.stringify(this.state.availability))
    newAvailability["startDate"] = newDate.toString()
    this.updateDatabaseAndState(newAvailability)
  }

  setAvailableForDay = (defaultValue, dayOfWeek, index) => {
    let newAvailability = JSON.parse(JSON.stringify(this.state.availability))
    newAvailability[dayOfWeek][index] = !defaultValue
    this.updateDatabaseAndState(newAvailability)
  }

  updateDatabaseAndState(newAvailability) {
    this.setState({showLoading: true})
    updateAvailability(newAvailability).then(res => {
      this.setState({ availability: res, showLoading: false })
      this.setDate(new Date(res["startDate"]))
      this.setTempDate(new Date(res["startDate"]))
    })
  }

  render() {
    let checkImageSource = require('../../assets/images/check_circled.png')
    let availTable = []
    availTable.push(
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
      </HorizontalLayout>)

    const _this = this
    this._daysOfWeek.map((item, index) => {
      let weekItemContainerChild = []
      if (index % 2 == 0) {
        weekItemContainerChild.push(
          <HorizontalCenterLayout style={styles.weekItemGrayShadow}>
          </HorizontalCenterLayout>
        )
      }
      weekItemContainerChild.push(
        <HorizontalCenterLayout style={styles.weekItem}>
          <CommonText theme="black">{item}</CommonText>
        </HorizontalCenterLayout>
      )
      this.state.availability[item].map((availItem, availIndex) => {
        weekItemContainerChild.push(
            <HorizontalCenterLayout style={styles.weekItem}>
                <View style={styles.realSeparator}/>
                {availItem &&
                <TouchableOpacity onPress={() => {
                    _this.setAvailableForDay(availItem, item, availIndex)
                  }}>
                    <Image source={checkImageSource} style={styles.checkImage} resizeMode={'stretch'} />
                </TouchableOpacity>}
                {!availItem &&
                <TouchableOpacity onPress={() => {
                    _this.setAvailableForDay(availItem, item, availIndex)
                  }}>
                    <Image style={styles.checkImage} resizeMode={'stretch'} />
                </TouchableOpacity>}
            </HorizontalCenterLayout>
        )
      })
      availTable.push(
        <HorizontalLayout style={[{borderRadius: 20*em}, styles.weekItemContainer]}>
          {weekItemContainerChild}
        </HorizontalLayout>
      )
    })
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
                  <TitleText theme="primary">{this.getDayOfDate(this.state.chosenDate)}</TitleText>
                  <VerticalFlowLayout style={{marginLeft: 6*em}}>
                    <SmallText theme="primary">{ this.getMonthOfDate(this.state.chosenDate) }</SmallText>
                    <SmallText theme="primary">{ this.getYearOfDate(this.state.chosenDate) }</SmallText>
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
            {availTable}
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
                      <TitleText theme="green">{ this.getDayOfDate(this.state.tempDate) }</TitleText>
                      <VerticalFlowLayout style={{marginLeft: 6*em}}>
                        <SmallText theme="green">{ this.getMonthOfDate(this.state.tempDate) }</SmallText>
                        <SmallText theme="green">{ this.getYearOfDate(this.state.tempDate) }</SmallText>
                      </VerticalFlowLayout>
                    </HorizontalLayout>
                  </HorizontalLayout>
                </HorizontalLayout>
                <HorizontalLayout style={{backgroundColor: "#f4f5f9", borderRadius: 15*em, marginTop: 15*em, marginBottom: 5*em}}>
                  <DatePicker
                    date={this.state.chosenDate}
                    onDateChange={this.setTempDate}
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
                    this.updateStartDateState(this.state.tempDate)
                  }}>
                    <RoundButton text="Enregistrer" style={styles.modalButton} theme="primary"/>
                  </TouchableOpacity>
                </HorizontalJustifyLayout>
              </VerticalCenterFlowLayout>
          </Modal>

          <Spinner
            visible={this.state.showLoading}
            textContent={''}
            textStyle={{ color: '#FFF' }}
          />
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


const mapStateToProps = state => ({
  credential: state.app.credential,
})

export default connect(
    mapStateToProps,
    null
  )(MyAvailabilityScreen)
