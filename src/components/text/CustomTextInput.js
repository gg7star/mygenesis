import React, { Component } from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';

import {WIDTH, HEIGHT, em} from '../../common';
import CommonText from './CommonText';
import SmallButtonText from './SmallButtonText';
import HorizontalCenterLayout from '../../layouts/HorizontalCenterLayout';
import HorizontalLayout from '../../layouts/HorizontalLayout';
import commonStyles from '../common_styles';

const CustomTextInput = props => {
  // const [value, onChangeText] = React.useState(props.placeHolder);
  var propTextContentType = 'none';
  var propSecureTextEntry = false;
  if (props.textContentType) {
    propTextContentType = props.textContentType;
  }
  if (props.secureTextEntry) {
    propSecureTextEntry = props.secureTextEntry;
  }
  var textLength = 0;
  if (props.rightText) {
    textLength = props.rightText.length * 8.5 * em;
  }
  let textAlignVertical = 'center';
  if (props.multiline) {
    textAlignVertical = 'top';
  }
  var propKeyboardType = 'default';
  if (props.keyboardType) {
    propKeyboardType = props.keyboardType;
  }
  return (
    <HorizontalLayout
      style={[
        {
          borderColor: '#ffffff',
          backgroundColor: '#ffffff',
          borderWidth: 1,
          // borderRadius: 22 * em,
        },
        commonStyles.shadow.textEdit,
        props.style,
      ]}>
      <TextInput
        multiline={props.multiline}
        style={[
          {
            // width: WIDTH * 0.85 - textLength - 50 * em,
            width: '100%',
            height: commonStyles.height * em,
            fontFamily: 'Lato-Bold',
            fontSize: 16 * em,
            paddingVertical: 10 * em,
            marginLeft: 25 * em,
            color: '#090F36'
          },
          props.textInputStyle,
        ]}
        onChangeText={props.handleChange}
        value={props.value}
        textAlignVertical={textAlignVertical}
        editable={true}
        textContentType={propTextContentType}
        secureTextEntry={propSecureTextEntry}
        placeholder={props.placeHolder}
        keyboardType={propKeyboardType}
        placeholderTextColor={'#5B6777'}
      />
      <TouchableOpacity
        style={{width: '20%', position: 'absolute', right: 0}}
        onPress={props.onPressRightText}>
        <HorizontalCenterLayout style={{width: '100%', height: 56 * em}}>
          {/* {style={{width: textLength, height: 56 * em, marginRight: 25 * em}}>} */}
          <SmallButtonText theme="green">{props.rightText}</SmallButtonText>
        </HorizontalCenterLayout>
      </TouchableOpacity>
    </HorizontalLayout>
  );
};

export default CustomTextInput;
