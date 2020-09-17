import React, { Component, createRef } from 'react'
import { TouchableOpacity, StatusBar, Image, YellowBox } from "react-native"
import { createStackNavigator } from '@react-navigation/stack'
import { connect } from 'react-redux'

import { getJobsByCriteria, isJobFavorite, isJobApplied, filterJobsByCriteria, getLocalJobsForJobIds } from '../../utils/firebase/database'

import { fetchAllJobs, fetchJobsByCriteria, refreshAllJobs, updateFavoriteJobIds, updateFavoriteJobIdsForAll } from '../../slices/jobSlice'

import SearchTabMainScreen from './SearchTabMainScreen'
import {TitleText, CommonText} from '../../components/text'
import {em, WIDTH} from '../../common'
import AccountLayout from '../../layouts/AccountLayout'
import HorizontalJustifyLayout from '../../layouts/HorizontalJustifyLayout'
import VerticalCenterFlowLayout from '../../layouts/VerticalCenterFlowLayout'
import HorizontalLayout from '../../layouts/HorizontalLayout'
import JobMetaAdapter from '../../components/custom/JobMetaAdapter'
import { Tooltip } from 'react-native-elements'
import TooltipContent from './TooltipContent'
import { SwipeListView } from 'react-native-swipe-list-view'

class SearchTabResultScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tooltipShown: false,
      sortBy: "date"
    }
    this.tooltipRef = createRef()
    YellowBox.ignoreWarnings([
      'Non-serializable values were found in the navigation state',
    ])
  }

  refreshJobs(newSortBy) {
    const {tooltipShown} = this.state
    const { title, activityArea, contractType, city } = this.props.route.params
    this.props.fetchJobsByCriteria(newSortBy, title, activityArea, contractType, city)
    this.setState({sortBy: newSortBy})
  }

  UNSAFE_componentWillMount() {
    this.refreshJobs(this.state.sortBy)
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
    let newAppliedJobIds = JSON.parse(JSON.stringify(this.props.appliedJobIds))
    let newSearchedJobs = JSON.parse(JSON.stringify(this.props.searchedJobs))
    let newFavoriteJobs = getLocalJobsForJobIds(newAllJobs, newFavoriteJobIds)
    let newAppliedJobs = JSON.parse(JSON.stringify(this.props.appliedJobs))
    this.props.updateFavoriteJobIdsForAll(newAllJobs, newSearchedJobs, newFavoriteJobs, newAppliedJobs, newFavoriteJobIds, newAppliedJobIds)
  }

  tooltipItemClicked(index) {
    console.log("========= Tooltip Clicked at ", index)
    let newSortBy = ""
    if (index == 1) {
      newSortBy = "date"
    }
    else if (index == 2) {
      newSortBy = "contract_type"
    }
    else if (index == 3) {
      newSortBy = "location"
    }
    else {
      newSortBy = "activity_area"
    }
    this.refreshJobs(newSortBy)
    if (this.tooltipRef.current && this.state.tooltipShown) {
      this.tooltipRef.current.toggleTooltip()
    }
  }

  renderItem = (data, rowMap) => (
    <TouchableOpacity onPress={() => {
      this.props.navigation.navigate('JobDetail', {
        job: data.item,
        favoriteJobs: this.state.favoriteJobs,
        appliedJobs: this.state.appliedJobs,
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
    let tooltipButtonImage = require('../../assets/images/ic_close_popover.png')
    if (!this.state.tooltipShown) {
      tooltipButtonImage = require('../../assets/images/btn_sub_menu.png')
    }
    return (
        <VerticalCenterFlowLayout style={{marginBottom: 140 * em}}>
          {this.state.tooltipShown &&
          <StatusBar barstyle="dark-content" translucent backgroundColor="#18277aef" />}
          {!this.state.tooltipShown &&
          <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />}
          <HorizontalJustifyLayout style={{marginTop: 25 * em, marginBottom: 20 * em}}>
            <HorizontalLayout>
              <TouchableOpacity onPress={() => {
                this.props.navigation.goBack()
              }}>
                <Image source={require('../../assets/images/ic_back.png')} style={styles.tooltipButton} resizeMode={'stretch'} />
              </TouchableOpacity>
              <CommonText theme="blue_gray" style={{marginLeft: 5 * em}}>{this.props.searchedJobs.length} résultats trouvés</CommonText>
            </HorizontalLayout>
            <Tooltip
              ref = {this.tooltipRef}
              popover={<TooltipContent onItemClick={(index) => {
                this.tooltipItemClicked(index)
              }}/>}
              onOpen={()=>{this.setState({tooltipShown: true})}}
              onClose={()=>{this.setState({tooltipShown: false})}}
              backgroundColor="#ffffff"
              overlayColor="#18277aef"
              width={150*em}
              height={170*em}>
              <Image source={tooltipButtonImage} style={styles.tooltipButton} resizeMode={'stretch'} />
            </Tooltip>
          </HorizontalJustifyLayout>
          <SwipeListView data={this.props.searchedJobs} renderItem={this.renderItem} />
        </VerticalCenterFlowLayout>
    );
  }
}

const styles = {
  tooltipButton: {
    width: 30 * em,
    height: 30 * em,
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
    fetchAllJobs: (...args) => dispatch(fetchAllJobs(...args)),
    fetchJobsByCriteria: (...args) => dispatch(fetchJobsByCriteria(...args)),
    refreshAllJobs: (...args) => dispatch(refreshAllJobs(...args)),
    updateFavoriteJobIds: (...args) => dispatch(updateFavoriteJobIds(...args)),
    updateFavoriteJobIdsForAll: (...args) => dispatch(updateFavoriteJobIdsForAll(...args)),
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchTabResultScreen)
