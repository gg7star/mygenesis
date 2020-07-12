import React, { Component, useState } from 'react';
import { Text, View, Image } from 'react-native';
import VerticalCenterFlowLayout from '../../layouts/VerticalCenterFlowLayout'
import HorizontalLayout from '../../layouts/HorizontalLayout'

import {WIDTH, HEIGHT, em} from '../../common';
import CheckBox from '@react-native-community/checkbox';
import SmallText from '../../components/text/SmallText';

const AgreeCheckBox = (props) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    return (
      <VerticalCenterFlowLayout style={[{height: 56*em,
        width: WIDTH * 0.85},
        props.style]}>
        <HorizontalLayout>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={() => toggleCheckBox ? setToggleCheckBox(false) : setToggleCheckBox(true)}
          />
          <SmallText theme="gray">J'accepte less</SmallText>
          <SmallText theme="primary"> Conditions generales d'utilisation</SmallText>
          <SmallText theme="gray"> et les</SmallText>
          <SmallText theme="primary"> mentions</SmallText>
        </HorizontalLayout>
        <HorizontalLayout style={{marginLeft: 48 * em, width: WIDTH * 0.85}}>
          <SmallText theme="primary"> légales</SmallText>
          <SmallText theme="gray"> de Genesis-rh.</SmallText>
        </HorizontalLayout>
      </VerticalCenterFlowLayout>
    );
}

export default AgreeCheckBox
