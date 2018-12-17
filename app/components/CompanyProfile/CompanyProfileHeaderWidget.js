import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Communications from 'react-native-communications';
import FastImage from 'react-native-fast-image';
import {Icon} from 'react-native-elements';
import validate from 'validate.js';
import I18n from './../../I18n';

export default class CompanyProfileHeaderWidget extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {settings, navigation} = this.props;
    console.log('settings', settings);
    return (
      <View style={styles.headerContainer}>
        <FastImage style={styles.logo} source={{uri: settings.logo}} />
        <View style={styles.headerWrapper}>
          <TouchableOpacity
            style={styles.headerTitleWrapper}
            onPress={() =>
              navigation.navigate('AppPDFViewer', {pdfLink: settings.path})
            }>
            <Text style={styles.mainTitle}>{I18n.t('company_profile')}</Text>
            <Icon
              type="font-awesome"
              name="paperclip"
              size={18}
              color="#3259e5"
              iconStyle={{paddingLeft: 10}}
            />
          </TouchableOpacity>
          <View style={styles.socialIconsWrapper}>
            {!validate.isEmpty(settings.facebook_url) ? (
              <Icon
                reverse
                name="facebook"
                type="font-awesome"
                color="#3b5998"
                size={16}
                onPress={() => Communications.web(settings.facebook_url)}
              />
            ) : null}
            {!validate.isEmpty(settings.twitter_url) ? (
              <Icon
                reverse
                name="twitter"
                type="font-awesome"
                color="#1da1f2"
                size={16}
                onPress={() => Communications.web(settings.twitter_url)}
              />
            ) : null}
            {!validate.isEmpty(settings.google_url) ? (
              <Icon
                reverse
                name="google-plus"
                type="font-awesome"
                color="#db4437"
                size={16}
                onPress={() => Communications.web(settings.google_url)}
              />
            ) : null}
            {!validate.isEmpty(settings.instagram_url) ? (
              <Icon
                reverse
                name="instagram"
                type="font-awesome"
                color="#007bb5"
                size={16}
                onPress={() => Communications.web(settings.instagram_url)}
              />
            ) : null}
            {!validate.isEmpty(settings.linkin_url) ? (
              <Icon
                reverse
                name="linkedin"
                type="font-awesome"
                color="#007bb5"
                size={16}
                onPress={() => Communications.web(settings.linkin_url)}
              />
            ) : null}
            {!validate.isEmpty(settings.youtube_url) ? (
              <Icon
                reverse
                name="youtube"
                type="font-awesome"
                color="#007bb5"
                size={16}
                onPress={() => Communications.web(settings.youtube_url)}
              />
            ) : null}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    margin: 10,
    flexDirection: 'row'
  },
  headerWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 0
  },
  headerTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    width: '100%'
  },
  socialIconsWrapper: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10
  },
  mainTitle: {
    textAlign: 'center',
    fontFamily: 'cairo',
    fontSize: 16,
    padding: 5,
    color: '#3259e5'
  },
  logo: {
    width: 100,
    height: 120,
    borderWidth: 1,
    borderColor: 'lightgrey'
  }
});
