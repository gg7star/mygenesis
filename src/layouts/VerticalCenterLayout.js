import React, { Component } from 'react';
import { Text, View, ImageBackground } from 'react-native';

import {WIDTH, HEIGHT, em} from '../common';

const VerticalCenterLayout = (props) => {
    return (
      <ImageBackground style={[{
          flexDirection: 'column',
          justifyContent: "center",
          alignItems: "center"
        }, props.style]}
         resizeMode={'cover'}
         source={props.source} >
        {props.children}
      </ImageBackground>
    );
}

export default VerticalCenterLayout
