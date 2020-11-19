import React, { Component, useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import VerticalCenterFlowLayout from '../../layouts/VerticalCenterFlowLayout';
import HorizontalLayout from '../../layouts/HorizontalLayout';

import {WIDTH, HEIGHT, em} from '../../common';
import CheckBox from '@react-native-community/checkbox';
import SmallText from '../../components/text/SmallText';
import commonStyles from '../common_styles';

const AgreeCheckBox = props => {
  const fontSize = 11;
  return (
    <VerticalCenterFlowLayout
      style={[
        {
          height: commonStyles.height * em,
          width: WIDTH * 0.85,
        },
        // commonStyles.shadow.dropdown,
        props.style,
      ]}>
      <HorizontalLayout>
        <CheckBox
          style={{width: 17 * em, height: 17 * em, marginRight: 5 * em}}
          disabled={false}
          value={props.value}
          onValueChange={props.onValueChange}
          tintColors={{ true: '#18277a', false: 'gray' }}
        />
        <SmallText theme="gray" size={fontSize}> J'accepte les</SmallText>
        <TouchableOpacity onPress={() => Actions.termsofservice()}>
          <SmallText theme="primary" size={fontSize}> conditions générales d'utilisation</SmallText>
        </TouchableOpacity>
        <SmallText theme="gray" size={fontSize}> et les</SmallText>
      </HorizontalLayout>
      <HorizontalLayout style={{marginLeft: 48 * em, width: WIDTH * 0.85}}>
        <TouchableOpacity onPress={() => Actions.legalnotice()}>
          <SmallText theme="primary" size={fontSize}> mentions légales</SmallText>
        </TouchableOpacity>
        <SmallText theme="gray" size={fontSize}> de Genesis-RH.</SmallText>
      </HorizontalLayout>
    </VerticalCenterFlowLayout>
  );
}

export default AgreeCheckBox;
