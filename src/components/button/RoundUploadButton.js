import React, { Component } from 'react';
import { Image } from 'react-native';

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
        <CommonText theme="green">{props.text}</CommonText>
        <Image source={require('../../assets/images/ic_upload.png')} style={{width: 30*em, height: 30*em}} resizeMode={'stretch'} />
    </HorizontalJustifyLayout>
  )
}

export default RoundDropDownButton
