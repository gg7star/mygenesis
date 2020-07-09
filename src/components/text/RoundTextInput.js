import React, { Component } from 'react';
import { TextInput } from 'react-native';

import {WIDTH, HEIGHT, em} from '../../common';

const RoundTextInput = (props) => {
    const [value, onChangeText] = React.useState(props.placeHolder);
    var propTextContentType = "none"
    var propSecureTextEntry = false
    if (props.textContentType) {
      propTextContentType = props.textContentType
    }
    if (props.secureTextEntry) {
      propSecureTextEntry = props.secureTextEntry
    }
    return (
      <TextInput
        style={[{ width: WIDTH * 0.85,
          height: 56*em,
          borderColor: '#ffffff',
          borderWidth: 1,
          backgroundColor: "#ffffff", fontFamily: 'Lato-Bold', fontSize: 17*em,
          borderRadius: 22*em,
          paddingHorizontal: 25*em},
          props.style]}
        textContentType = {propTextContentType}
        secureTextEntry = {propSecureTextEntry}
        onChangeText= {text => onChangeText(text) }
        placeholder = {props.placeHolder} />
    );
}

export default RoundTextInput
