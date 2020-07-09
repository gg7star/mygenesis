import React, { Component } from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {WIDTH, HEIGHT, em} from '../common';

const GradientProgressView = (props) => {
    return (
      <View style={[{width: 220 * em, height: 6 * em, borderRadius: 3 * em, backgroundColor: '#dce4f1'}, props.style]}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#19287b', '#1b8cac', '#2adfd6']}
        style={{width: 220 * em * props.percent / 100, height: 6 * em, borderRadius: 3 * em}}/>
      </View>
    );
}

export default GradientProgressView
