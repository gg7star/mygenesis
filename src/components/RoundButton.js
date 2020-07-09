import React, { Component } from 'react';
import { Text, Image } from 'react-native';

import {WIDTH, HEIGHT, em} from '../common';
import HorizontalJustifyLayout from '../layouts/HorizontalJustifyLayout'
import HorizontalCenterLayout from '../layouts/HorizontalCenterLayout'
import {CommonText} from '../components/text'

const RoundButton = (props) => {
  var propBackColor = '#18277a'
  var textTheme = 'white'
  if (props.theme=="negative") {
    propBackColor = "#ffffff"
    textTheme = 'black'
  }
  if (props.rightIcon == "next") {
    return (
      <HorizontalJustifyLayout style={[{height: 56*em,
        width: WIDTH * 0.85,
        backgroundColor: propBackColor,
        borderRadius: 22*em}, props.style]}>
          <HorizontalCenterLayout style={{marginLeft: 50*em, width: WIDTH * 0.85 - 100 * em}}>
            <CommonText theme={textTheme}>{props.text}</CommonText>
          </HorizontalCenterLayout>
          <Image source={require("../assets/images/ic_next_arrow.png")} style={{width: 50*em, height: 30*em}} resizeMode={'center'} />
      </HorizontalJustifyLayout>
    );
  }

  return (
    <HorizontalCenterLayout style={[{height: 56*em,
      width: WIDTH * 0.85,
      backgroundColor: propBackColor,
      borderRadius: 22*em}, props.style]}>
        <CommonText theme={textTheme}>{props.text}</CommonText>
    </HorizontalCenterLayout>
  );
}

export default RoundButton
