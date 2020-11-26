import React, { Component } from 'react';
import { Text, View, ImageBackground } from 'react-native';

import {WIDTH, HEIGHT, em} from '../common';

const VerticalCenterFlowLayout = props => {
  return (
    <ImageBackground
      style={[
        { 
          flexDirection: 'column',
          alignItems: 'center',
        },
        props.style,
      ]}
      resizeMode={'cover'}
      source={props.source}>
      {props.children}
    </ImageBackground>
  );
}

export default VerticalCenterFlowLayout
