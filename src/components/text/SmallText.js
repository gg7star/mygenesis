import React, { Component } from 'react';
import { Text } from 'react-native';

import {WIDTH, HEIGHT, em} from '../../common';

const SmallText = (props) => {
    var propTextColor = "#ffffff"
    if (props.theme == "black") {
      propTextColor = "#334456"
    }
    else if (props.theme == "gray") {
      propTextColor = "#6b7783"
    }
    else if (props.theme == "light_gray") {
      propTextColor = "#b1b9c6"
    }
    else if (props.theme == "primary") {
      propTextColor = "#18277a"
    }
    else if (props.theme == "green") {
      propTextColor = "#1de1d7"
    }
    var size = props.size ? props.size : 10
    return (
      <Text style={[{ fontFamily: 'Lato-Bold', fontSize: size*em, color: propTextColor}, props.style]}>
        {props.children}
      </Text>
    );
}

export default SmallText
