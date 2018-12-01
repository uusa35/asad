/**
 * Created by usamaahmed on 9/28/17.
 */
import React, {Component} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {SafeAreaView} from 'react-navigation';

export default class HeaderLeft extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Icon
          name="ios-menu"
          type="ionicon"
          size={32}
          onPress={() => this.props.navigation.openDrawer()}
          underlayColor="transparent"
          hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
          color="white"
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  }
});
