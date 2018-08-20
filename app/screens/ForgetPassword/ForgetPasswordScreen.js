import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {submitForgetPassword, enableErrorMessage} from '../../redux/actions';
import FastImage from 'react-native-fast-image';
import {Input, Button, Icon} from 'react-native-elements';
import I18n, {isRTL} from '../../I18n';
import {colors, height, width, images, icons} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import validate from 'validate.js/validate';
import {forgetPasswordConstrains} from '../../constrains';

class ForgetPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', mobile: ''};
  }

  _doForgetPassword = () => {
    const {email, mobile} = this.state;
    const result = validate({email, mobile}, forgetPasswordConstrains);
    if (!validate.isEmpty(result)) {
      this.props.actions.enableErrorMessage(
        JSON.stringify(result[Object.keys(result)[0]])
      );
    } else {
      return this.props.actions.submitForgetPassword(this.state);
    }
  };
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
                inputStyle={styles.inputTextStyle}
                leftIconContainerStyle={styles.leftIconStyle}
                leftIcon={
                  <FastImage source={icons.user} style={[styles.iconTabBar]} />
                }
              />
              <Input
                keyboardType="phone-pad"
                onChangeText={e => this.setState({mobile: e})}
                placeholder={I18n.t('mobile').toUpperCase()}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputTextStyle}
                leftIconContainerStyle={styles.leftIconStyle}
                leftIcon={
                  <Icon
                    name="phone"
                    type="font-awesome"
                    size={24}
                    color="black"
                  />
                }
              />
              <Button
                buttonStyle={styles.registerSubmitBtn}
                titleStyle={styles.registerSubmitBtnText}
                onPress={() => this._doForgetPassword()}
                title={I18n.t('submit').toUpperCase()}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

ForgetPasswordScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      submitForgetPassword: bindActionCreators(submitForgetPassword, dispatch),
      enableErrorMessage: bindActionCreators(enableErrorMessage, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgetPasswordScreen);

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
    justifyContent: 'center',
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
