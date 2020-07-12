import React, { Component, useState } from 'react';
import { Text, View, Image } from 'react-native';
import VerticalCenterFlowLayout from '../../layouts/VerticalCenterFlowLayout'
import HorizontalLayout from '../../layouts/HorizontalLayout'

import {WIDTH, HEIGHT, em} from '../../common';
import CheckBox from '@react-native-community/checkbox';
import SmallText from '../../components/text/SmallText';

const CommonCheckBox = (props) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    return (
        <HorizontalLayout style={[{width: WIDTH * 0.85},
          props.style]}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={() => toggleCheckBox ? setToggleCheckBox(false) : setToggleCheckBox(true)}
          />
          <SmallText theme="gray">{props.text}</SmallText>
        </HorizontalLayout>
    );
}

export default CommonCheckBox
