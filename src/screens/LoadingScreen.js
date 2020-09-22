import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import {WIDTH, HEIGHT, em} from '../common'
import { Actions } from 'react-native-router-flux'

import GradientProgressView from '../components/GradientProgressView'
import LogoView from '../components/LogoView'
import VerticalJustifyLayout from '../layouts/VerticalJustifyLayout'
import VerticalCenterLayout from '../layouts/VerticalCenterLayout'
import { createDummyJSON, createUserDummyJSON, createJobDummyJSON } from '../utils/firebase/database'

class LoadingScreen extends Component {
  _isMounted = false

  constructor(props){
    super(props)
    this.state = {
      percent: 0.0
    }
  }

  increasePercent() {
    const _this = this
    setTimeout(() => {
      const {percent} = _this.state
      var newPercent = percent + 2.5
      if (newPercent > 100) {
        newPercent = 100
      }
      _this.setState({percent: newPercent})
      if (newPercent < 100) {
        _this.increasePercent()
      }
      else {
        Actions.reset('home')
      }
    }, 40)
  }

  componentDidMount() {
      this._isMounted = true
      this.setDummyJSON()
      this.increasePercent()
  }

  componentWillUnmount(){
    this._isMounted = false
  }

  render() {
    return (
      <VerticalJustifyLayout>
        <View style={{height: 20 * em}}/>

        <VerticalCenterLayout>
          <LogoView style={{marginBottom: 25 * em}}/>
          <GradientProgressView percent={this.state.percent}/>
        </VerticalCenterLayout>

        <View style={{height: 20 * em}}/>
      </VerticalJustifyLayout>
    )
  }

  setDummyJSON = () => {
        console.log("=====Adding dummy json")
        // createUserDummyJSON().then(res => {
        //   if (this._isMounted){
        //     console.log("=====Dummy Users created!");
        //   }
        // }).catch(e => {
        //   console.log(e)
        // })
        // createJobDummyJSON().then(res => {
        //   if (this._isMounted){
        //     console.log("=====Dummy Jobs created!");
        //   }
        // }).catch(e => {
        //   console.log(e)
        // })
  }
}

export default LoadingScreen
