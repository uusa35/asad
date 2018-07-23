import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {enableMessage, submitRegistrationRequest} from '../../redux/actions';
import FastImage from 'react-native-fast-image';
import {FormInput, Icon} from 'react-native-elements';
import I18n from './../../I18n';
import {userRegisterRequestConstraints} from '../../constrains';
import {height, width, colors, images} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', email: '', mobile: '', address: '', logo: ''};
  }

  _doRegisterationRequest = () => {
    const {name, email, mobile, logo, address} = this.state;
    const result = validate(
      {name, email, mobile, logo, address},
      userRegisterRequestConstraints
    );
    if (!validate.isEmpty(result)) {
      this.props.actions.enable(
        'error',
        JSON.stringify(result[Object.keys(result)[0]])
      );
    } else {
      return this.props.actions.submitRegistrationRequest(
        mutate,
        auth,
        this.state
      );
    }
  };

  _handleData(element, value) {
    const input = {};
    input[element] = value;
    this.setState(input);
  }

  render() {
    const {roles, navigation} = this.props;
    return (
      <KeyboardAwareScrollView
        style={{backgroundColor: 'white'}}
        automaticallyAdjustContentInsets={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          <FastImage
            style={styles.imgBg}
            source={images.bg}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableHighlight
              onPress={() => this._doRegister}
              style={styles.registerSubmitBtn}>
              <Text style={styles.registerSubmitBtnText}>
                {I18n.t('register')}
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

RegisterScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      enableMessage: bindActionCreators(enableMessage, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreen);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  imgBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    height: height,
    width: width
  },
  registerSubmitBtn: {
    width: width - 50,
    height: 65,
    backgroundColor: colors.main,
    justifyContent: 'center',
    alignItems: 'center'
  },
  registerSubmitBtnText: {
    fontFamily: 'cairo',
    fontSize: 20,
    color: 'black'
  }
});
