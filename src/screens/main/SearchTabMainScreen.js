
import React, { Component } from 'react'
import {em} from '../../common'
import { TouchableOpacity, StatusBar } from "react-native"
import { Actions } from 'react-native-router-flux';

import {showRootToast} from '../../utils/misc'

import AccountLayout from '../../layouts/AccountLayout'

import RoundButton from '../../components/button/RoundButton'
import {TitleText, RoundTextInput} from '../../components/text'

class SearchTabMainScreen extends Component {
  constructor(props){
    super(props)

    this.state = {
      title:"",
      activityArea:"",
      contractType:"",
      city:"",
    }
  }

  didClickSearchButton() {
    const {title, activityArea, contractType, city} = this.state
    const trimTitle = title.split(" ").join("")
    const trimActivityArea = activityArea.split(" ").join("")
    const trimContractType = contractType.split(" ").join("")
    const trimCity = city.split(" ").join("")
    if (trimTitle.length == 0 && trimActivityArea.length == 0
      && trimContractType == 0 && trimCity.length == 0) {

          showRootToast('Please enter at least a criteria')
          return
    }

    this.props.navigation.navigate("SearchResult",
      {
        title: title,
        activityArea: activityArea,
        contractType: contractType,
        city: city,
      })
  }

  render() {
    const {title, activityArea, contractType, city} = this.state
    return (
        <AccountLayout style={{marginBottom: 60 * em}}>
          <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />
          <TitleText style={{marginTop: 35 * em}} theme="black">Recherer</TitleText>
          <RoundTextInput placeHolder="Métier" style={{marginTop: 15 * em}}
            value={title} handleChange={(text)=>this.setState({title:text})} />
          <RoundTextInput placeHolder="Secteur d'activité" style={{marginTop: 15 * em}}
            value={activityArea} handleChange={(text)=>this.setState({activityArea:text})} />
          <RoundTextInput placeHolder="Type de contrat" style={{marginTop: 15 * em}}
            value={contractType} handleChange={(text)=>this.setState({contractType:text})} />
          <RoundTextInput placeHolder="Ville" style={{marginTop: 15 * em}}
            value={city} handleChange={(text)=>this.setState({city:text})} />
          <TouchableOpacity onPress={() => {
              this.didClickSearchButton()
          }}>
            <RoundButton text="Recherer" rightIcon="next" style={{marginTop: 15 * em}}/>
          </TouchableOpacity>
        </AccountLayout>
    );
  }
}

export default SearchTabMainScreen
