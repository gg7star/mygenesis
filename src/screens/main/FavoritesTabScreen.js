import React, { Component } from 'react'
import {em} from '../../common'
import { TouchableOpacity, StatusBar, YellowBox } from "react-native"
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import { getJobsForJobIds, getFavorites, isJobFavorite, updateFavorites, getAppliedJobs, isJobApplied, getLocalJobsForJobIds } from '../../utils/firebase/database'

import { fetchFavoriteJobs, updateFavoriteJobIdsForAll } from '../../slices/jobSlice'

import HorizontalCenterLayout from '../../layouts/HorizontalCenterLayout'
import VerticalCenterFlowLayout from '../../layouts/VerticalCenterFlowLayout'
import { withNavigationFocus } from "react-navigation"

import LogoView from '../../components/LogoView'
import RoundButton from '../../components/button/RoundButton'
import {CommonText, TitleText, SmallText, RoundTextInput} from '../../components/text'
import {RoundDropDownButton} from '../../components/button'
import {AgreeCheckBox} from '../../components/checkbox'
import JobMetaAdapter from '../../components/custom/JobMetaAdapter'
import { SwipeListView } from 'react-native-swipe-list-view'

class FavoritesTabScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      jobs: [],
      favoriteJobs: []
    }
    YellowBox.ignoreWarnings([
      'Non-serializable values were found in the navigation state',
    ])
  }

  UNSAFE_componentWillMount() {
    this.props.fetchFavoriteJobs()
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
        <VerticalCenterFlowLayout style={{marginBottom: 150*em}}>
          <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />
          <TitleText style={{marginTop: 35 * em, marginBottom: 30 * em}} theme="black">Favoris</TitleText>
          <SwipeListView data={this.props.favoriteJobs} renderItem={this.renderItem} />
        </VerticalCenterFlowLayout>
    );
  }
}

const mapStateToProps = state => ({
  allJobs: state.job.allJobs,
  favoriteJobs: state.job.favoriteJobs,
  favoriteJobIds: state.job.favoriteJobIds,
  appliedJobs: state.job.appliedJobs,
  searchedJobs: state.job.searchedJobs,
  appliedJobIds: state.job.appliedJobIds,
  isFetching: state.job.isFetching,
})

const mapDispatchToProps = dispatch => {
  return {
    fetchFavoriteJobs: (...args) => dispatch(fetchFavoriteJobs(...args)),
    updateFavoriteJobIdsForAll: (...args) => dispatch(updateFavoriteJobIdsForAll(...args)),
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(FavoritesTabScreen)
