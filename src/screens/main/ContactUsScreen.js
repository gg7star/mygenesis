import React, { Component } from 'react'
import { TouchableOpacity, StatusBar, Image, View, Alert } from "react-native"
import Spinner from 'react-native-loading-spinner-overlay'
import {TitleText, CommonText, CommonRegularText, SmallText, RoundTextInput, MediumText} from '../../components/text'
import {em, WIDTH} from '../../common'
import AccountLayout from '../../layouts/AccountLayout'
import HorizontalJustifyLayout from '../../layouts/HorizontalJustifyLayout'
import HorizontalLayout from '../../layouts/HorizontalLayout'
import HorizontalCenterLayout from '../../layouts/HorizontalCenterLayout'
import VerticalFlowLayout from '../../layouts/VerticalFlowLayout'
import VerticalJustifyLayout from '../../layouts/VerticalJustifyLayout'
import VerticalCenterLayout from '../../layouts/VerticalCenterLayout'
import RoundButton from '../../components/button/RoundButton'
import RoundExpandableButton from '../../components/button/RoundExpandableButton'
import RoundDropDownButton from '../../components/button/RoundDropDownButton'
import Separator from '../../components/Separator'
import Modal from 'react-native-modal'
import Accordion from 'react-native-collapsible/Accordion'
import AccountDropDown from '../../components/custom/AccountDropDown'
import commonStyles from '../../components/common_styles'
import {addAdminContactMessage} from '../../utils/firebase/database'

const SECTIONS = [
  {
    title: 'Sujet*',
    content: [
      'Demande de renseignements',
      'Prise/demande de RDV/contact',
      'Disponibilités',
      'Demande de formation',
      'Probleme compte',
      'Autre',
    ],
  },
];

const SUJET = [
  { label: 'Demande de renseignements', value: 'Demande de renseignements' },
  { label: 'Prise/demande de RDV/contact', value: 'Prise/demande de RDV/contact' },
  { label: 'Disponibilités', value: 'Disponibilités' },
  { label: 'Demande de formation', value: 'Demande de formation' },
  { label: 'Probleme compte', value: 'Probleme compte' },
  { label: 'Autre', value: 'Autre' },
]

class ContactUsScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      isModalVisible: false,
      activeSections: [],
      subject: '',
      email: '',
      content: '',
      isFetching: false,
    }
  }

  _renderSectionTitle = section => {
    return (
      <View>
      </View>
    );
  };

  _renderHeader(section, i, isActive, sections) {
    let buttonStyle = {}
    if (isActive) {
      buttonStyle = {borderBottomLeftRadius: 0, borderBottomRightRadius: 0}
    }
    return (
      <VerticalCenterLayout>
        <RoundDropDownButton theme="gray" text={section.title} expand={isActive} style={[{alignSelf:"center", marginTop: 10*em}, buttonStyle]}/>
      </VerticalCenterLayout>
    );
  };

  _renderContent = (section, i, isActive, sections) => {
    let buttonStyle = {borderBottomLeftRadius: 20*em, borderBottomRightRadius: 20*em}
    let buttonsListArr = section.content.map((contentInfo, index) => (
      <VerticalFlowLayout style={{paddingLeft: 25*em, width:'100%'}}>
        {index != 5 &&
          <MediumText theme="gray" style={{marginBottom: 20*em}}>{contentInfo}</MediumText>
        }
        {index == 5 &&
          <MediumText theme="gray" style={{marginBottom: 10*em}}>{contentInfo}</MediumText>
        }
        {index != 5 &&
          <Separator
            style={{
              // width: WIDTH * 0.85 - 25 * em,
              width: '100%',
              backgroundColor: '#f5f6fa',
              marginBottom: 20 * em,
            }}
          />
        }
      </VerticalFlowLayout>
    ));
    return (
      <VerticalCenterLayout
        style={[
          {
            width: '100%', //WIDTH * 0.85,
            backgroundColor: '#ffffff',
            paddingHorizontal: 20 * em,
            paddingVertical: 15 * em,
          },
          buttonStyle,
        ]}>
        {buttonsListArr}
      </VerticalCenterLayout>
    );
  };

  _updateSections = activeSections => {
    this.setState({activeSections});
  };

  handleSend = () => {
    const {subject, email, content} = this.state;
    if (!subject || !email || !content) {
      Alert.alert(
        'Alerte',
        'Vous devez saisir tous les champs.',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: true},
      );
      return;
    }
    this.setState({isModalVisible: true});
  };

  handleSendMessage = async () => {
    const { subject, email, content } = this.state;
    this.setState({isFetching: true});
    const res = await addAdminContactMessage({subject, email, content});
    this.setState({ isFetching: false, isModalVisible: false });
  }

  render() {
    return (
      <AccountLayout style={{paddingLeft: '5%', paddingRight: '5%'}}>
        {this.state.isModalVisible &&
        <StatusBar barstyle="dark-content" translucent backgroundColor="#18277a" />}
        {!this.state.isModalVisible &&
        <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />}
        <HorizontalJustifyLayout style={{marginTop: 25 * em}}>
          <TouchableOpacity onPress={() => {
            this.props.navigation.goBack()
          }}>
            <Image source={require('../../assets/images/ic_back.png')} style={{width: 30*em, height: 30*em}} resizeMode={'stretch'} />
          </TouchableOpacity>
          <CommonText theme="blue_gray" style={{marginLeft: 5 * em}}>Nous contacter</CommonText>
          <View style={{width: 30*em}}/>
        </HorizontalJustifyLayout>
        <CommonRegularText theme="gray" style={{marginTop: 5*em}}>Venez-nous rencontrer ou appelez-nous</CommonRegularText>
        <VerticalFlowLayout
          style={[
            {
              marginTop: 20*em,
              width: WIDTH*0.85,
              backgroundColor: "#ffffff",
              borderRadius: 20*em,
              width: '100%'
            },
            commonStyles.shadow.card,
          ]}
        >
          <HorizontalJustifyLayout style={{paddingHorizontal: 15*em, paddingVertical: 10*em}}>
            <VerticalFlowLayout>
              <CommonRegularText theme="gray">Agence</CommonRegularText>
              <CommonText theme="blue_gray" style={{marginRight: 30*em}}>Genesis-rh - Macon</CommonText>
            </VerticalFlowLayout>
            <Image source={require('../../assets/images/ic_dropdown.png')} style={{width: 20*em, height: 20*em}} resizeMode={'stretch'} />
          </HorizontalJustifyLayout>
          <Separator style={{width: WIDTH * 0.85, backgroundColor: "#f5f6fa"}}/>
          <HorizontalLayout style={{width: 130*em, marginLeft: 15*em}}>
            <Image source={require('../../assets/images/ic_address.png')}
              style={{width: 13 * em, height: 13 * em, marginTop: 10 * em}}
              resizeMode={'stretch'} />
            <CommonRegularText theme="gray" style={{marginTop: 10 * em, marginLeft: 10*em}}>38-40 Rue Victor Hugo 71000 Macon</CommonRegularText>
          </HorizontalLayout>
          <HorizontalLayout style={{width: 130*em, marginLeft: 15*em}}>
            <Image source={require('../../assets/images/ic_phone.png')}
              style={{width: 13 * em, height: 13 * em, marginTop: 10 * em}}
              resizeMode={'stretch'} />
            <CommonRegularText theme="gray" style={{marginTop: 10 * em, marginLeft: 10*em}}>03 85 20 30 00</CommonRegularText>
          </HorizontalLayout>
          <HorizontalLayout style={{width: 130*em, marginLeft: 15*em, marginBottom: 15*em}}>
            <Image source={require('../../assets/images/ic_cell_phone.png')}
              style={{width: 13 * em, height: 13 * em, marginTop: 10 * em}}
              resizeMode={'stretch'} />
            <CommonRegularText theme="gray" style={{marginTop: 10 * em, marginLeft: 10*em}}>06 00 00 00 00</CommonRegularText>
          </HorizontalLayout>
        </VerticalFlowLayout>
        <CommonText theme="blue_gray" style={{marginTop: 20 * em}}>Envoyez-nous un message</CommonText>
        <AccountDropDown
          defaultValue={this.state.subject}
          onChangeItem={item => this.setState({ subject: item.value })}
          items={SUJET}
          style={{ marginTop: 10 * em, width: '100%'}}
          placeholder={SECTIONS[0].title} />
        {/* <Accordion
          sections={SECTIONS}
          activeSections={this.state.activeSections}
          renderSectionTitle={this._renderSectionTitle}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          onChange={this._updateSections}
          expandMultiple={true}
          touchableComponent={TouchableOpacity}
        /> */}
        <RoundTextInput
          placeHolder="Email*"
          textContentType="emailAddress"
          keyboardType="email-address"
          style={{marginTop: 10 * em, width: '100%'}}
          value={this.state.email}
          handleChange={text => this.setState({email: text})}
        />
        <RoundTextInput
          placeHolder="Message*"
          multiline={true}
          style={{marginTop: 10 * em, paddingTop: 10 * em, width: '100%'}}
          textInputStyle={{height: 150 * em}}
          value={this.state.content}
          handleChange={text => this.setState({content: text})}
        />
        <TouchableOpacity onPress={this.handleSend}>
          <RoundButton
            text="Envoyer"
            rightIcon="next"
            style={{marginTop: 10 * em, marginBottom: 20 * em}}
          />
        </TouchableOpacity>

        <Modal
          isVisible={this.state.isModalVisible}
          backdropColor="#18277a"
          backdropOpacity={0.95}>
          <VerticalJustifyLayout style={{flex: 1, width: '100%'}}>
            <View style={{height: 56 * em, marginTop: 20 * em}} />
            <VerticalCenterLayout
              style={{
                padding: 30 * em,
                width: '100%', //WIDTH * 0.85,
                backgroundColor: '#ffffff',
                borderRadius: 20 * em,
              }}>
              <Image
                source={require('../../assets/images/check_bounded.png')}
                style={{width: 60 * em, height: 60 * em}}
                resizeMode={'stretch'}
              />
              <TitleText
                theme="primary"
                style={{textAlign: 'center', marginTop: 20 * em}}>
                Merci{'\n'}pour vetre message
              </TitleText>
            </VerticalCenterLayout>
            <TouchableOpacity
              style={{width: '100%'}}
              onPress={this.handleSendMessage}>
              <RoundButton theme="gray" text="Fermer" />
            </TouchableOpacity>
          </VerticalJustifyLayout>
          <Spinner
            visible={this.state.isFetching}
            textContent={''}
            textStyle={{ color: '#FFF' }}
          />
        </Modal>
      </AccountLayout>
    );
  }
}

export default ContactUsScreen
