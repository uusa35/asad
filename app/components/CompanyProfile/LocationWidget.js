import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import I18n from './../../I18n';

export default class LocationWidget extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {settings} = this.props;
    return (
      <View style={styles.panelWrapper}>
        <View style={styles.panelTitleWrapper}>
          <Text style={styles.panelTitle}>{I18n.t('location')}</Text>
        </View>
        <View style={styles.panelContentWrapper}>
          <Text style={styles.panelContent}>location map</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panelWrapper: {
    margin: 10,
    borderWidth: 1,
    borderColor: 'darkgrey',
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 2,
    shadowOpacity: 0.3
  },
  panelTitleWrapper: {
    backgroundColor: '#474747'
  },
  panelTitle: {
    paddingLeft: 15,
    padding: 5,
    fontSize: 18,
    color: 'white',
    fontFamily: 'cairo',
    textAlign: 'left'
  },
  panelContentWrapper: {
    padding: 15,
    backgroundColor: 'white'
  },
  panelContent: {
    fontFamily: 'cairo',
    fontSize: 15,
    textAlign: 'left'
  }
});
