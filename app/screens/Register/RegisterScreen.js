import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {submitRegisterRequest, enableErrorMessage} from '../../redux/actions';
import FastImage from 'react-native-fast-image';
import {Input, Button, Icon} from 'react-native-elements';
import validate from 'validate.js';
import I18n from './../../I18n';
import {userRegisterRequestConstraints} from '../../constrains';
import {height, width, colors, images, icons} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      mobile: '',
      address: '',
      logo: '',
      device_id: '',
      type: 'from testing'
    };
  }

  fetchImage(element) {
    if (element == 'logo') {
      ImagePicker.openPicker({
        width: 500,
        height: 500,
        cropping: true
      }).then(image => {
        const input = {};
        this.setState({logo: image});
      });
    }
  }

  _doRegisterRequest = () => {
    const {name, description, mobile, logo, address} = this.state;
    const result = validate(
      {name, description, mobile, logo, address},
      userRegisterRequestConstraints
    );
    if (!validate.isEmpty(result)) {
      this.props.actions.enableErrorMessage(
        JSON.stringify(result[Object.keys(result)[0]])
      );
    } else {
      return this.props.actions.submitRegisterRequest(this.state);
    }
  };

  componentDidMount() {
    const {deviceId} = this.props;
    const {type} = this.props.navigation.state.params;
    this.setState({device_id: deviceId, type});
  }

  render() {
    const {roles, navigation, registerRequest} = this.props;
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
          <Text style={styles.mainTitle}>
            {I18n.t('register_request').toUpperCase()}
          </Text>
          <View style={styles.wrapper}>
            {!validate.isEmpty(registerRequest) ? (
              <View style={styles.formWrapper}>
                <Input
                  onChangeText={e => this.setState({name: e})}
                  placeholder={I18n.t('company_name').toUpperCase()}
                  inputContainerStyle={styles.inputContainerStyle}
                  leftIconContainerStyle={styles.leftIconStyle}
                  leftIcon={
                    <FastImage
                      source={icons.company}
                      style={[styles.iconTabBar]}
                    />
                  }
                />
                <Input
                  onChangeText={e => this.setState({description: e})}
                  placeholder={I18n.t('description').toUpperCase()}
                  inputContainerStyle={styles.inputContainerStyle}
                  leftIconContainerStyle={styles.leftIconStyle}
                  leftIcon={
                    <Icon
                      name="ios-paper"
                      type="ionicon"
                      size={24}
                      color="black"
                    />
                  }
                />
                <Input
                  keyboardType="phone-pad"
                  onChangeText={e => this.setState({mobile: e})}
                  placeholder={I18n.t('mobile').toUpperCase()}
                  inputContainerStyle={styles.inputContainerStyle}
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
                <Input
                  onChangeText={e => this.setState({address: e})}
                  placeholder={I18n.t('address').toUpperCase()}
                  inputContainerStyle={styles.inputContainerStyle}
                  leftIconContainerStyle={styles.leftIconStyle}
                  leftIcon={
                    <Icon
                      name="map-marker"
                      type="font-awesome"
                      size={24}
                      color="black"
                    />
                  }
                />
                <Input
                  onFocus={() => this.fetchImage('logo')}
                  // onChangeText={e => this.setState({logo: e})}
                  placeholder={I18n.t('logo').toUpperCase()}
                  inputContainerStyle={styles.inputContainerStyle}
                  leftIconContainerStyle={styles.leftIconStyle}
                  leftIcon={
                    <Icon
                      name="paperclip"
                      type="font-awesome"
                      size={24}
                      color="black"
                      onPress={() => this.fetchImage('logo')}
                    />
                  }
                  rightIcon={
                    <Icon name="add" type="iconic" size={34} color="black" />
                  }
                />
                <Button
                  buttonStyle={styles.registerSubmitBtn}
                  fontFamily="Cairo"
                  color="black"
                  titleStyle={styles.registerSubmitBtnText}
                  onPress={() => this._doRegisterRequest()}
                  title={I18n.t('register_request').toUpperCase()}
                />
              </View>
            ) : (
              <View>
                <Text>{I18n.t('you_already_sent_register_request')}</Text>
              </View>
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

RegisterScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired,
  registerRequest: PropTypes.object.isRequired,
  deviceId: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      submitRegisterRequest: bindActionCreators(
        submitRegisterRequest,
        dispatch
      ),
      enableErrorMessage: bindActionCreators(enableErrorMessage, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreen);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapper: {
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  formWrapper: {
    width: width,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0
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
    padding: 15
  },
  registerSubmitBtn: {
    width: width - 30,
    borderRadius: 0,
    height: 50,
    marginTop: 25,
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
  iconTabBar: {
    width: 25,
    height: 25
  }
});
