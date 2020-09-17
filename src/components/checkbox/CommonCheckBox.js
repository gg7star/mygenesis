import React, { Component, useState } from 'react';
import { Text, View, Image } from 'react-native';
import VerticalCenterFlowLayout from '../../layouts/VerticalCenterFlowLayout'
import HorizontalLayout from '../../layouts/HorizontalLayout'

import {WIDTH, HEIGHT, em} from '../../common';
import CheckBox from '@react-native-community/checkbox';
import SmallText from '../../components/text/SmallText';

const CommonCheckBox = (props) => {
    return (
        <HorizontalLayout style={[{width: WIDTH * 0.85},
          props.style]}>
          <CheckBox
            style={{marginRight:5*em, width: 15*em, height: 15*em}}
            disabled={false}
            value={props.toggleCheckBox}
            onValueChange={props.onValueChange}
          />
          <SmallText theme="gray">{props.text}</SmallText>
        </HorizontalLayout>
    );
}

export default CommonCheckBox
