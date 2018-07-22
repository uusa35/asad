import React, {Component} from 'react';
import {View, Text, ActivityIndicator, Image, StyleSheet} from 'react-native';
import I18n from './../I18n';
import {images, height, width} from './../constants';

export default class LoadingView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.activityContainer, {backgroundColor: 'white'}]}>
        <ActivityIndicator style={{marginBottom: 30}} />
        <Image source={images.logo} style={{width: 80, height: 80}} />
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
