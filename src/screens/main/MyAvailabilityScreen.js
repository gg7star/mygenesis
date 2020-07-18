import React, { Component } from 'react'
import { TouchableOpacity, StatusBar, Image, View } from "react-native"
import {TitleText, CommonText, CommonRegularText, MediumText, SmallText} from '../../components/text'
import {em, WIDTH} from '../../common'
import AccountLayout from '../../layouts/AccountLayout'
import HorizontalJustifyLayout from '../../layouts/HorizontalJustifyLayout'
import HorizontalLayout from '../../layouts/HorizontalLayout'
import VerticalCenterFlowLayout from '../../layouts/VerticalCenterFlowLayout'
import VerticalFlowLayout from '../../layouts/VerticalFlowLayout'
import RoundButton from '../../components/button/RoundButton'

class MyAvailabilityScreen extends Component {
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
            <CommonText theme="blue_gray" style={{marginLeft: 5 * em}}>Mes disponibilités</CommonText>
            <View style={{width: 30*em}}/>
          </HorizontalJustifyLayout>
          <CommonRegularText theme="gray" style={{marginTop: 5*em}}>Si vous avez des indisponibilités merci de nous</CommonRegularText>
          <CommonRegularText theme="green" style={{textDecorationLine: "underline"}}>contacter</CommonRegularText>
          <HorizontalLayout style={{backgroundColor: "#ffffff", borderRadius: 20*em, marginTop: 15*em, padding: 15*em, width: WIDTH * 0.85}}>
            <HorizontalJustifyLayout style={{flex: 3}}>
              <HorizontalLayout>
                <View style={{backgroundColor: "#01d9ce", width: 12*em, height: 12*em, borderRadius: 6*em}}/>
                <VerticalFlowLayout style={{marginLeft: 10*em}}>
                  <MediumText theme="gray">Je suis disponible</MediumText>
                  <CommonRegularText theme="gray">à partir du:</CommonRegularText>
                </VerticalFlowLayout>
              </HorizontalLayout>
              <View style={{width: 1, height: 22*em, backgroundColor: "#6b7783"}}/>
            </HorizontalJustifyLayout>
            <HorizontalJustifyLayout style={{flex: 2}}>
              <View style={{width: 1, height: 22*em}}/>
              <HorizontalLayout>
                <TitleText theme="primary">04</TitleText>
                <VerticalFlowLayout style={{marginLeft: 6*em}}>
                  <SmallText theme="primary">juin</SmallText>
                  <SmallText theme="primary">2020</SmallText>
                </VerticalFlowLayout>
              </HorizontalLayout>
              <Image source={require('../../assets/images/btn_dot_menu.png')} style={{width: 20*em, height: 20*em}} resizeMode={'stretch'} />
            </HorizontalJustifyLayout>
          </HorizontalLayout>

          <MediumText theme="primary" style={{marginTop: 25*em}}>Mes creneaux horaires par jour</MediumText>
          <VerticalCenterFlowLayout style={{width: WIDTH * 0.85, borderRadius: 20*em, marginTop: 10*em, backgroundColor: "#ffffff"}}>
            <HorizontalLayout style={[{borderTopLeftRadius: 20*em, borderTopRightRadius: 20*em}, styles.weekItemContainer]}>
              <HorizontalLayout style={{flex: 1}}>
              </HorizontalLayout>
              <HorizontalLayout style={{flex: 1}}>
                <View style={styles.realSeparator}/>
              </HorizontalLayout>
              <HorizontalLayout style={{flex: 1}}>
                <View style={styles.realSeparator}/>
              </HorizontalLayout>
              <HorizontalLayout style={{flex: 1}}>
                <View style={styles.realSeparator}/>
              </HorizontalLayout>
              <HorizontalLayout style={{flex: 1}}>
                <View style={styles.realSeparator}/>
              </HorizontalLayout>
            </HorizontalLayout>
            <HorizontalLayout style={[styles.weekItemContainer]}>
              <HorizontalJustifyLayout style={{flex:1}}>
                <View style={styles.fakeSeparator}/>
                <HorizontalLayout style={[styles.weekStartItem]}>
                </HorizontalLayout>
                  <View style={styles.realSeparator}/>
              </HorizontalJustifyLayout>
              <HorizontalLayout style={{flex: 1}}>
                <View style={styles.fakeSeparator}/>
                <HorizontalLayout style={[styles.weekItem]}>
                </HorizontalLayout>
                <View style={styles.realSeparator}/>
              </HorizontalLayout>
              <HorizontalLayout style={styles.weekItem}>
                <View style={styles.fakeSeparator}/>
              </HorizontalLayout>
              <HorizontalLayout style={styles.weekItem}>
                <View style={styles.fakeSeparator}/>
              </HorizontalLayout>
              <HorizontalLayout style={styles.weekEndItem}>
                <View style={styles.fakeSeparator}/>
              </HorizontalLayout>
            </HorizontalLayout>
          </VerticalCenterFlowLayout>
        </AccountLayout>
    );
  }
}

const styles = {
  fakeSeparator: {
      width: 1*em,
      height: 56*em,
  },

  realSeparator: {
      width: 1*em,
      height: 58*em,
      backgroundColor: "#bb7783"
  },

  weekItemContainer: {
    width: WIDTH * 0.85,
    height: 56*em,
    backgroundColor: '#ffffff',
  },

  weekStartItem: {
    flex: 1,
    backgroundColor: '#f4f5f9',
    height: 50*em,
    borderTopLeftRadius: 15*em,
    borderBottomLeftRadius: 15*em,
    marginLeft: 5*em
  },

  weekEndItem: {
    flex: 1,
    backgroundColor: '#f4f5f9',
    height: 50*em,
    borderTopRightRadius: 15*em,
    borderBottomRightRadius: 15*em,
  },

  weekItem: {
    flex: 1,
    backgroundColor: '#f4f5f9',
    height: 50*em,
  },
}

export default MyAvailabilityScreen
