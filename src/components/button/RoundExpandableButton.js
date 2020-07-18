import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import {WIDTH, HEIGHT, em} from '../../common';
import HorizontalJustifyLayout from '../../layouts/HorizontalJustifyLayout'
import {CommonText} from '../../components/text'

const RoundExpandableButton = (props) => {
  let propsTheme = "primary"
  if (props.theme) {
    propsTheme = props.theme
  }
  return (
    <HorizontalJustifyLayout style={[{height: 56*em,
      width: WIDTH * 0.85,
      backgroundColor: "#ffffff",
      borderRadius: 22*em,
      paddingHorizontal: 28*em},
      props.style]}>
        <CommonText theme={propsTheme}>{props.text}</CommonText>
        <Image source={require('../../assets/images/ic_expand.png')} style={{width: 20*em, height: 20*em}} resizeMode={'stretch'} />
    </HorizontalJustifyLayout>
  )
}

export default RoundExpandableButton
