import React, { Component } from 'react';
import { Text, View, ImageBackground } from 'react-native';

import {WIDTH, HEIGHT, em} from '../common';

const VerticalJustifyLayout = (props) => {
    return (
      <ImageBackground style={[{
          flex: 1,
          flexDirection: 'column',
          justifyContent: "space-between"
        }, props.style]}
        resizeMode={'cover'}
        source={props.source}>
        {props.children}
      </ImageBackground>
    );
}

export default VerticalJustifyLayout
