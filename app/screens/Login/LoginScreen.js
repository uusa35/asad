import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {submitLogin} from '../../redux/actions';
import FastImage from 'react-native-fast-image';
import {Input, Button, Icon} from 'react-native-elements';
import I18n from '../../I18n';
import {colors, height, width, images} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
  }

  render() {
    const {navigation} = this.props;
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
            <FastImage
              style={styles.logo}
              source={images.logo}
              resizeMode={FastImage.resizeMode.center}
            />
            <View style={styles.formWrapper}>
              <Input
                onChangeText={e => this.setState({email: e})}
                placeholder={I18n.t('email').toUpperCase()}
                inputContainerStyle={styles.inputContainerStyle}
                leftIconContainerStyle={styles.leftIconStyle}
                leftIcon={
                  <Icon
                    name="ios-mail"
                    type="ionicon"
                    size={24}
                    color="black"
                  />
                }
              />
              <Input
                onChangeText={e => this.setState({name: e})}
                placeholder={I18n.t('password').toUpperCase()}
                inputContainerStyle={styles.inputContainerStyle}
                leftIconContainerStyle={styles.leftIconStyle}
                leftIcon={
                  <Icon
                    name="key"
                    type="font-awesome"
                    size={24}
                    color="black"
                  />
                }
              />
              <Button
                buttonStyle={[
                  styles.registerSubmitBtn,
                  {backgroundColor: 'transparent', height: 40}
                ]}
                fontFamily="Cairo"
                color="black"
                titleStyle={[
                  styles.registerSubmitBtnText,
                  {color: 'white', fontSize: 15}
                ]}
                onPress={() => navigation.navigate('ForgetPassword')}
                title={I18n.t('forget_your_password')}
              />
              <Button
                buttonStyle={styles.registerSubmitBtn}
                fontFamily="Cairo"
                color="black"
                titleStyle={styles.registerSubmitBtnText}
                onPress={() => this._doRegisterRequest()}
                title={I18n.t('submit').toUpperCase()}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
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
    height: 250,
    margin: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 0
  },
  logo: {
    width: 100,
    height: 120,
    borderWidth: 1,
    borderColor: 'blue'
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
    minHeight: 50
  }
});
