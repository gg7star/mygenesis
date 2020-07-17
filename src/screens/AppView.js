import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RootSiblingParent } from 'react-native-root-siblings'
import {
  StyleSheet, View, SafeAreaView
} from 'react-native';
import RootRoutes from '../routes';

class AppView extends Component {
  state = {
    loaded: false
  };

  async UNSAFE_componentWillReceiveProps(nextProps) {
    const { app } = nextProps;
    const { loaded } = this.state;
    if (app.loaded && !loaded) {
      const _this = this;
      this.setState({loaded: true}, () => {
        _this.initialize();
      });
    }
  }

  async initialize() {
  }

  render() {
    return (
      <RootSiblingParent>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <RootRoutes />
          </View>
        </SafeAreaView>
      </RootSiblingParent>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  safeArea: {
    flex: 1
  }
});

const mapDispatchToProps = dispatch => ({
  // appActions: bindActionCreators(AppActions, dispatch),
});

export default connect(
    null,
    mapDispatchToProps)(AppView);
