import React, { Component, useState } from 'react';
import { Text, View, Image } from 'react-native';
import VerticalCenterFlowLayout from '../../layouts/VerticalCenterFlowLayout'
import HorizontalLayout from '../../layouts/HorizontalLayout'

import {WIDTH, HEIGHT, em} from '../../common'
import CheckBox from '@react-native-community/checkbox'
import SmallText from '../../components/text/SmallText'

const AgreeCheckBox = (props) => {
    return (
      <VerticalCenterFlowLayout style={[{height: 56*em,
        width: WIDTH * 0.85},
        props.style]}>
        <HorizontalLayout>
          <CheckBox
            style={{width: 15*em, height: 15*em, marginRight: 5*em}}
            disabled={false}
            value={props.value}
            onValueChange={props.onValueChange}
          />
          <SmallText theme="gray">J'accepte les</SmallText>
          <SmallText theme="primary"> conditions générales d'utilisation</SmallText>
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
