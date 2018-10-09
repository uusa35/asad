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
      <ScrollView>
        <SafeAreaView
          style={styles.container}
          forceInset={{top: 'always', horizontal: 'never'}}>
          <View
            style={{
              position: 'relative',
              top: -12,
              paddingRight: 10,
              paddingLeft: 10
            }}>
            <Icon
              name="ios-menu"
              type="ionicon"
              size={35}
              onPress={() => this.props.navigation.openDrawer()}
              underlayColor="transparent"
              hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
              color="white"
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
