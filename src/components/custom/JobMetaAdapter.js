import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import VerticalFlowLayout from '../../layouts/VerticalCenterLayout'
import HorizontalJustifyLayout from '../../layouts/HorizontalJustifyLayout'
import HorizontalLayout from '../../layouts/HorizontalLayout'
import {CommonText, SmallButtonText} from '../../components/text'

import {WIDTH, HEIGHT, em} from '../../common';

const JobMetaAdapter = (props) => {
    let secondRow = props.durationType + " - " + props.budget + " " + props.location
    let availabilityTitle = "Disponibilité : "
    return (
        <VerticalFlowLayout style={[{marginBottom: 15 * em,
          backgroundColor: "#ffffff",
          borderRadius: 5 * em,
          width: WIDTH * 0.9,
          padding: 20 * em
        },
          props.style]}>

          <HorizontalJustifyLayout>
            <HorizontalLayout>
              {props.global && <Image source={require('../../assets/images/ic_global.png')} style={{width: 12 * em, height: 12 * em, marginRight: 5 * em}} resizeMode={'stretch'} />}
              <CommonText theme="primary">{props.title}</CommonText>
            </HorizontalLayout>
            <Image source={require('../../assets/images/ic_favorite_off.png')} style={{width: 16 * em, height: 16 * em}} resizeMode={'stretch'} />
          </HorizontalJustifyLayout>
          <Text style={{fontFamily: 'Lato-Regular', fontSize: 12*em, color: "#000000", alignSelf: "flex-start", marginTop: 10 * em}}>
            {secondRow}
          </Text>
          <HorizontalLayout style={{alignSelf: "flex-start", marginTop: 10 * em}}>
            <Text style={{fontFamily: 'Lato-Regular', fontSize: 12*em, color: "#6b7783", alignSelf: "flex-start"}}>
              {availabilityTitle}
            </Text>
            <Text style={{fontFamily: 'Lato-Italic', fontSize: 12*em, color: "#000000"}}>
              {props.availability}
            </Text>
          </HorizontalLayout>
        </VerticalFlowLayout>
    );
}

export default JobMetaAdapter
