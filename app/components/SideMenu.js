/**
 * Created by usamaahmed on 9/27/17.
 */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import {Text, Button, Icon} from 'react-native-elements';
import I18n from './../I18n';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeLang, logout} from '../redux/actions';
import {colors, images} from './../constants';
import FastImage from 'react-native-fast-image';
import validate from 'validate.js';
import {isRTL} from '../I18n';

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  changeLang() {
    let newLang = this.props.lang === 'ar' ? 'en' : 'ar';
    this.props.actions.changeLang(newLang);
  }

  render() {
    const {token, guest, navigation, galleries, auth} = this.props;
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{alignItems: 'center'}}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.main} />
        <FastImage source={images.logo} style={styles.logo} />
        <Text style={styles.mainMenuText}>{I18n.t('menu')}</Text>
        <View style={{marginBottom: 20, width: '100%'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={styles.menuBtn}>
            <Icon name="home" type="octicon" size={20} />
            <Text style={styles.titleStyle}>{I18n.t('homepage')}</Text>
          </TouchableOpacity>
          {guest ? (
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.menuBtn}>
                <Icon name="key" type="octicon" size={20} />
                <Text style={styles.titleStyle}>{I18n.t('login')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Register', {type: 'supplier'})
                }
                style={styles.menuBtn}>
                <Icon name="sign-in" type="octicon" size={20} />
                <Text style={styles.titleStyle}>
                  {I18n.t('register_as_supplier')}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
          {token ? (
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Notifications');
                }}
                style={styles.menuBtn}>
                <Icon name="bell" type="octicon" size={20} />
                <Text style={styles.titleStyle}>{I18n.t('notifications')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.actions.logout();
                }}
                style={styles.menuBtn}>
                <Icon name="sign-out" type="octicon" size={20} />
                <Text style={styles.titleStyle}>{I18n.t('logout')}</Text>
              </TouchableOpacity>
            </View>
          ) : null}
          {!validate.isEmpty(galleries) ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Galleries', {
                  project: {galleries},
                  moduleName: I18n.t('galleries')
                })
              }
              style={styles.menuBtn}>
              <Icon name="device-camera" type="octicon" size={20} />
              <Text style={styles.titleStyle}>{I18n.t('galleries')}</Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            onPress={() => navigation.navigate('Contactus')}
            style={styles.menuBtn}>
            <Icon name="device-mobile" type="octicon" size={20} />
            <Text style={styles.titleStyle}>{I18n.t('contactus')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.changeLang()}
            style={styles.menuBtn}>
            <Icon name="globe" type="octicon" size={20} />
            <Text style={styles.titleStyle}>{I18n.t('lang')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      changeLang: bindActionCreators(changeLang, dispatch),
      logout: bindActionCreators(logout, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: 'white'
  },
  titleStyle: {
    color: 'black',
    fontFamily: 'cairo',
    fontSize: 16,
    textAlign: 'left',
    paddingLeft: 15
  },
  logo: {
    width: 100,
    height: 120,
    margin: 12
  },
  menuBtn: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    padding: 12,
    borderBottomColor: 'lightgrey'
  },
  mainMenuText: {
    color: 'black',
    fontFamily: 'cairo',
    fontSize: 25,
    textAlign: 'center'
  }
});
