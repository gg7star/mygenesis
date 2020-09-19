import React, { Component } from 'react';
import { Image } from 'react-native';
import VerticalFlowLayout from '../../layouts/VerticalCenterLayout'
import HorizontalCenterLayout from '../../layouts/HorizontalCenterLayout'
import HorizontalJustifyLayout from '../../layouts/HorizontalJustifyLayout'
import {TitleText, CommonRegularText} from '../text'
import Moment from 'moment'

import {WIDTH, HEIGHT, em} from '../../common';


const getMonthOfDate = (date) => {
  const monthString = ["janvier", "février", "mars", "avril", "mai", "juin",
          "juillet", "août", "septembre", "octobre", "novembre", "décembre"]
  const month = date.getMonth()
  return monthString[month]
}

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
      Moment.locale("de")
      const formattedDate = Moment(props.job.date).format("DD MMMM YYYY")
      return (
        <VerticalFlowLayout style={[{padding: 15 * em, backgroundColor: "#ffffff", borderRadius: 10 * em}, props.style]}>
          <HorizontalCenterLayout>
            <Image source={iconResource}
              style={{width: 55 * em, height: 55 * em, marginTop: 10 * em}}
              resizeMode={'stretch'} />
          </HorizontalCenterLayout>
          <TitleText theme="black" style={{marginTop: 20 * em}}>{sectorTitle}</TitleText>
          <HorizontalJustifyLayout style={{marginTop: 25 * em, marginBottom: 20 * em, marginLeft: 20*em}}>
            <CommonRegularText theme="gray">Date de démarrage : {formattedDate}</CommonRegularText>
          </HorizontalJustifyLayout>
          <HorizontalJustifyLayout style={{marginBottom: 20 * em, marginLeft: 20*em}}>
            <CommonRegularText theme="gray">Début : {props.job.duration}</CommonRegularText>
          </HorizontalJustifyLayout>
          <HorizontalJustifyLayout style={{marginBottom: 20 * em, marginLeft: 20*em}}>
            <CommonRegularText theme="gray">Contrat : {props.job.contract_type}</CommonRegularText>
          </HorizontalJustifyLayout>
          <HorizontalJustifyLayout style={{marginBottom: 20 * em, marginLeft: 20*em}}>
            <CommonRegularText theme="gray">Rémunération : {props.job.salary}</CommonRegularText>
          </HorizontalJustifyLayout>
          <HorizontalJustifyLayout style={{marginBottom: 20 * em, marginLeft: 20*em}}>
            <CommonRegularText theme="gray">Localisation : {props.job.location}</CommonRegularText>
          </HorizontalJustifyLayout>
          <HorizontalJustifyLayout style={{marginBottom: 20 * em, marginLeft: 20*em}}>
            <CommonRegularText theme="gray">Référence : {props.job.id}</CommonRegularText>
          </HorizontalJustifyLayout>
        </VerticalFlowLayout>
      )
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
    )
}

export default JobPostSector
