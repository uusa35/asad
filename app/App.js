import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {appBootstrap, disableMessage} from './redux/actions';
import {AppNavigator} from './Navigator';
import codePush from 'react-native-code-push';
import LoadingView from './components/LoadingView';
import LoadingOfflineView from './components/LoadingOfflineView';
import AlertMessage from './components/AlertMessage';
import DropdownAlert from 'react-native-dropdownalert';

import validate from 'validate.js';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {bootstrapped} = this.props;
    if (!bootstrapped) {
      this.props.dispatch(appBootstrap());
    }
    codePush.allowRestart();
  }

  // ...
  onAlert = message => {
    console.log('on alert fun started');
    // this.dropdown.alertWithType('error', 'Error', error);
    // if (error) {
    //   this.dropdown.alertWithType('error', 'Error', error);
    // }
  };
  // ...
  onClose(data) {
    console.log('now is closed');
    // data = {type, title, message, action}
    // action means how the alert was closed.
    // returns: automatic, programmatic, tap, pan or cancel
    this.props.dispatch(disableMessage);
  }

  render() {
    const {network, bootStrapped, isLoading, message} = this.props;
    console.log('the message visible', message);
    if (!validate.isEmpty(network) && !network.isConnected)
      return <LoadingOfflineView style={{flex: 1, alignItems: 'center'}} />;
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
