import React, {Component} from 'react';
import {View, Text, ActivityIndicator, Image, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import I18n from './../I18n';
import {images, height, width} from './../constants';
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
        <ActivityIndicator style={{marginBottom: 30}} />
        <Text>{I18n.t('no_internet')}</Text>
        <Button
          textStyle={styles.cartBtn}
          color="black"
          fontFamily="Cairo"
          backgroundColor="#f4f4f4"
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
  }
});
