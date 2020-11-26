import {createSlice} from '@reduxjs/toolkit'
import {
  getAppliedJobs,
  getFavorites,
  getJobsForJobIds,
  getAllJobs,
  updateFavorites,
  updateAppliedJobs,
  getJobsByCriteria,
  filterJobsByCriteria,
} from '../utils/firebase/database';
import { Actions } from 'react-native-router-flux'
import { showRootToast } from '../utils/misc'
import { appSlice } from './appSlice'

export const initialState = {
  favoriteJobs: [],
  favoriteJobIds: [],
  appliedJobs: [],
  appliedJobIds: [],
  isFetching: false,
  allJobs: [],
  searchedJobs: [],
  showApplySuccess: false
}

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    tryFetch: state => {
      state.isFetching = true
      console.log('====== tryFetch: true')
    },
    tryUpdate: state => {
      state.isFetching = true
      console.log('====== tryUpdate: true')
    },
    fetchFavoriteJobIdsSuccess: (state, { payload }) => {
      state.isFetching = false
      state.favoriteJobIds = payload.favoriteJobIds
    },
    fetchAppliedJobIdsSuccess: (state, { payload }) => {
      state.isFetching = false
      state.appliedJobIds = payload.appliedJobIds
    },
    fetchFavoriteJobsSuccess: (state, { payload }) => {
      state.isFetching = false
      state.favoriteJobs = payload.favoriteJobs
    },
    fetchAppliedJobsSuccess: (state, { payload }) => {
      state.isFetching = false
      state.appliedJobs = payload.appliedJobs
    },
    fetchAllJobsSuccess: (state, { payload }) => {
      state.isFetching = false
      state.allJobs = payload.allJobs
    },
    fetchFailure: (state, { payload }) => {
      state.isFetching = false
    },
    refreshFavoriteStates: (state, {payload}) => {
      state.isFetching = false
      state.favoriteJobIds = payload.favoriteJobIds
    },
    filterJobSuccess: (state, {payload}) => {
      console.log('====== filterJobSuccess: false')
      state.isFetching = false
      state.searchedJobs = payload.searchedJobs
    },
    refreshAllStates: (state, { payload }) => {
      state.isFetching = false
      state.favoriteJobIds = payload.favoriteJobIds
      state.appliedJobIds = payload.appliedJobIds
      state.allJobs = payload.allJobs
      state.searchedJobs = payload.searchedJobs
      state.favoriteJobs = payload.favoriteJobs
      state.appliedJobs = payload.appliedJobs
    },
    applySuccessModalVisibleChanged: (state, { payload }) => {
      state.showApplySuccess = payload.isVisible
    }
  },
})

export const { tryFetch, fetchAllJobsSuccess,
  fetchFavoriteJobIdsSuccess, fetchFavoriteJobsSuccess,
  fetchAppliedJobIdsSuccess, fetchAppliedJobsSuccess, fetchFailure,
  refreshFavoriteStates, refreshAllStates, applySuccessModalVisibleChanged,
  filterJobSuccess} = jobSlice.actions
export const jobSelector = state => state.job
export default jobSlice.reducer

export function fetchAllJobs(sortBy) {
  return async dispatch => {
    dispatch(tryFetch())
    getAppliedJobs().then(appliedRes => {
      const appliedJobIds = appliedRes.appliedJobs
      dispatch(fetchAppliedJobIdsSuccess({appliedJobIds: appliedJobIds}))
      dispatch(tryFetch())
      getFavorites().then(favoriteRes => {
        const favoriteJobIds = favoriteRes.favoriteJobs
        dispatch(fetchFavoriteJobIdsSuccess({favoriteJobIds: favoriteJobIds}))
        dispatch(tryFetch())
        getAllJobsAndSort(sortBy).then(res => {
          dispatch(fetchAllJobsSuccess({allJobs: res}))
        })
      })
    })
  }
}

export function fetchJobsByCriteria(sortBy, title, activityArea, contractType, city) {
  return async dispatch => {
    // dispatch(tryFetch())
    getAppliedJobs().then(appliedRes => {
      const appliedJobIds = appliedRes.appliedJobs
      dispatch(fetchAppliedJobIdsSuccess({appliedJobIds: appliedJobIds}))
      // dispatch(tryFetch())
      getFavorites().then(favoriteRes => {
        const favoriteJobIds = favoriteRes.favoriteJobs
        dispatch(fetchFavoriteJobIdsSuccess({favoriteJobIds: favoriteJobIds}))
        // dispatch(tryFetch())
        getAllJobsAndSort(sortBy).then(res => {
          dispatch(fetchAllJobsSuccess({allJobs: res}))
          console.log("Sort By", sortBy)
          const searchedJobs = filterJobsByCriteria(res, title, activityArea, contractType, city)
          dispatch(filterJobSuccess({searchedJobs: searchedJobs}))
        })
      }).catch(err => {
        console.log('==== err: ', err);
      })
    })
  }
}

export function fetchFavoriteJobs() {
  return async dispatch => {
    dispatch(tryFetch())
    getAppliedJobs().then(appliedRes => {
      const appliedJobIds = appliedRes.appliedJobs
      dispatch(fetchAppliedJobIdsSuccess({appliedJobIds: appliedJobIds}))
      getFavorites().then(favoriteRes => {
        const favoriteJobIds = favoriteRes.favoriteJobs
        dispatch(fetchFavoriteJobIdsSuccess({favoriteJobIds: favoriteJobIds}))
        getJobsForJobIds(favoriteJobIds).then(res => {
          dispatch(fetchFavoriteJobsSuccess({favoriteJobs: res}))
        }).catch(e => {
          console.log("======= error", e)
        })
      })
    })
  }
}

export function fetchAppliedJobs() {
  return async dispatch => {
    dispatch(tryFetch())
    getAppliedJobs().then(appliedRes => {
      const appliedJobIds = appliedRes.appliedJobs
      dispatch(fetchAppliedJobIdsSuccess({appliedJobIds: appliedJobIds}))
      getFavorites().then(favoriteRes => {
        const favoriteJobIds = favoriteRes.favoriteJobs
        dispatch(fetchFavoriteJobIdsSuccess({favoriteJobIds: favoriteJobIds}))
        getJobsForJobIds(appliedJobIds).then(res => {
          dispatch(fetchAppliedJobsSuccess({appliedJobs: res}))
        }).catch(e => {
          console.log("======= error", e)
        })
      })
    })
  }
}

export function refreshAllJobs(sortBy) {
  return async dispatch => {
    dispatch(tryFetch())
    getAllJobsAndSort(sortBy).then(res => {
      dispatch(fetchAllJobsSuccess({allJobs: res}))
    })
  }
}

async function getAllJobsAndSort(sortBy) {
  return getAllJobs().then(res => {
    let allJobs = res
    if (allJobs.length > 0) {
      if (sortBy == "date") {
        allJobs = allJobs.sort((a, b) => (a.date < b.date ? 1:-1))
      }
      else if (sortBy == "contract_type") {
        allJobs = allJobs.sort((a, b) => (a.contract_type > b.contract_type ? 1:-1))
      }
      else if (sortBy == "location") {
        allJobs = allJobs.sort((a, b) => (a.location > b.location ? 1:-1))
      }
      else if (sortBy == "activity_area") {
        allJobs = allJobs.sort((a, b) => (a.location > b.location ? 1:-1))
      }
    }

    return allJobs
  }).catch(e => {
    console.log("======= error", e)
    return []
  })
}

async function getAllJobsByCriteriaAndSort(sortBy, title, activityArea, contractType, city) {
  return getJobsByCriteria().then(res => {
    let allJobs = res
    if (allJobs.length > 0) {
      if (sortBy == "date") {
        allJobs = allJobs.sort((a, b) => (a.date < b.date ? 1:-1))
      }
      else if (sortBy == "contract_type") {
        allJobs = allJobs.sort((a, b) => (a.contract_type > b.contract_type ? 1:-1))
      }
      else if (sortBy == "location") {
        allJobs = allJobs.sort((a, b) => (a.location > b.location ? 1:-1))
      }
      else if (sortBy == "activity_area") {
        allJobs = allJobs.sort((a, b) => (a.location > b.location ? 1:-1))
      }
    }

    return allJobs
  }).catch(e => {
    console.log("======= error", e)
    return []
  })
}

export function updateFavoriteJobIds(newAllJobs, newFavoriteJobIds, newAppliedJobIds) {
  return async dispatch => {
    dispatch(tryFetch())
    updateFavorites(newFavoriteJobIds).then(res => {
      const searchedJobs = []
      dispatch(refreshAllStates({favoriteJobIds: newFavoriteJobIds, searchedJobs: searchedJobs, appliedJobIds: newAppliedJobIds, allJobs: newAllJobs}))
    })
  }
}

export function updateFavoriteJobIdsForSearch(newAllJobs, searchedJobs, newFavoriteJobIds, newAppliedJobIds) {
  return async dispatch => {
    dispatch(tryFetch())
    updateFavorites(newFavoriteJobIds).then(res => {
      dispatch(refreshAllStates({favoriteJobIds: newFavoriteJobIds, searchedJobs: searchedJobs, appliedJobIds: newAppliedJobIds, allJobs: newAllJobs}))
    })
  }
}

export function updateFavoriteJobIdsForAll(newAllJobs, searchedJobs, favoriteJobs, appliedJobs, newFavoriteJobIds, newAppliedJobIds) {
  return async dispatch => {
    dispatch(tryFetch())
    updateFavorites(newFavoriteJobIds).then(res => {
      dispatch(refreshAllStates({favoriteJobIds: newFavoriteJobIds,
        searchedJobs: searchedJobs, favoriteJobs: favoriteJobs,
        appliedJobs: appliedJobs, appliedJobIds: newAppliedJobIds,
        allJobs: newAllJobs}))
    })
  }
}

export function updateAppliedJobIds(newAllJobs, newFavoriteJobIds, newAppliedJobIds) {
  return async dispatch => {
    dispatch(tryFetch())
    updateAppliedJobs(newAppliedJobIds).then(res => {
      dispatch(refreshAllStates({favoriteJobIds: newFavoriteJobIds, appliedJobIds: newAppliedJobIds, allJobs: newAllJobs}))
      dispatch(applySuccessModalVisibleChanged({isVisible: true}))
    })
  }
}

export function updateAppliedJobIdsForAll(newAllJobs, searchedJobs, favoriteJobs, appliedJobs, newFavoriteJobIds, newAppliedJobIds) {
  return async dispatch => {
    dispatch(tryFetch())
    updateAppliedJobs(newAppliedJobIds).then(res => {
      dispatch(refreshAllStates({favoriteJobIds: newFavoriteJobIds,
        searchedJobs: searchedJobs, favoriteJobs: favoriteJobs,
        appliedJobs: appliedJobs, appliedJobIds: newAppliedJobIds,
        allJobs: newAllJobs}))
      dispatch(applySuccessModalVisibleChanged({isVisible: true}))
    })
  }
}

export function showApplySuccessModal(isVisible) {
  return dispatch => {
    dispatch(applySuccessModalVisibleChanged({isVisible: isVisible}))
  }
}
