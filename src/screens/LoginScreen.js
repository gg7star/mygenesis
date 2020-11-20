import React, { Component } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { authWithEmail, loginFailed } from '../slices/loginSlice'
import {validateEmail} from '../utils/Validators'
import {showRootToast} from '../utils/misc'

import {em, WIDTH} from '../common'
import { TouchableOpacity, StatusBar, Alert } from "react-native"
import { Actions } from 'react-native-router-flux'

import AccountLayout from '../layouts/AccountLayout'
import HorizontalCenterLayout from '../layouts/HorizontalCenterLayout'
import VerticalCenterFlowLayout from '../layouts/VerticalCenterFlowLayout'

import LogoView from '../components/LogoView'
import RoundButton from '../components/button/RoundButton'
import Separator from '../components/Separator'
import {CommonText, TitleText, SmallText, CustomTextInput} from '../components/text'
import Toast from 'react-native-root-toast'
import Spinner from 'react-native-loading-spinner-overlay'
import { resetPasswordWithEmail } from '../utils/firebase/auth'

class LoginScreen extends Component {
  constructor(props){
    super(props)

    this.state = {
      email:"",
      password:""
    }
  }

  handleLogin = () => {
    // Actions.mainTab()
    const {email, password} = this.state
    const {isFetching} = this.props

    if (!validateEmail(email)) {
      // showRootToast('Veuillez saisir une adresse e-mail valide.')
      Alert.alert(
        'Alerte',
        'Veuillez saisir une adresse e-mail valide.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: true },
      );
      return
    }

    if (password == ""){
      // showRootToast('Veuillez eVeuillez entrer votre mot de passe.')
      Alert.alert(
        'Alerte',
        'Veuillez eVeuillez entrer votre mot de passe.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: true },
      );
      return
    }

    const timerId = setTimeout(() => {
      console.log("DB: Timeouted")
       if (isFetching) {
         this.props.loginFailed("DB: Timeout")
         showRootToast('DB: Timeout')
       }
    }, 5000)

    this.props.authWithEmail(email, password)
  }

  handleForgotPassword = async () => {
    const { email, password } = this.state
    if (!email) {
      Alert.alert(
        'Alerte',
        'Veuillez saisir votre adresse e-mail.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: true },
      );
      return
    }
    const res = await resetPasswordWithEmail(email)
    console.log('==== res: ', res)
    var message = 'Merci de consulter vos emails.'
    if (!res || res.error) {
      message = 'Veuillez saisir une adresse e-mail valide.'
    }
    Alert.alert(
      'Alerte',
      message,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: true },
    );
  }

  render() {
    const {email, password} = this.state
    const {isFetching} = this.props
    const {statusMessage} = this.props

    return (
      <AccountLayout>
        <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />
        <LogoView size="small" style={{marginTop: 20 * em}}/>
        <TitleText style={{marginTop: 35 * em, marginBottom: 15 * em}} theme="black">Me connecter</TitleText>

        <VerticalCenterFlowLayout style={{backgroundColor: "#ffffff", borderRadius: 22*em}}>
          <CustomTextInput
            placeHolder="Email"
            textContentType="emailAddress"
            keyboardType="email-address"
            value={email}
            handleChange={text => this.setState({email: text})}
            style={{
              borderTopLeftRadius: 22 * em,
              borderTopRightRadius: 22 * em,
            }}
          />
          <Separator style={{width: WIDTH * 0.85, backgroundColor: "#f5f6fa"}}/>
          <CustomTextInput
            placeHolder="Mot de passe"
            secureTextEntry={true}
            value={password}
            handleChange={text => this.setState({password: text})}
            textContentType="password" 
            rightText="OUBLIÉ ?"
            onPressRightText={this.handleForgotPassword}
            style={{
              borderBottomLeftRadius: 22 * em,
              borderBottomRightRadius: 22 * em,
            }}
          />
        </VerticalCenterFlowLayout>

        <TouchableOpacity onPress={() => {this.handleLogin()}}>
          <RoundButton
            text="Me connecter"
            rightIcon="next"
            style={{marginTop: 75 * em}}
          />
        </TouchableOpacity>
        <HorizontalCenterLayout style={{marginBottom: 30 * em}}>
          <CommonText theme="gray" style={{marginTop: 25 * em}}>Pas de compte ? </CommonText>
          <TouchableOpacity onPress={() => {Actions.subscribe()}}>
            <CommonText theme="primary" style={{marginTop: 25 * em}}>M'inscrire</CommonText>
          </TouchableOpacity>
        </HorizontalCenterLayout>
        <Spinner
          visible={this.props.isFetching}
          textContent={''}
          textStyle={{ color: '#FFF' }}
        />
      </AccountLayout>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated,
  isFetching: state.login.isFetching,
  statusMessage: state.login.statusMessage,
  credential: state.login.credential,
})

const mapDispatchToProps = dispatch => {
  return {
    authWithEmail: (...args) => dispatch(authWithEmail(...args)),
    loginFailed: (...args) => dispatch(loginFailed(...args)),
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginScreen)
