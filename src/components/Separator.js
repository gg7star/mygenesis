import React, { Component } from 'react';
import { View } from 'react-native';
import VerticalCenterLayout from '../layouts/VerticalCenterLayout'

import {WIDTH, HEIGHT, em} from '../common';

const Separator = (props) => {
    let thickness = 2
    if (props.thickness) {
      thickness = props.thickness
    }
    return (
      <View style={[{height: thickness * em}, props.style]}>
        {props.children}
      </View>
    );
}

export default Separator
