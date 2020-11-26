import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import {WIDTH, HEIGHT, em} from '../../common';
import HorizontalJustifyLayout from '../../layouts/HorizontalJustifyLayout';
import {CommonText} from '../../components/text';
import commonStyles from '../common_styles';

const RoundExpandableButton = (props) => {
  let propsTheme = "primary"
  if (props.theme) {
    propsTheme = props.theme
  }
  return (
    <HorizontalJustifyLayout
      style={[
        {
          height: 56*em,
          width: '100%', //WIDTH * 0.85,
          backgroundColor: "#ffffff",
          borderRadius: 22*em,
          paddingHorizontal: 28*em
        },
        commonStyles.shadow.dropdown,
        props.style,
      ]}>
        <CommonText theme={propsTheme} style={commonStyles.shadow.card}>{props.text}</CommonText>
        <Image source={require('../../assets/images/ic_expand.png')} style={{width: 20*em, height: 20*em}} resizeMode={'stretch'} />
    </HorizontalJustifyLayout>
  )
}

export default RoundExpandableButton
