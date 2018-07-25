/**
 * Created by usamaahmed on 9/27/17.
 */
import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, StatusBar} from 'react-native';
import {Text, Button} from 'react-native-elements';
import I18n from './../I18n';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeLang} from '../redux/actions';
import {colors, width, height, images} from './../constants';
import FastImage from 'react-native-fast-image';

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  changeLang() {
    newLang = this.props.lang === 'ar' ? 'en' : 'ar';
    this.props.actions.changeLang(newLang);
  }

  render() {
    const {token, guest, navigation} = this.props;
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{alignItems: 'center'}}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.main} />
        <FastImage
          source={images.logo}
          style={{width: 100, height: 120, margin: 12}}
        />
        <Text
          style={{
            color: 'black',
            fontFamily: 'cairo',
            fontSize: 25,
            textAlign: 'center'
          }}>
          {I18n.t('menu')}
        </Text>
        <View style={{marginBottom: 20, width: '100%'}}>
          <Button
            buttonStyle={styles.menuBtn}
            fontFamily="cairo"
            color="black"
            titleStyle={styles.titleStyle}
            onPress={() => navigation.navigate('Home')}
            title={I18n.t('homepage')}
          />

          {guest ? (
            <View>
              <Button
                buttonStyle={styles.menuBtn}
                fontFamily="cairo"
                color="black"
                titleStyle={styles.titleStyle}
                onPress={() => navigation.navigate('Login')}
                title={I18n.t('login')}
              />
              <Button
                buttonStyle={styles.menuBtn}
                fontFamily="cairo"
                color="black"
                titleStyle={styles.titleStyle}
                onPress={() => navigation.navigate('Register')}
                title={I18n.t('register')}
              />
              <Button
                buttonStyle={styles.menuBtn}
                fontFamily="cairo"
                color="black"
                titleStyle={styles.titleStyle}
                onPress={() => navigation.navigate('Contactus')}
                title={I18n.t('contactus')}
              />
            </View>
          ) : null}
          {token ? (
            <View>
              <Button
                buttonStyle={styles.menuBtn}
                fontFamily="cairo"
                color="black"
                titleStyle={styles.titleStyle}
                onPress={() => {
                  this.props.actions.logout();
                }}
                title={I18n.t('logout')}
              />
            </View>
          ) : null}
          <Button
            buttonStyle={styles.menuBtn}
            fontFamily="Cairo"
            color="black"
            titleStyle={styles.titleStyle}
            onPress={() => this.changeLang()}
            title={I18n.t('lang')}
          />
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
      changeLang: bindActionCreators(changeLang, dispatch)
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
    fontFamily: 'cairo'
  },
  menuBtn: {
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  }
});
