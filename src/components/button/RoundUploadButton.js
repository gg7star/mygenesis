import React, { Component } from 'react';
import { Image } from 'react-native';

import {WIDTH, HEIGHT, em} from '../../common';
import HorizontalJustifyLayout from '../../layouts/HorizontalJustifyLayout';
import {CommonText} from '../../components/text';
import commonStyles from '../common_styles';

const RoundDropDownButton = (props) => {
  return (
    <HorizontalJustifyLayout style={[{height: 56*em,
      width: '100%', //WIDTH * 0.85,WIDTH * 0.85,
      backgroundColor: "#ffffff",
      borderRadius: 22*em,
      paddingHorizontal: 25*em},
      commonStyles.shadow.dropdown,
      props.style]}>
        <CommonText theme="green">{props.text}</CommonText>
        <Image source={require('../../assets/images/ic_upload.png')} style={{width: 30*em, height: 30*em}} resizeMode={'stretch'} />
    </HorizontalJustifyLayout>
  )
}

export default RoundDropDownButton
