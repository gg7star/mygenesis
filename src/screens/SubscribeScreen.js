import React, {Component} from 'react';
import {WIDTH, HEIGHT, em} from '../common';
import {TouchableOpacity, StatusBar} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {showRootToast} from '../utils/misc';

import AccountLayout from '../layouts/AccountLayout';
import HorizontalCenterLayout from '../layouts/HorizontalCenterLayout';
import VerticalCenterFlowLayout from '../layouts/VerticalCenterFlowLayout';

import LogoView from '../components/LogoView';
import AccountDropDown from '../components/custom/AccountDropDown';
import RoundButton from '../components/button/RoundButton';
import {
  CommonText,
  TitleText,
  SmallText,
  RoundTextInput,
} from '../components/text';
import {AgreeCheckBox} from '../components/checkbox';

class SubscribeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      civility: '',
      firstName: '',
      lastName: '',
      toggleCheckBox: false,
    };
  }

  handleContinue = () => {
    const {civility, firstName, lastName, toggleCheckBox} = this.state;
    if (civility === '') {
      showRootToast('Merci de mettre civilité');
      return;
    }
    if (firstName == '') {
      showRootToast('Merci de mettre prénom');
      return;
    }
    if (lastName == '') {
      showRootToast('Merci de mettre nom de famille');
      return;
    }
    if (!toggleCheckBox) {
      showRootToast('Accepter les CGU et les mentions légales pour continuer');
      return;
    }
    Actions.connectionMessage({civility, firstName, lastName});
  };

  setToggleCheckBox = toggle => {
    this.setState({toggleCheckBox: toggle});
  };

  handleGoLogin = () => {
    Actions.pop();
    Actions.login();
  };

  render() {
    return (
      <AccountLayout>
        <StatusBar
          barstyle="dark-content"
          translucent
          backgroundColor="transparent"
        />
        <LogoView size="small" style={{marginTop: 20 * em}} />
        <TitleText style={{marginTop: 35 * em}} theme="black">
          M'inscrire
        </TitleText>
        <SmallText theme="gray">*Champ obligatoire</SmallText>

        <AccountDropDown
          defaultValue={this.state.civility}
          onChangeItem={item =>
            this.setState({
              civility: item.value,
            })
          }
          items={[
            {label: 'Madame', value: 'Madame'},
            {label: 'Monsieur', value: 'Monsieur'},
          ]}
          style={{marginTop: 20 * em}}
          placeholder="Civilité"
        />
        <RoundTextInput
          placeHolder="Nom*"
          textContentType="familyName"
          style={{marginTop: 15 * em}}
          value={this.state.firstName}
          handleChange={text => this.setState({firstName: text})}
        />
        <RoundTextInput
          placeHolder="Prénom*"
          textContentType="givenName"
          style={{marginTop: 15 * em}}
          value={this.state.lastName}
          handleChange={text => this.setState({lastName: text})}
        />
        <AgreeCheckBox
          style={{marginTop: 25 * em}}
          value={this.state.toggleCheckBox}
          onValueChange={() =>
            this.state.toggleCheckBox
              ? this.setToggleCheckBox(false)
              : this.setToggleCheckBox(true)
          }
        />
        <TouchableOpacity onPress={this.handleContinue.bind(this)}>
          <RoundButton
            text="Continuer"
            rightIcon="next"
            style={{marginTop: 15 * em}}
          />
        </TouchableOpacity>
        <HorizontalCenterLayout style={{marginBottom: 30 * em}}>
          <CommonText theme="gray" style={{marginTop: 25 * em}}>
            Déjà un compte ?{' '}
          </CommonText>
          <CommonText
            theme="primary"
            style={{marginTop: 25 * em}}
            onPress={this.handleGoLogin}>
            Me connecter
          </CommonText>
        </HorizontalCenterLayout>
      </AccountLayout>
    );
  }
}

export default SubscribeScreen;
