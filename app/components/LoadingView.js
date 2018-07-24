import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import I18n from './../I18n';
import {images, height, width} from './../constants';
import FastImage from 'react-native-fast-image';

export default class LoadingView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.activityContainer, {backgroundColor: 'white'}]}>
        <ActivityIndicator style={{marginBottom: 15}} />
        <FastImage
          source={images.logo}
          style={{width: 100, height: 120, margin: 12}}
        />
        <Text>{I18n.t(this.props.loadingText)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityContainer: {
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    backgroundColor: 'white'
  }
});
