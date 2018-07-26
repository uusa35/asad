import React, {Component} from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import Communications from 'react-native-communications';
import {colors, height, images, width} from './../../constants';
import {Icon, SocialIcon} from 'react-native-elements';
import CompanyProfileHeaderWidget from './CompanyProfileHeaderWidget';
import I18n from './../../I18n';

export default class CompanyProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {settings} = this.props;
    return (
      <ScrollView style={{backgroundColor: 'white', minHeight: height}}>
        <View>
          <CompanyProfileHeaderWidget settings={settings} />
          <View
            style={{
              margin: 10,
              borderWidth: 1,
              borderColor: 'darkgrey',
              shadowColor: 'black',
              shadowOffset: {width: 1, height: 1},
              shadowRadius: 2,
              shadowOpacity: 0.3
            }}>
            <View style={{backgroundColor: '#474747'}}>
              <Text
                style={{
                  paddingLeft: 15,
                  padding: 5,
                  fontSize: 18,
                  color: 'white',
                  fontFamily: 'cairo'
                }}>
                {I18n.t('about')} {settings.name}
              </Text>
            </View>
            <View style={{padding: 15, backgroundColor: 'white'}}>
              <Text style={{fontFamily: 'cairo', fontSize: 15}}>
                {settings.description}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: height,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapper: {
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});
