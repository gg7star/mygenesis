import React, { Component } from 'react';
import { Text, View, ImageBackground } from 'react-native';

import {WIDTH, HEIGHT, em} from '../common';

const HorizontalJustifyLayout = (props) => {
    return (
      <ImageBackground style={[{
          width: WIDTH * 0.85,
          flexDirection: 'row',
          alignItems: "center",
          justifyContent: 'space-between'
        }, props.style]}
         resizeMode={'cover'}
         source={props.source} >
        {props.children}
      </ImageBackground>
    );
}

export default HorizontalJustifyLayout
