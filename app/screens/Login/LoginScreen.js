import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {submitLogin, enableErrorMessage} from '../../redux/actions';
import FastImage from 'react-native-fast-image';
import {Input, Button, Text} from 'react-native-elements';
import I18n, {isRTL} from '../../I18n';
import {colors, height, width, images, icons} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import validate from 'validate.js/validate';
import {loginConstrains} from '../../constrains';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', device_id: '', player_id: ''};
  }

  componentDidMount() {
    const {deviceId, playerId} = this.props;
    this.setState({device_id: deviceId, player_id: playerId});
  }
  _doSubmitLogin() {
    const {email, password} = this.state;
    const result = validate({email, password}, loginConstrains);
    if (!validate.isEmpty(result)) {
      this.props.actions.enableErrorMessage(
        JSON.stringify(result[Object.keys(result)[0]])
      );
    } else {
      return this.props.actions.submitLogin(this.state);
    }
  }
  render() {
    const {navigation, settings} = this.props;
    return (
      <KeyboardAwareScrollView
        style={{backgroundColor: colors.main}}
        automaticallyAdjustContentInsets={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <FastImage
            style={styles.imgBg}
            source={images.bg}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.wrapper}>
            <FastImage style={styles.logo} source={{uri: settings.logo}} />
            <View style={styles.formWrapper}>
              <Input
                onChangeText={e => this.setState({email: e})}
                placeholder={I18n.t('email').toUpperCase()}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputTextStyle}
                leftIconContainerStyle={styles.leftIconStyle}
                keyboardType="email-address"
                leftIcon={
                  <FastImage
                    source={icons.user}
                    style={[styles.iconTabBar]}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                }
              />
              <Input
                onChangeText={e => this.setState({password: e})}
                placeholder={I18n.t('password').toUpperCase()}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputTextStyle}
                leftIconContainerStyle={styles.leftIconStyle}
                keyboardType="email-address"
                secureTextEntry={true}
                leftIcon={
                  <FastImage
                    source={icons.password}
                    style={[styles.iconTabBar]}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                }
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgetPassword')}
                style={[
                  styles.registerSubmitBtn,
                  {backgroundColor: 'transparent', height: 40}
                ]}>
                <Text
                  style={[
                    styles.registerSubmitBtnText,
                    {color: 'white', fontSize: 15}
                  ]}>
                  {I18n.t('forget_your_password')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this._doSubmitLogin()}
                style={styles.registerSubmitBtn}>
                <Text style={styles.registerSubmitBtnText}>
                  {I18n.t('login').toUpperCase()}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Register', {type: 'supplier'})
                }
                style={styles.registerSubmitBtn}>
                <Text style={styles.registerSubmitBtnText}>
                  {I18n.t('register_as_supplier').toUpperCase()}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  auth: PropTypes.object
};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      enableErrorMessage: bindActionCreators(enableErrorMessage, dispatch),
      submitLogin: bindActionCreators(submitLogin, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    height: height,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapper: {
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  formWrapper: {
    width: width,
    height: 350,
    margin: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 0
  },
  logo: {
    width: 100,
    height: 120
  },
  imgBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    width: width,
    height: height + 200
  },
  mainTitle: {
    textAlign: 'center',
    fontFamily: 'cairo',
    fontSize: 32,
    color: colors.main,
    fontWeight: 'bold',
    padding: 10
  },
  registerSubmitBtn: {
    width: width - 30,
    borderRadius: 0,
    height: 50,
    margin: 5,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: colors.main,
    justifyContent: 'center',
    alignItems: 'center'
  },
  registerSubmitBtnText: {
    fontFamily: 'cairo',
    fontSize: 20,
    color: 'black'
  },
  leftIconStyle: {
    backgroundColor: colors.main,
    width: 60,
    position: 'relative',
    left: -20,
    height: 50
  },
  inputContainerStyle: {
    backgroundColor: 'white',
    minHeight: 50,
    marginTop: 8,
    marginBottom: 8
  },
  inputTextStyle: {
    fontFamily: 'cairo',
    fontSize: 15,
    textAlign: isRTL ? 'right' : 'left'
  },
  iconTabBar: {
    width: 20,
    height: 20
  }
});
