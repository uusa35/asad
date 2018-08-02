import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import I18n, {isRTL} from '../I18n';
import FastImage from 'react-native-fast-image';
import {colors, icons} from '../constants';
import {Input, Icon} from 'react-native-elements';

export default class SearchInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Input
          onChangeText={e => this.setState({search: e})}
          placeholder={I18n.t('search').toUpperCase()}
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.inputTextStyle}
          rightIconContainerStyle={styles.rightIconStyle}
          keyboardType="default"
          rightIcon={
            <FastImage source={icons.user} style={[styles.iconTabBar]} />
          }
        />
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  inputContainerStyle: {
    backgroundColor: 'white',
    minHeight: 50,
    marginTop: 8,
    marginBottom: 8,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 2,
    shadowOpacity: 0.2
  },
  inputTextStyle: {
    fontFamily: 'cairo',
    fontSize: 15,
    textAlign: isRTL ? 'right' : 'left'
  },
  rightIconStyle: {
    backgroundColor: colors.main,
    width: 50,
    position: 'relative',
    right: 0,
    height: 50
  },
  iconTabBar: {
    width: 40,
    height: 40
  }
});
