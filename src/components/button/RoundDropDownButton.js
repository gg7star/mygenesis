import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import {WIDTH, HEIGHT, em} from '../../common';
import HorizontalJustifyLayout from '../../layouts/HorizontalJustifyLayout'
import {CommonText} from '../../components/text'

const RoundDropDownButton = (props) => {
  return (
    <HorizontalJustifyLayout style={[{height: 56*em,
      width: WIDTH * 0.85,
      backgroundColor: "#ffffff",
      borderRadius: 22*em,
      paddingHorizontal: 25*em},
      props.style]}>
        <CommonText theme="gray">{props.text}</CommonText>
        <Image source={require('../../assets/images/ic_dropdown.png')} style={{width: 20*em, height: 20*em}} resizeMode={'stretch'} />
    </HorizontalJustifyLayout>
  )
}

export default RoundDropDownButton
