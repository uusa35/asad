import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import I18n from './../I18n';
import {images, width} from './../constants';
import FastImage from 'react-native-fast-image';

export default class LoadingView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.activityContainer}>
        <ActivityIndicator style={{marginBottom: 15}} />
        <FastImage
          source={images.logo}
          style={{width: 100, height: 120, margin: 12}}
        />
        <Text style={styles.loadingText}>{I18n.t(this.props.loadingText)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    backgroundColor: 'transparent',
    opacity: 0.8
  },
  loadingText: {
    fontFamily: 'cairo',
    fontSize: 15,
    color: 'black'
  }
});
