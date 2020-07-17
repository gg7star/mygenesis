import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import VerticalFlowLayout from '../../layouts/VerticalCenterLayout'
import HorizontalJustifyLayout from '../../layouts/HorizontalJustifyLayout'
import HorizontalLayout from '../../layouts/HorizontalLayout'
import {CommonText, CommonRegularText, CommonItalicText} from '../text'

import {WIDTH, HEIGHT, em} from '../../common';

const JobMetaAdapter = (props) => {
    let secondRow = props.durationType + " - " + props.budget + " " + props.location
    let availabilityTitle = "Disponibilité : "
    let favoriteImageResource = require('../../assets/images/ic_favorite_off.png')
    if (props.favorite) {
      favoriteImageResource = require('../../assets/images/ic_favorite_on.png')
    }
    return (
        <VerticalFlowLayout style={[{marginBottom: 15 * em,
          backgroundColor: "#ffffff",
          borderRadius: 15 * em
        },
          props.style]}>

          <HorizontalJustifyLayout>
            <HorizontalLayout style={{marginHorizontal: 15*em, marginTop: 15*em}}>
              {props.global && <Image source={require('../../assets/images/ic_global.png')}
              style={{width: 12 * em, height: 12 * em, marginRight: 5 * em}} resizeMode={'stretch'} />}
              <CommonText theme="primary">{props.title}</CommonText>
            </HorizontalLayout>
            <Image source={favoriteImageResource}
            style={{width: 16 * em, height: 16 * em, marginRight: 15*em, marginTop: 15*em}} resizeMode={'stretch'} />
          </HorizontalJustifyLayout>
          <CommonRegularText theme="black" style={{alignSelf: "flex-start", marginLeft: 15 * em, marginTop: 10 * em}}>
            {secondRow}
          </CommonRegularText>
          <HorizontalJustifyLayout style={{marginTop: 10*em}}>
            <HorizontalLayout style={{alignSelf: "flex-start", marginHorizontal: 15 * em, marginBottom: 15*em}}>
              <CommonRegularText theme="gray" style={{alignSelf: "flex-start"}}>
                {availabilityTitle}
              </CommonRegularText>
              <CommonItalicText theme="black">
                {props.availability}
              </CommonItalicText>
            </HorizontalLayout>
            {props.applied &&
              <Image source={require('../../assets/images/badge_applied.png')}
              style={{width: 70 * em, height: 16.5 * em, marginRight: 15 * em}} resizeMode={'stretch'} />}
          </HorizontalJustifyLayout>
        </VerticalFlowLayout>
    );
}

export default JobMetaAdapter
