import React, { Component } from 'react';
import { Text, View, ImageBackground } from 'react-native';

import {WIDTH, HEIGHT, em} from '../common';

const HorizontalLayout = (props) => {
    return (
      <ImageBackground style={[{
          flexDirection: 'row',
          justifyContent: "flex-start",
          alignItems: "center"
        }, props.style]}
         resizeMode={'cover'}
         source={props.source} >
        {props.children}
      </ImageBackground>
    );
}

export default HorizontalLayout
