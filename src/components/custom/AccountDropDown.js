/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState} from 'react';
import { Image, View, StyleSheet} from 'react-native';
import VerticalCenterLayout from '../../layouts/VerticalCenterLayout';
import {CommonText} from '../text';
import DropDownPicker from 'react-native-dropdown-picker';

import {em, WIDTH} from '../../common';
import commonStyles from '../common_styles';

const AccountDropDown = props => {
  const [bottomRadius, setBottomRadius] = useState(22 * em);
  return (
    <DropDownPicker
      items={props.items}
      defaultValue={props.defaultValue}
      onChangeItem={props.onChangeItem}
      style={[
        {
          backgroundColor: '#ffffff',
          borderColor: '#ffffff',
          borderTopLeftRadius: 22 * em,
          borderTopRightRadius: 22 * em,
          borderBottomLeftRadius: bottomRadius,
          borderBottomRightRadius: bottomRadius,
          paddingLeft: 20 * em,
        },
        commonStyles.shadow.dropdown,
      ]}
      containerStyle={[
        {
          height: commonStyles.height * em,
          width: WIDTH * 0.85,
          borderRadius: 22 * em,
        },
        props.style,
      ]}
      placeholderStyle={{
        fontFamily: 'Lato-Bold',
        color: '#6b7783',
        fontSize: 16 * em,
      }}
      arrowStyle={{marginRight: 17 * em}}
      arrowSize={20 * em}
      placeholder={props.placeholder}
      itemStyle={{
        justifyContent: 'flex-start',
        paddingLeft: 15 * em,
        height: commonStyles.height * em,
      }}
      activeLabelStyle={{color: '#6b4483'}}
      labelStyle={{
        fontSize: 16 * em,
        fontFamily: 'Lato-Bold',
        textAlign: 'left',
        color: '#6b7783',
      }}
      dropDownStyle={{
        backgroundColor: '#ffffff',
        borderBottomLeftRadius: 22 * em,
        borderBottomRightRadius: 22 * em,
        borderTopLeftRadius: 22 * em,
        borderTopRightRadius: 22 * em,
        borderColor: '#ffffff',
        marginTop: 10 * em,
      }}
      onOpen={() => setBottomRadius(0)}
      onClose={() => setBottomRadius(22 * em)}
      zIndex={props.zIndex || 10}
      dropDownMaxHeight={350}
    />
  );
};

export default AccountDropDown;
