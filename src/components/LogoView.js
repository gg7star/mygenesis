import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import VerticalCenterLayout from '../layouts/VerticalCenterLayout'

import {WIDTH, HEIGHT, em} from '../common';

const LogoView = (props) => {
    var propWidth = 130 * em
    var propHeight = 130 * em
    var propFontSize = 27 * em
    var text = "My Genesis"
    if (props.size == "small") {
      propWidth = 40 * em
      propHeight = 40 * em
      propFontSize = 7 * em
    }
    if (props.textShow == "false") {
        text = ""
    }
    return (
      <VerticalCenterLayout style={props.style}>
        <Image source={require('../assets/images/logo.png')} style={{width: propWidth, height: propHeight}} resizeMode={'stretch'} />
        <Text style={{fontFamily: 'Lato-Bold', fontSize: propFontSize}}>{text}</Text>
      </VerticalCenterLayout>
    );
}

export default LogoView
