import React, { Component, useState } from 'react'
import { Image } from 'react-native'
import VerticalCenterLayout from '../../layouts/VerticalCenterLayout'
import {CommonText} from '../text'
import DropDownPicker from 'react-native-dropdown-picker'

import {em, WIDTH} from '../../common'

const AccountDropDown = (props) => {
    const [bottomRadius, setBottomRadius] = useState(22*em)
    return (
      <DropDownPicker
          items={props.items}
          defaultValue={props.defaultValue}
          onChangeItem={props.onChangeItem}
          style={{
            backgroundColor: '#ffffff',
            borderColor: '#ffffff',
            borderTopLeftRadius: 22*em, borderTopRightRadius: 22*em,
            borderBottomLeftRadius: bottomRadius,
            borderBottomRightRadius: bottomRadius,
            paddingLeft: 20*em
          }}
          containerStyle={[{height: 56*em, width: WIDTH * 0.85, borderRadius: 22*em}, props.style]}
          placeholderStyle={{
            fontFamily: 'Lato-Bold',
            color: '#6b7783',
            fontSize: 16*em
          }}
          arrowStyle={{marginRight: 17*em}}
          arrowSize={20*em}
          placeholder={props.placeholder}
          itemStyle={{
              justifyContent: 'flex-start',
              paddingLeft: 15*em,
              height: 40*em
          }}
          activeLabelStyle={{color: '#6b4483'}}
          labelStyle={{
              fontSize: 16*em,
              fontFamily: 'Lato-Bold',
              textAlign: 'left',
              color: '#6b7783',
          }}
          dropDownStyle={{
            backgroundColor: '#ffffff',
            borderBottomLeftRadius: 22*em,
            borderBottomRightRadius: 22*em,
            borderColor: '#ffffff'
          }}
          onOpen={() => setBottomRadius(0)}
          onClose={() => setBottomRadius(22*em)}
      />
    )
}

export default AccountDropDown
