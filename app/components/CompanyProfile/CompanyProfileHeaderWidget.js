import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Communications from 'react-native-communications';
import FastImage from 'react-native-fast-image';
import {Icon} from 'react-native-elements';

export default class CompanyProfileHeaderWidget extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {settings} = this.props;
    return (
      <View style={styles.headerContainer}>
        <FastImage
          style={styles.logo}
          source={{uri: settings.logo}}
          resizeMode={FastImage.resizeMode.center}
        />
        <View style={styles.headerWrapper}>
          <View style={styles.headerTitleWrapper}>
            <Text style={styles.mainTitle}>{settings.name}</Text>
            <Icon
              type="font-awesome"
              name="paperclip"
              size={18}
              color="#3259e5"
              iconStyle={{paddingLeft: 10}}
            />
          </View>
          <View style={styles.socialIconsWrapper}>
            <Icon
              reverse
              name="facebook"
              type="font-awesome"
              color="#3b5998"
              size={16}
              onPress={() => Communications.web(settings.facebook_url)}
            />
            <Icon
              reverse
              name="twitter"
              type="font-awesome"
              color="#1da1f2"
              size={16}
              onPress={() => Communications.web(settings.twitter_url)}
            />
            <Icon
              reverse
              name="google-plus"
              type="font-awesome"
              color="#db4437"
              size={16}
              onPress={() => Communications.web(settings.google_url)}
            />
            <Icon
              reverse
              name="linkedin"
              type="font-awesome"
              color="#007bb5"
              size={16}
              onPress={() => Communications.web(settings.linkin_url)}
            />
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10
  },
  mainTitle: {
    textAlign: 'center',
    fontFamily: 'cairo',
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    color: '#3259e5'
  },
  logo: {
    width: 100,
    height: 120,
    borderWidth: 1,
    borderColor: 'lightgrey'
  }
});
