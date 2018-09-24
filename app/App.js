import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {appBootstrap} from './redux/actions';
import {AppNavigator} from './AppNavigator';
import codePush from 'react-native-code-push';
import LoadingView from './components/LoadingView';
import LoadingOfflineView from './components/LoadingOfflineView';
import AlertMessage from './components/AlertMessage';

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

  render() {
    const {network, bootStrapped, isLoading, message} = this.props;
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
