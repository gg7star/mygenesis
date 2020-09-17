import React, { Component, createRef } from 'react'
import {em} from '../../common'
import { TouchableOpacity, StatusBar, Image, Text, YellowBox } from "react-native"
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { fetchAllJobs } from '../../slices/jobSlice'
import { isJobFavorite, isJobApplied, getLocalJobsForJobIds } from '../../utils/firebase/database'

import { refreshAllJobs, updateFavoriteJobIds, updateFavoriteJobIdsForAll } from '../../slices/jobSlice'

import HorizontalJustifyLayout from '../../layouts/HorizontalJustifyLayout'
import VerticalCenterFlowLayout from '../../layouts/VerticalCenterFlowLayout'
import { SwipeListView } from 'react-native-swipe-list-view'

import LogoView from '../../components/LogoView'
import RoundButton from '../../components/button/RoundButton'
import {CommonText} from '../../components/text'
import {RoundDropDownButton} from '../../components/button'
import JobMetaAdapter from '../../components/custom/JobMetaAdapter'
import {Tooltip, Divider} from 'react-native-elements'
import TooltipContent from './TooltipContent'
import Spinner from 'react-native-loading-spinner-overlay'

class HomeTabScreen extends Component {
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

  UNSAFE_componentWillMount() {
    this.props.fetchAllJobs(this.state.sortBy)
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

  tooltipItemClicked(index) {
    const {tooltipShown} = this.state
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
    this.setState({sortBy: newSortBy})
    this.props.refreshAllJobs(newSortBy)
    if (this.tooltipRef.current && tooltipShown) {
      this.tooltipRef.current.toggleTooltip()
    }
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
    let tooltipButtonImage = require('../../assets/images/ic_close_popover.png')
    if (!this.state.tooltipShown) {
      tooltipButtonImage = require('../../assets/images/btn_sub_menu.png')
    }
    return (
        <VerticalCenterFlowLayout style={{marginBottom: 75 * em}}>
          {this.state.tooltipShown &&
          <StatusBar barstyle="dark-content" translucent backgroundColor="#18277aef" />}
          {!this.state.tooltipShown &&
          <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />}
          <LogoView size="small" style={{marginTop: 20 * em}}/>
          <HorizontalJustifyLayout style={{marginTop: 25 * em, marginBottom: 20 * em}}>
            <CommonText theme="blue_gray">Mess données de connexion</CommonText>
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
          <SwipeListView data={this.props.allJobs} renderItem={this.renderItem} />

          <Spinner
            visible={this.props.isFetching}
            textContent={''}
            textStyle={{ color: '#FFF' }}
          />
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
    refreshAllJobs: (...args) => dispatch(refreshAllJobs(...args)),
    updateFavoriteJobIds: (...args) => dispatch(updateFavoriteJobIds(...args)),
    updateFavoriteJobIdsForAll: (...args) => dispatch(updateFavoriteJobIdsForAll(...args)),
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomeTabScreen)
