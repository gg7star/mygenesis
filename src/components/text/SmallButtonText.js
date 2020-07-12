import React, { Component } from 'react';
import { Text } from 'react-native';

import {WIDTH, HEIGHT, em} from '../../common';

const SmallButtonText = (props) => {
    var propTextColor = "#ffffff"
    if (props.theme == "black") {
      propTextColor = "#0a0f37"
    }
    else if (props.theme == "gray") {
      propTextColor = "#6b7783"
    }
    else if (props.theme == "primary") {
      propTextColor = "#18277a"
    }
    else if (props.theme == "green") {
      propTextColor = "#1de1d7"
    }
    return (
      <Text style={[{fontFamily: 'Lato-Bold', fontSize: 12*em, color: propTextColor}, props.style]}>
        {props.children}
      </Text>
    );
}

export default SmallButtonText
