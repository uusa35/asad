import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import I18n from './../I18n';
import {height, width, colors} from './../constants';
import codePush from 'react-native-code-push';

export default class LoadingOfflineView extends Component {
  constructor(props) {
    super(props);
  }
  _retry() {
    return codePush.restartApp();
  }

  render() {
    return (
      <View
        style={[
          styles.activityContainer,
          {backgroundColor: 'white', width: width, height: height}
        ]}>
        <ActivityIndicator style={{marginBottom: 15}} />
        <Text style={styles.loadingMessage}>{I18n.t('no_internet')}</Text>
        <Button
          titleStyle={styles.retryBtnTitle}
          color="black"
          buttonStyle={{backgroundColor: colors.main}}
          icon={{name: 'repeat', color: 'black'}}
          title={I18n.t('retry')}
          onPress={() => this._retry()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityContainer: {
    height: height,
    justifyContent: 'center',
    alignItems: 'center'
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
  }
});
