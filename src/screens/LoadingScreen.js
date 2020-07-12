import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import {WIDTH, HEIGHT, em} from '../common';
import { Actions } from 'react-native-router-flux';

import GradientProgressView from '../components/GradientProgressView'
import LogoView from '../components/LogoView'
import VerticalJustifyLayout from '../layouts/VerticalJustifyLayout'
import VerticalCenterLayout from '../layouts/VerticalCenterLayout'

class LoadingScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      percent: 0.0
    }
    this.increasePercent();
  }

  increasePercent() {
    const _this = this
    setTimeout(() => {
      const {percent} = _this.state
      var newPercent = percent + 2.5
      if (newPercent > 100) {
        newPercent = 100
      }
      _this.setState({percent: newPercent});
      if (newPercent < 100) {
        _this.increasePercent()
      }
      else {
        Actions.home()
      }
    }, 40)
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
}

export default LoadingScreen
