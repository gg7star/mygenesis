import React, { Component } from 'react';
import { Text } from 'react-native';

import {WIDTH, HEIGHT, em} from '../../common';

const MediumRegularText = (props) => {
    var propTextColor = "#ffffff"
    if (props.theme == "black") {
      propTextColor = "#0a0f37"
    }
    else if (props.theme == "gray") {
      propTextColor = "#6b7783"
    }
    else if (props.theme == "blue_gray") {
      propTextColor = "#364258"
    }
    else if (props.theme == "primary") {
      propTextColor = "#18277a"
    }
    else if (props.theme == "green") {
      propTextColor = "#1de1d7"
    }
    return (
      <Text style={[{fontFamily: 'Lato-Regular', fontSize: 15*em, color: propTextColor, lineHeight: 25 * em}, props.style]}>
        {props.children}
      </Text>
    );
}

export default MediumRegularText
