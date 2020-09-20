import React, { Component } from 'react'
import {em} from '../common'
import { TouchableOpacity, StatusBar } from "react-native"
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import { signupWithInfo } from '../slices/signupSlice'

import AccountLayout from '../layouts/AccountLayout'
import HorizontalCenterLayout from '../layouts/HorizontalCenterLayout'

import LogoView from '../components/LogoView'
import AccountDropDown from '../components/custom/AccountDropDown'
import RoundButton from '../components/button/RoundButton'
import {TitleText, SmallText} from '../components/text'
import {RoundUploadButton, RoundDropDownButton} from '../components/button'
import {AgreeCheckBox, CommonCheckBox} from '../components/checkbox'
import {showRootToast} from '../utils/misc'
import {FireBaseStorage, uploadFileToFireBase} from '../utils/firebase/storage'
import DropDownPicker from 'react-native-dropdown-picker'
import FilePickerManager from 'react-native-file-picker'
import Spinner from 'react-native-loading-spinner-overlay'
import DocumentPicker from 'react-native-document-picker'

class MyCVScreen extends Component {
  constructor(props){
    super(props)

    this.state = {
      cvFileUri: "",
      cvFirebasePath: "",
      cvFileName: "",
      cvFileExtension: "",
      activityArea: "",
      job: "",
      toggleCheckBox: false,
    }
  }

  setToggleCheckBox = (toggle) => {
      this.setState({toggleCheckBox: toggle})
  }

  handleContinue = () => {
    const {cvFileUri, cvFileName, cvFileExtension, activityArea, job, toggleCheckBox} = this.state
    const {email, password, civility, firstName, lastName, zipCode, city, telephone} = this.props
    console.log("Firebase Storage", JSON.stringify(FireBaseStorage))
    if (cvFileName == "") {
      showRootToast('Please upload cv file')
      return
    }
    if (cvFileExtension != "pdf" && cvFileExtension != "doc" &&
      cvFileExtension != "docx" && cvFileExtension != "jpg" &&
      cvFileExtension != "jpeg" && cvFileExtension != "png") {

      showRootToast('CV File should be one of pdf, word or image')
      return
    }

    if (activityArea == "") {
      showRootToast('Please select activity area')
      return
    }
    if (job == "") {
      showRootToast('Please select job')
      return
    }

    this.props.signupWithInfo(this.props, activityArea, job, cvFileUri, cvFileName)
  }

  monitorFileUpload = uploadTask => {
    const {cvFirebasePath, activityArea, job} = this.state
    uploadTask.on('state_changed', snapshot => {
      switch (snapshot.state) {
        case 'running':
          this.setState({cvFirebasePath: null})
          break
        case 'success':
          snapshot.ref.getDownloadURL().then(downloadURL => {
              this.setState({cvFirebasePath: downloadURL})
              this.props.signupWithInfo(this.props, cvFirebasePath, activityArea, job)
          })
          break
        default:
          break
      }
    });
  }

  handleIOSDocumentPicker = async () => {
        try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
        })
        console.log(
          res.uri,
          res.type, // mime type
          res.name,
          res.size
        );
        const localPath = res.uri
        this.setState({
          cvFilePath: localPath,
          cvFileName: this.getFileNameFromUri(localPath),
          cvFileExtension: this.getFileExtensionFromUri(localPath)
        })
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
        } else {
          throw err
        }
      }
  }

  handleCVUpload = () => {
    if (Platform.OS == 'android') {
      FilePickerManager.showFilePicker(null, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled file picker');
        }
        else if (response.error) {
          console.log('FilePickerManager Error: ', response.error);
        }
        else {
          console.log("File Response", response)
          const localPath = "file://" + response.path
          console.log("File Path", response)
          this.setState({
            cvFilePath: localPath,
            cvFileName: this.getFileNameFromUri(localPath),
            cvFileExtension: this.getFileExtensionFromUri(localPath)
          })
        }
      })
    }
    else {
      this.handleIOSDocumentPicker()
    }
  }

  getFileExtensionFromUri = (uri) => {
    let fileName = this.getFileNameFromUri(uri)
    let lastIndex = fileName.lastIndexOf(".")
    if (lastIndex == -1) {
      return ""
    }
    return fileName.substring(lastIndex + 1, fileName.length)
  }

  getFileNameFromUri = (uri) => {
    let components = uri.split("/")
    if (components.length == 0) {
      return null
    }
    return components[components.length - 1].replace(/%20/g, " ")
  }

  getCVFileName = () => {
    const {cvFileName} = this.state
    if (cvFileName == "") {
      return "Ajouter Mon CV"
    }
    return cvFileName
  }

  render() {
    const {cvFileName, activityArea, job, toggleCheckBox} = this.state
    return (
        <AccountLayout>
          <StatusBar barstyle="dark-content" translucent backgroundColor="transparent" />
          <LogoView size="small" style={{marginTop: 20 * em}}/>
          <TitleText style={{marginTop: 35 * em}} theme="black">Mon CV</TitleText>
          <SmallText theme="gray">*Champ obligatoire</SmallText>

          <TouchableOpacity onPress={this.handleCVUpload.bind(this)}>
            <RoundUploadButton text={this.getCVFileName()} style={{marginTop: 20 * em}} />
          </TouchableOpacity>
          <AccountDropDown defaultValue={activityArea}
            onChangeItem={item => this.setState({
                activityArea: item.value
            })}
            items={[
                {label: 'Paris', value: 'Paris'},
                {label: 'Aoste', value: 'Aoste'}
            ]}
            style={{marginTop: 20*em}}
            placeholder="Secteur d'activité*"/>

          <AccountDropDown defaultValue={job}
            onChangeItem={item => this.setState({
                job: item.value
            })}
            items={[
                {label: 'BTP', value: 'BTP'},
                {label: 'INDUSTRIE', value: 'INDUSTRIE'},
                {label: 'TERTIAIRE', value: 'TERTIAIRE'},
                {label: 'TRANSPORT/LOGITIQUE', value: 'TRANSPORT/LOGITIQUE'},
                {label: 'AGRICULTURE', value: 'AGRICULTURE'},
                {label: 'MEDICAL', value: 'MEDICAL'}
            ]}
            style={{marginTop: 20*em}}
            placeholder="Métier*"/>

          <CommonCheckBox text="J'autorise Genesis-RH à me contacter"
            style={{marginTop: 15*em}} value={toggleCheckBox}
            onValueChange={() => toggleCheckBox ? this.setToggleCheckBox(false) : this.setToggleCheckBox(true)}/>
          <TouchableOpacity onPress={this.handleContinue.bind(this)}>
            <RoundButton text="Enregistrer mes informations" style={{marginTop: 75 * em, marginBottom: 25 * em}}/>
          </TouchableOpacity>

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
  isFetching: state.signup.isFetching,
  statusMessage: state.signup.statusMessage,
  credential: state.signup.signupInfo,
})

const mapDispatchToProps = dispatch => {
  return {
    signupWithInfo: (...args) => dispatch(signupWithInfo(...args)),
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyCVScreen)
