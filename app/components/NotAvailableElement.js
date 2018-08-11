import React, {Component} from 'react';
import {View} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import I18n from '../I18n';
import PropTypes from 'prop-types';

export default class NotAvailableElement extends Component {
  constructor(props) {
    super(props);
    this.state = {moduleName: ''};
  }

  static getDerivedStateFromProps(nextProps) {
    const {moduleName} = nextProps;
    return {
      moduleName
    };
  }

  render() {
    const {moduleName} = this.state;
    return (
      <View style={{margin: 10}}>
        <Button
          buttonStyle={{
            backgroundColor: 'red',
            width: 300,
            height: 45,
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 5
          }}
          titleStyle={{fontFamily: 'cairo', fontWeight: '700'}}
          icon={
            <Icon name="ios-alert" type="ionicon" size={25} color="white" />
          }
          title={
            I18n.t('not_available') + ' ' + I18n.t(moduleName.toLowerCase())
          }
        />
      </View>
    );
  }
}

NotAvailableElement.propTypes = {
  moduleName: PropTypes.string.isRequired
};
