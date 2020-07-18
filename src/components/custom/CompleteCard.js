import React, { Component } from 'react';
import { Image } from 'react-native';
import VerticalCenterLayout from '../../layouts/VerticalCenterLayout'
import {CommonText} from '../text'

import {em, WIDTH} from '../../common';

const CompleteCard = (props) => {
    let imageResource = require('../../assets/images/ic_my_information.png')
    let textContent = 'Mes\ninformations'
    if (props.type == "follow_up") {
      textContent = "Mon\nsuivi"
      imageResource = require('../../assets/images/ic_my_follow_up.png')
    }
    else if (props.type == "availability") {
      textContent = "Mes\ndisponibilités"
      imageResource = require('../../assets/images/ic_my_availability.png')
    }
    else if (props.type == "contact_us") {
      textContent = "Nous\ncontacter"
      imageResource = require('../../assets/images/ic_contact_us.png')
    }
    return (
      <VerticalCenterLayout style={[{width: WIDTH * 0.4, paddingHorizontal: 20*em, paddingVertical: 30*em, backgroundColor: "#ffffff", borderRadius: 20*em}, props.style]}>
        <Image source={imageResource}
          style={{width: 60 * em, height: 60 * em}} resizeMode={'stretch'} />
        <CommonText theme="primary" style={{textAlign: "center", marginTop: 12*em}}>{textContent}</CommonText>
      </VerticalCenterLayout>
    );
}

export default CompleteCard
