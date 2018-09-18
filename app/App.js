import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {appBootstrap} from './redux/actions';
import {AppNavigator} from './AppNavigator';
import codePush from 'react-native-code-push';
import LoadingView from './components/LoadingView';
import LoadingOfflineView from './components/LoadingOfflineView';
import AlertMessage from './components/AlertMessage';
import OneSignal from 'react-native-onesignal'; // Import package from node modules

import validate from 'validate.js';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    OneSignal.init('03881e7c-ce2f-44c0-8828-233674af6eab');
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  componentDidMount() {
    const {bootstrapped} = this.props;
    if (!bootstrapped) {
      this.props.dispatch(appBootstrap());
    }
    codePush.allowRestart();
  }

  render() {
    const {network, bootStrapped, isLoading, message} = this.props;
    // if (!validate.isEmpty(network) && !network.isConnected)
    //   return <LoadingOfflineView style={{flex: 1, alignItems: 'center'}} />;
    if (!bootStrapped || isLoading)
      return (
        <LoadingView
          style={{flex: 1, alignItems: 'center'}}
          loadingText="loading"
        />
      );
    return (
      <View style={{backgroundColor: 'transparent', flex: 1}}>
        <AppNavigator />
        {!validate.isEmpty(message) && message.visible ? (
          <AlertMessage />
        ) : null}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(codePush(App));
