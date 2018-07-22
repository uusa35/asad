/**
 * Created by usamaahmed on 9/28/17.
 */
import React, {Component} from 'react';
import {View, I18nManager, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {colors, width} from './../constants';

export default class HeaderCustom extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.headerTopBarSectionA}>
        <Icon
          font="octicon"
          underlayColor="transparent"
          name={I18nManager.isRTL ? 'chevron-right' : 'chevron-left'}
          size={45}
          hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
          onPress={() => this.props.navigation.goBack()}
          color={colors.themeBg}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerTopBarSectionA: {
    width: width / 4,
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'flex-start'
  }
});
