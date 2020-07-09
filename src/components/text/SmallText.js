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
    else if (props.theme == "primary") {
      propTextColor = "#18277a"
    }
    return (
      <Text style={[{fontFamily: 'Lato-Bold', fontSize: 10*em, color: propTextColor}, props.style]}>
        {props.children}
      </Text>
    );
}

export default SmallText
