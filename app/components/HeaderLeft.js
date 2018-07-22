/**
 * Created by usamaahmed on 9/28/17.
 */
import React, {Component} from 'react';
import {View, Image, TouchableHighlight, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {NavigationActions} from 'react-navigation';
import {width, colors} from './../constants';

export default class HeaderLeft extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.headerTopBarSectionA}>
        <Icon
          name="menu"
          size={35}
          onPress={() => this.props.navigation.navigate('DrawerOpen')}
          underlayColor="transparent"
          hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
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
