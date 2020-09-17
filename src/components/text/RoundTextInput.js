import React, { Component } from 'react';
import { TextInput, View } from 'react-native';

import {WIDTH, HEIGHT, em} from '../../common';
import CommonText from './CommonText'
import SmallButtonText from './SmallButtonText'
import HorizontalCenterLayout from '../../layouts/HorizontalCenterLayout'
import HorizontalLayout from '../../layouts/HorizontalLayout'

const RoundTextInput = (props) => {
    // const [value, onChangeText] = React.useState(props.placeHolder);
    var propTextContentType = "none"
    var propSecureTextEntry = false
    if (props.textContentType) {
      propTextContentType = props.textContentType
    }
    if (props.secureTextEntry) {
      propSecureTextEntry = props.secureTextEntry
    }
    var textLength = 0
    if (props.rightText) {
      textLength = props.rightText.length * 8.5 * em
    }
    let textAlignVertical = "center"
    if (props.multiline) {
      textAlignVertical = "top"
    }
    return (
      <HorizontalLayout style={[{
      borderColor: '#ffffff',
      backgroundColor: "#ffffff",
      borderWidth: 1,
      borderRadius: 22*em}, props.style]}>
        <TextInput multiline={props.multiline}
          style={[{ width: WIDTH * 0.85 - textLength - 50*em,
            height: 56*em, fontFamily: 'Lato-Bold', fontSize: 16*em, paddingVertical: 10*em,
            marginLeft: 25*em}, props.textInputStyle]}
          onChangeText={props.handleChange}
          value={props.value}
          textAlignVertical={textAlignVertical}
          editable={true}
          textContentType = {propTextContentType}
          secureTextEntry = {propSecureTextEntry}
          placeholder = {props.placeHolder} />

          <HorizontalCenterLayout style={{width: textLength, height: 56 * em, marginRight: 25*em}}>
            <SmallButtonText theme="green">{props.rightText}</SmallButtonText>
          </HorizontalCenterLayout>

      </HorizontalLayout>
    );
}

export default RoundTextInput
