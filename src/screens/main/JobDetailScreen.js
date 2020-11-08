import React, { Component } from 'react'
import { TouchableOpacity, StatusBar, Image, Button, View } from "react-native"
import { connect } from 'react-redux'

import { createStackNavigator } from '@react-navigation/stack'
import Modal from 'react-native-modal'

import { isJobFavorite, isJobApplied, getLocalJobsForJobIds } from '../../utils/firebase/database'
import { fetchFavoriteJobs, refreshAllJobs, updateFavoriteJobIds,
  updateAppliedJobIds, showApplySuccessModal, updateFavoriteJobIdsForAll,
  updateAppliedJobIdsForAll } from '../../slices/jobSlice'

import SearchTabMainScreen from './SearchTabMainScreen'
import AccountLayout from '../../layouts/AccountLayout'
import HorizontalJustifyLayout from '../../layouts/HorizontalJustifyLayout'
import HorizontalCenterLayout from '../../layouts/HorizontalCenterLayout'
import HorizontalLayout from '../../layouts/HorizontalLayout'
import VerticalFlowLayout from '../../layouts/VerticalFlowLayout'
import VerticalCenterFlowLayout from '../../layouts/VerticalCenterFlowLayout'
import JobPostSector from '../../components/custom/JobPostSector'
import RoundButton from '../../components/button/RoundButton'
import {em, WIDTH, HEIGHT} from '../../common'

import {TitleText, CommonText, CommonRegularText, CommonItalicText, MediumRegularText} from '../../components/text'
import commonStyles from '../../components/common_styles';

class JobDetailScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      job: this.props.route.params.job,
    }
  }

  didClickApply = (applied) => {
    const {job} = this.state
    const {appliedJobIds, favoriteJobIds} = this.props
    if (applied) {
      this.props.showApplySuccessModal(true)
      return
    }

    let newAppliedJobIds = JSON.parse(JSON.stringify(appliedJobIds))
    const jobIndex = newAppliedJobIds.findIndex(function (v) {return v == job.id})
    if (jobIndex != -1) {
      newAppliedJobIds.splice(jobIndex, 1)
    }
    else {
      newAppliedJobIds.push(job.id)
    }

    let newJob = JSON.parse(JSON.stringify(job))
    let newAllJobs = JSON.parse(JSON.stringify(this.props.allJobs))
    let newFavoriteJobIds = JSON.parse(JSON.stringify(this.props.favoriteJobIds))
    let newSearchedJobs = JSON.parse(JSON.stringify(this.props.searchedJobs))
    let newFavoriteJobs = JSON.parse(JSON.stringify(this.props.favoriteJobs))
    let newAppliedJobs = getLocalJobsForJobIds(newAllJobs, newAppliedJobIds)
    this.props.updateAppliedJobIdsForAll(newAllJobs, newSearchedJobs, newFavoriteJobs, newAppliedJobs, newFavoriteJobIds, newAppliedJobIds)
  }

  didClickFavorite = (data) => {
    let newFavoriteJobIds = JSON.parse(JSON.stringify(this.props.favoriteJobIds))
    const jobIndex = newFavoriteJobIds.findIndex(function (v) {return v == data.id})
    if (jobIndex != -1) {
      newFavoriteJobIds.splice(jobIndex, 1)
    }
    else {
      newFavoriteJobIds.push(data.id)
    }

    let newAllJobs = JSON.parse(JSON.stringify(this.props.allJobs))
    let newAppliedJobIds = JSON.parse(JSON.stringify(this.props.appliedJobIds))
    let newSearchedJobs = JSON.parse(JSON.stringify(this.props.searchedJobs))
    let newFavoriteJobs = getLocalJobsForJobIds(newAllJobs, newFavoriteJobIds)
    let newAppliedJobs = JSON.parse(JSON.stringify(this.props.appliedJobs))
    this.props.updateFavoriteJobIdsForAll(newAllJobs, newSearchedJobs, newFavoriteJobs, newAppliedJobs, newFavoriteJobIds, newAppliedJobIds)
  }

  render() {
    const { job } = this.state
    const { favoriteJobIds, appliedJobIds} = this.props
    const applied = isJobApplied(job.id, appliedJobIds)

    let favoriteImageResource = require('../../assets/images/ic_favorite_off.png')
    const favorite = isJobFavorite(job.id, favoriteJobIds)
    if (favorite) {
      favoriteImageResource = require('../../assets/images/ic_favorite_on.png')
    }
    let responsibility = "Disponibilité: "

    var viewHeight = HEIGHT - 220 * em
    if (Platform.OS == 'android') {
      viewHeight = HEIGHT - 150 * em
    }

    return (
      <VerticalFlowLayout style={{width: WIDTH, height: HEIGHT, backgroundColor: "#f5f6fa"}}>
        <View style={{height: viewHeight}}>
          <AccountLayout>
            {this.props.showApplySuccess &&
            <StatusBar barstyle="dark-content" translucent backgroundColor="#18277a" />}
            {!this.props.showApplySuccess &&
            <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />}
            <HorizontalJustifyLayout style={{marginTop: 25 * em, marginBottom: 5 * em}}>
              <HorizontalLayout>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.goBack()
                }}>
                  <Image source={require('../../assets/images/ic_back.png')} style={{width: 30 * em, height: 30 * em}} resizeMode={'stretch'} />
                </TouchableOpacity>
              </HorizontalLayout>
              <HorizontalLayout>
                {job.country != "France" &&
                <Image source={require('../../assets/images/ic_global.png')}
                  style={{width: 12 * em, height: 12 * em, marginRight: 5 * em}}
                  resizeMode={'stretch'} />
                }
                <CommonText theme="primary">{ job.title }</CommonText>
              </HorizontalLayout>
              <TouchableOpacity onPress={() => {
                  this.didClickFavorite(job)
                }}>
                <Image source={favoriteImageResource} style={{width: 20 * em, height: 20 * em}} resizeMode={'stretch'} />
              </TouchableOpacity>
            </HorizontalJustifyLayout>
            <CommonRegularText theme="black" style={{marginLeft: 15 * em}}>
              {job.contract_type + " - " + job.salary + " " + job.location}
            </CommonRegularText>
            <HorizontalLayout style={{marginTop: 5 * em}}>
              <CommonRegularText theme="gray" style={{alignSelf: "flex-start"}}>
                {responsibility}
              </CommonRegularText>
              <CommonItalicText theme="black">
                {job.duration}
              </CommonItalicText>
            </HorizontalLayout>
            <VerticalFlowLayout
              style={[
                {width: WIDTH * 0.85, backgroundColor: "#ffffff", borderRadius: 10 * em, marginTop: 20*em},
                commonStyles.shadow.card,
              ]}
            >
              <JobPostSector type="description" text={job.description} />
              <JobPostSector type="mission" applied={true} text={job.position} />
              <JobPostSector type="profile_research" text={job.profile}/>
              <JobPostSector type="information" job={job}/>
            </VerticalFlowLayout>
          </AccountLayout>
        </View>
        <TouchableOpacity onPress={() => {
            this.didClickApply(applied)
        }}>
          { applied &&
            <RoundButton text="Déjà postulé" leftIcon="applied" theme="green" style={{marginTop: 15 * em, alignSelf: "center"}}/>
          }
          { !applied &&
            <RoundButton text="Postuler" rightIcon="next" style={{marginTop: 15 * em, marginBottom: 80 * em, alignSelf: "center"}}/>
          }
        </TouchableOpacity>

        <Modal isVisible={this.props.showApplySuccess} backdropColor="#18277a" backdropOpacity={0.95}>
          <VerticalCenterFlowLayout style={{flex: 1}}>
            <VerticalCenterFlowLayout style={{flex: 1}}/>
            <VerticalCenterFlowLayout style={{padding: 20*em, backgroundColor: "#ffffff", borderRadius: 22*em, width: WIDTH * 0.85, marginBottom: 15*em}}>
              <Image source={require('../../assets/images/ic_job_applied.png')}
                style={{width: 55 * em, height: 55 * em, marginTop: 10 * em}}
                resizeMode={'stretch'} />
              <TitleText theme="black" style={{marginTop: 10 * em, marginHorizontal: 45*em, textAlign: "center"}}>Votre candidature a bien ete envoyée !</TitleText>
              <CommonRegularText theme="gray" style={{marginTop: 10 * em}}>Votre agence:</CommonRegularText>
              <CommonText theme="black" style={{marginTop: 10 * em}}>Genesis-rh macon</CommonText>
              <HorizontalLayout style={{width: 130*em}}>
                <Image source={require('../../assets/images/ic_address.png')}
                  style={{width: 13 * em, height: 13 * em, marginTop: 10 * em}}
                  resizeMode={'stretch'} />
                <CommonRegularText theme="gray" style={{marginTop: 10 * em, marginLeft: 10*em}}>38-40 Rue Victor Hugo 71000 Macon</CommonRegularText>
              </HorizontalLayout>
              <HorizontalLayout style={{width: 130*em}}>
                <Image source={require('../../assets/images/ic_phone.png')}
                  style={{width: 13 * em, height: 13 * em, marginTop: 10 * em}}
                  resizeMode={'stretch'} />
                <CommonRegularText theme="gray" style={{marginTop: 10 * em, marginLeft: 10*em}}>03 85 20 30 00</CommonRegularText>
              </HorizontalLayout>
              <HorizontalLayout style={{width: 130*em}}>
                <Image source={require('../../assets/images/ic_cell_phone.png')}
                  style={{width: 13 * em, height: 13 * em, marginTop: 10 * em}}
                  resizeMode={'stretch'} />
                <CommonRegularText theme="gray" style={{marginTop: 10 * em, marginLeft: 10*em}}>06 00 00 00 00</CommonRegularText>
              </HorizontalLayout>
              <CommonRegularText theme="gray" style={{alignSelf: "center", marginTop: 15*em, textAlign: "center"}}>
                Lo ou la chargé(e) de recrutement vous recontactera.
              </CommonRegularText>
            </VerticalCenterFlowLayout>
            <TouchableOpacity onPress={() => {
                this.props.showApplySuccessModal(false)
            }}>
              <RoundButton text="Fermer" theme="negative"/>
            </TouchableOpacity>
          </VerticalCenterFlowLayout>
        </Modal>
      </VerticalFlowLayout>
    );
  }
}

const mapStateToProps = state => ({
  credential: state.app.credential,
  allJobs: state.job.allJobs,
  favoriteJobIds: state.job.favoriteJobIds,
  appliedJobIds: state.job.appliedJobIds,
  searchedJobs: state.job.searchedJobs,
  favoriteJobs: state.job.favoriteJobs,
  appliedJobs: state.job.appliedJobs,
  isFetching: state.job.isFetching,
  showApplySuccess: state.job.showApplySuccess
})

const mapDispatchToProps = dispatch => {
  return {
    updateFavoriteJobIds: (...args) => dispatch(updateFavoriteJobIds(...args)),
    updateAppliedJobIds: (...args) => dispatch(updateAppliedJobIds(...args)),
    showApplySuccessModal: (...args) => dispatch(showApplySuccessModal(...args)),
    updateFavoriteJobIdsForAll: (...args) => dispatch(updateFavoriteJobIdsForAll(...args)),
    updateAppliedJobIdsForAll: (...args) => dispatch(updateAppliedJobIdsForAll(...args)),
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(JobDetailScreen)
