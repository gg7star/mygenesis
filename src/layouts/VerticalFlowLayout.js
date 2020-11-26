import React, { Component } from 'react';
import { Text, View, ImageBackground } from 'react-native';

import {WIDTH, HEIGHT, em} from '../common';

const VerticalFlowLayout = (props) => {
  return (
    <ImageBackground
      style={[
        {
          flexDirection: 'column',
        },
        props.style,
      ]}
      resizeMode={'cover'}
      source={props.source}>
      {props.children}
    </ImageBackground>
  );
}

export default VerticalFlowLayout
