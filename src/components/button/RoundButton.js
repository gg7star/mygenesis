/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, Image, View } from 'react-native';

import {WIDTH, HEIGHT, em} from '../../common';
import HorizontalJustifyLayout from '../../layouts/HorizontalJustifyLayout';
import HorizontalCenterLayout from '../../layouts/HorizontalCenterLayout';
import {CommonText} from '../../components/text';
import commonStyles from '../common_styles';

const RoundButton = (props) => {
  var propBackColor = '#18277a'
  var textTheme = 'white'
  if (props.theme=="negative") {
    propBackColor = "#ffffff"
    textTheme = 'black'
  }
  else if (props.theme=="green") {
    propBackColor = "#1de1d7"
  }
  else if (props.theme=="gray") {
    propBackColor = "#e9e9f5"
    textTheme="primary"
  }
  var width = '100%'; //WIDTH * 0.85
  if (props.width) {
    width = props.width
  }
  // if (props.rightIcon == "next") {
  //   width = '65%'
  // }
  var height = 56 * em;
  if (props.height) {
    height = props.height
  }
  if (props.rightIcon === 'next') {
    return (
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: height,
            width: width,
            backgroundColor: propBackColor,
            borderRadius: 22 * em,
          },
          commonStyles.shadow.button,
          props.style,
        ]}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
        {/* <HorizontalCenterLayout style={{}}> */}
          <CommonText theme={textTheme}>{props.text}</CommonText>
        {/* </HorizontalCenterLayout> */}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            position: 'absolute',
            right: 0
          }}>
        <Image
          source={require("../../assets/images/ic_next_arrow.png")}
          style={{width: 50 * em, height: 30 * em}}
          resizeMode={'center'} />
          </View>
      </View>
    );
  }
  else if (props.leftIcon === 'applied') {
    return (
      <HorizontalCenterLayout
        style={[
          {
            height: height,
            width: width,
            // paddingLeft: '5%',
            // paddingRight: '5%',
            backgroundColor: propBackColor,
            borderRadius: 22 * em,
          },
          commonStyles.shadow.button,
          props.style,
        ]}
      >
        <Image
          source={require('../../assets/images/ic_applied.png')}
          style={{width: 14 * em, height: 15 * em, marginRight: 5 * em}}
          resizeMode={'stretch'} />
        <CommonText theme={textTheme}>{props.text}</CommonText>
      </HorizontalCenterLayout>
    );
  }

  return (
    <HorizontalCenterLayout
      style={[
        {
          height: height,
          width: width,
          paddingLeft: '5%',
          paddingRight: '5%',
          backgroundColor: propBackColor,
          borderRadius: 22 * em,
        },
        commonStyles.shadow.button,
        props.style,
      ]}>
        <CommonText theme={textTheme}>{props.text}</CommonText>
    </HorizontalCenterLayout>
  );
}

export default RoundButton
