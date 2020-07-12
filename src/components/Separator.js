import React, { Component } from 'react';
import { View } from 'react-native';
import VerticalCenterLayout from '../layouts/VerticalCenterLayout'

import {WIDTH, HEIGHT, em} from '../common';

const Separator = (props) => {
    return (
      <View style={[{width: WIDTH * 0.85, height: 2 * em}, props.style]}>
        {props.children}
      </View>
    );
}

export default Separator
