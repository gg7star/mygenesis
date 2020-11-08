import React, { Component } from 'react'
import { TouchableOpacity, StatusBar, Image, View } from "react-native"
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import { fetchAppliedJobs, refreshAllJobs, updateFavoriteJobIdsForAll } from '../../slices/jobSlice'
import { isJobFavorite, isJobApplied, getLocalJobsForJobIds } from '../../utils/firebase/database'

import {TitleText, CommonText, CommonRegularText, SmallText} from '../../components/text'
import {em, WIDTH} from '../../common'
import AccountLayout from '../../layouts/AccountLayout'
import HorizontalJustifyLayout from '../../layouts/HorizontalJustifyLayout'
import VerticalCenterFlowLayout from '../../layouts/VerticalCenterFlowLayout'
import VerticalFlowLayout from '../../layouts/VerticalFlowLayout'
import RoundButton from '../../components/button/RoundButton'
import JobMetaAdapter from '../../components/custom/JobMetaAdapter'
import { SwipeListView } from 'react-native-swipe-list-view'
import Spinner from 'react-native-loading-spinner-overlay'

class MyFollowUpScreen extends Component {
  constructor(props){
    super(props)
  }

  UNSAFE_componentWillMount() {
    this.props.fetchAppliedJobs()
  }

  didClickFavorite = (data, index) => {
    let newFavoriteJobIds = JSON.parse(JSON.stringify(this.props.favoriteJobIds))
    const jobIndex = newFavoriteJobIds.findIndex(function (v) {return v == data.id})
    if (jobIndex != -1) {
      newFavoriteJobIds.splice(jobIndex, 1)
    }
    else {
      newFavoriteJobIds.push(data.id)
    }
    let newAllJobs = JSON.parse(JSON.stringify(this.props.allJobs))
    let newFavoriteJobs = getLocalJobsForJobIds(newAllJobs, newFavoriteJobIds)
    let newAppliedJobIds = JSON.parse(JSON.stringify(this.props.appliedJobIds))
    let newSearchedJobs = JSON.parse(JSON.stringify(this.props.searchedJobs))
    let newAppliedJobs = JSON.parse(JSON.stringify(this.props.appliedJobs))
    this.props.updateFavoriteJobIdsForAll(newAllJobs, newSearchedJobs, newFavoriteJobs, newAppliedJobs, newFavoriteJobIds, newAppliedJobIds)
  }

  renderItem = (data, rowMap) => (
    <TouchableOpacity onPress={() => {
      this.props.navigation.navigate('JobDetail', {
        job: data.item,
      })
    }}>
      <JobMetaAdapter global={data.item.country != "France"}
        applied={isJobApplied(data.item.id, this.props.appliedJobIds)}
        favorite={isJobFavorite(data.item.id, this.props.favoriteJobIds)}
        title={data.item.title} durationType={data.item.contract_type}
        budget={data.item.salary} availability={data.item.duration} location=""
        onFavoriteClick={() => {
          this.didClickFavorite(data.item, data.index)
        }}/>
    </TouchableOpacity>
  )

  render() {
    return (
        <VerticalCenterFlowLayout>
          <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />
          <HorizontalJustifyLayout style={{marginTop: 25 * em}}>
            <TouchableOpacity onPress={() => {
              Actions.pop()
            }}>
              <Image source={require('../../assets/images/ic_back.png')} style={{width: 30*em, height: 30*em}} resizeMode={'stretch'} />
            </TouchableOpacity>
            <CommonText theme="blue_gray" style={{marginLeft: 5 * em}}>Mon suivi</CommonText>
            <View style={{width: 30*em}}/>
          </HorizontalJustifyLayout>
          <CommonRegularText theme="gray" style={{marginTop: 5*em, marginBottom: 15*em}}>Voici la liste des offres dont vous avez déjà postulé</CommonRegularText>
        <SwipeListView style={{ paddingLeft: 15 * em, paddingRight: 15 * em }} data={this.props.appliedJobs} renderItem={this.renderItem} />
          <Spinner
            visible={this.props.isFetching}
            textContent={''}
            textStyle={{ color: '#FFF' }}
          />
        </VerticalCenterFlowLayout>
    );
  }
}

const mapStateToProps = state => ({
  allJobs: state.job.allJobs,
  favoriteJobIds: state.job.favoriteJobIds,
  appliedJobIds: state.job.appliedJobIds,
  searchedJobs: state.job.searchedJobs,
  favoriteJobs: state.job.favoriteJobs,
  appliedJobs: state.job.appliedJobs,
  isFetching: state.job.isFetching,
})

const mapDispatchToProps = dispatch => {
  return {
    fetchAppliedJobs: (...args) => dispatch(fetchAppliedJobs(...args)),
    refreshAllJobs: (...args) => dispatch(refreshAllJobs(...args)),
    updateFavoriteJobIdsForAll: (...args) => dispatch(updateFavoriteJobIdsForAll(...args)),
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyFollowUpScreen)
