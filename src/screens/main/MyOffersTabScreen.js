import React, { useState, Component } from 'react'
import {em} from '../../common'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    StatusBar,
    Image,
} from 'react-native'
import { connect } from 'react-redux'

import { fetchAppliedJobs, refreshAllJobs, updateFavoriteJobIdsForAll } from '../../slices/jobSlice'
import { isJobFavorite, isJobApplied, getLocalJobsForJobIds } from '../../utils/firebase/database'

import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'
import JobMetaAdapter from '../../components/custom/JobMetaAdapter'
import VerticalCenterFlowLayout from '../../layouts/VerticalCenterFlowLayout'
import HorizontalLayout from '../../layouts/HorizontalLayout'
import {CommonText, TitleText, SmallText, RoundTextInput} from '../../components/text'
import Spinner from 'react-native-loading-spinner-overlay'

class MyOffersTabScreen extends Component {
    constructor(props){
      super(props)
      this.state = {
      }
    }

    UNSAFE_componentWillMount() {
      this.props.fetchAppliedJobs()
    }

    didClickDeleteApply = (data) => {
      let newAppliedJobIds = JSON.parse(JSON.stringify(this.props.appliedJobIds))
      const jobIndex = newAppliedJobIds.findIndex(function (v) {return v == data.id})
      if (jobIndex == -1) {
        return
      }
      newAppliedJobIds.splice(jobIndex, 1)

      let newAllJobs = JSON.parse(JSON.stringify(this.props.allJobs))
      let newFavoriteJobs = JSON.parse(JSON.stringify(this.props.favoriteJobs))
      let newFavoriteJobIds = JSON.parse(JSON.stringify(this.props.favoriteJobIds))
      let newSearchedJobs = JSON.parse(JSON.stringify(this.props.searchedJobs))
      let newAppliedJobs = getLocalJobsForJobIds(newAllJobs, newAppliedJobIds)
      this.props.updateFavoriteJobIdsForAll(newAllJobs, newSearchedJobs, newFavoriteJobs, newAppliedJobs, newFavoriteJobIds, newAppliedJobIds)
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
        <SwipeRow
            disableLeftSwipe={true}
            leftOpenValue={120*em}
        >
            <HorizontalLayout style={{flex: 1, backgroundColor: "#f86a80", borderRadius: 15.5 * em, marginBottom: 15.5 * em}}>
              <TouchableOpacity
                onPress={() =>
                  {
                    this.didClickDeleteApply(data.item)
                  }
                }
                  underlayColor={'#f5f6fa'}
              >
                <Image source={require('../../assets/images/btn_delete_item.png')}
                  style={{width: 32 * em, height: 32 * em, marginLeft: 50*em}} resizeMode={'stretch'} />
              </TouchableOpacity>
            </HorizontalLayout>
            <TouchableHighlight
              onPress={() => {
                  this.props.navigation.navigate('JobDetail', {
                    job: data.item,
                  })
                }
              }
                underlayColor={'#f5f6fa'}
            >
                <View>
                  <JobMetaAdapter global={data.item.country != "France"}
                    applied={isJobApplied(data.item.id, this.props.appliedJobIds)}
                    favorite={isJobFavorite(data.item.id, this.props.favoriteJobIds)}
                    title={data.item.title} durationType={data.item.contract_type}
                    budget={data.item.salary} availability={data.item.duration} location=""
                    onFavoriteClick={() => {
                      this.didClickFavorite(data.item, data.index)
                    }}/>
                </View>
            </TouchableHighlight>
        </SwipeRow>
    );

    render() {
      return (
          <VerticalCenterFlowLayout style={{marginBottom: 160 * em}}>
            <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />
            <TitleText style={{marginTop: 35 * em, marginBottom: 10 * em}} theme="black">Mes offres</TitleText>
            <SmallText theme="gray" style={{marginBottom: 20 * em}}>Pour supprimer l'offre glisser vers la droite</SmallText>
            <SwipeListView data={this.props.appliedJobs} renderItem={this.renderItem} />

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
  )(MyOffersTabScreen)
