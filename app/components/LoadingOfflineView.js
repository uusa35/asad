import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {Icon} from 'react-native-elements';
import I18n from './../I18n';
import codePush from 'react-native-code-push';
import {colors} from './../constants';

export default class LoadingOfflineView extends Component {
  _retry() {
    return codePush.restartApp();
  }

  render() {
    return (
      <View style={styles.activityContainer}>
        <ActivityIndicator style={{marginBottom: 15}} />
        <Text style={styles.loadingMessage}>{I18n.t('no_internet')}</Text>
        <TouchableOpacity onPress={() => this._retry()} style={styles.menuBtn}>
          <Icon name="repeat" color="black" />
          <Text style={styles.retryBtnTitle}>{I18n.t('retry')}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  loadingMessage: {
    fontFamily: 'cairo',
    color: 'black',
    fontSize: 15,
    margin: 15
  },
  retryBtnTitle: {
    fontFamily: 'cairo',
    color: 'black',
    fontSize: 15
  },
  menuBtn: {
    backgroundColor: colors.main
  }
});
