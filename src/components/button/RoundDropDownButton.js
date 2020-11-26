import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import {WIDTH, HEIGHT, em} from '../../common';
import HorizontalJustifyLayout from '../../layouts/HorizontalJustifyLayout';
import {CommonText} from '../../components/text';
import commonStyles from '../common_styles';

const RoundDropDownButton = (props) => {
  let expand = false
  if (props.expand) {
    expand = props.expand
  }
  let theme="gray"
  if (props.theme) {
    theme = props.theme
  }
  return (
    <HorizontalJustifyLayout style={[{height: 56*em,
      width: '100%', //WIDTH * 0.85,
      backgroundColor: "#ffffff",
      borderRadius: 22*em,
      paddingHorizontal: 25*em},
      commonStyles.shadow.dropdown,
      props.style]}>
        <CommonText theme={theme}>{props.text}</CommonText>
        {!expand &&
          <Image source={require('../../assets/images/ic_dropdown.png')} style={{width: 20*em, height: 20*em}} resizeMode={'stretch'} />
        }
        {expand &&
          <Image source={require('../../assets/images/ic_collapse.png')} style={{width: 20*em, height: 20*em}} resizeMode={'stretch'} />
        }
    </HorizontalJustifyLayout>
  )
}

export default RoundDropDownButton
