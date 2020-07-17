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

import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'
import JobMetaAdapter from '../../components/custom/JobMetaAdapter'
import AccountLayout from '../../layouts/AccountLayout'
import HorizontalLayout from '../../layouts/HorizontalLayout'
import {CommonText, TitleText, SmallText, RoundTextInput} from '../../components/text'

class MyOffersTabScreen extends Component {
    constructor(props){
      super(props)
      this.state = {
        listData: [{key: 1, global: true, favorite: false, title: "Chef de project digital", durationType: "CDi", budget: "33000", availability: "ASAP", location: "Bordeaux"},
                  {key: 2, global: false, favorite: false, title: "Foreur h/f", durationType: "CCD", budget: "33000", availability: "5 juin 2020", location: "Bordeaux"},
                  {key: 3, global: false, favorite: false, title: "Foreur h/f", durationType: "CCD", budget: "33000", availability: "5 juin 2020", location: "Bordeaux"}]
      }
    }

    closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setListData(newData);
    };

    renderItem = (data, rowMap) => (
        <SwipeRow
            disableLeftSwipe={true}
            leftOpenValue={120*em}
        >
            <HorizontalLayout style={{flex: 1, backgroundColor: "#f86a80", borderRadius: 15.5 * em, marginBottom: 15.5 * em}}>
              <Image source={require('../../assets/images/btn_delete_item.png')}
                style={{width: 32 * em, height: 32 * em, marginLeft: 50*em}} resizeMode={'stretch'} />
            </HorizontalLayout>
            <TouchableHighlight
                onPress={() => console.log('You touched me')}
                underlayColor={'#f5f6fa'}
            >
                <View>
                  <JobMetaAdapter global={data.item.global} favorite={data.item.favorite}
                    title={data.item.title} durationType={data.item.durationType}
                    budget={data.item.budget} availability={data.item.availability}
                    location={data.item.location}/>
                </View>
            </TouchableHighlight>
        </SwipeRow>
    );

    render() {
      return (
          <AccountLayout>
            <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />
            <TitleText style={{marginTop: 35 * em, marginBottom: 10 * em}} theme="black">Mes offres</TitleText>
            <SmallText theme="gray" style={{marginBottom: 20 * em}}>Pour supprimer l'offre glisser vers la droite</SmallText>
            <SwipeListView data={this.state.listData} renderItem={this.renderItem} />
          </AccountLayout>
      );
    }
}

export default MyOffersTabScreen
