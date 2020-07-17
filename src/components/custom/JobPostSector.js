import React, { Component } from 'react';
import { Image } from 'react-native';
import VerticalFlowLayout from '../../layouts/VerticalCenterLayout'
import HorizontalCenterLayout from '../../layouts/HorizontalCenterLayout'
import {TitleText, CommonRegularText} from '../text'

import {WIDTH, HEIGHT, em} from '../../common';

const JobPostSector = (props) => {
    let iconResource = require('../../assets/images/ic_job_description.png')
    let sectorTitle = "Description du poste"
    if (props.type == "mission") {
      iconResource = require('../../assets/images/ic_job_mission.png')
      sectorTitle = "Missions"
    }
    else if (props.type == "profile_research") {
      iconResource = require('../../assets/images/ic_job_profile_search.png')
      sectorTitle = "Profil Rechercher"
    }
    else if (props.type == "information") {
      iconResource = require('../../assets/images/ic_job_info.png')
      sectorTitle = "Infos Utiles"
    }
    
    return (
      <VerticalFlowLayout style={[{padding: 15 * em, backgroundColor: "#ffffff", borderRadius: 10 * em}, props.style]}>
        <HorizontalCenterLayout>
          <Image source={iconResource}
            style={{width: 55 * em, height: 55 * em, marginTop: 10 * em}}
            resizeMode={'stretch'} />
        </HorizontalCenterLayout>
        <TitleText theme="black" style={{marginTop: 20 * em}}>{sectorTitle}</TitleText>
        <CommonRegularText theme="gray" style={{marginTop: 20 * em}}>{props.text}</CommonRegularText>
      </VerticalFlowLayout>
    );
}

export default JobPostSector
