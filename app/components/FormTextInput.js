import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
import {colors, text} from './../constants';
import I18n, {isRTL} from './../I18n';
import validate from 'validate.js';
export default class FormTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {errorMessage: null};
  }

  componentDidMount() {
    const {name, placeholder} = this.props;
    if (!validate.isEmpty(placeholder)) {
      const input = {};
      input[name] = placeholder;
      this.setState(input);
    }
  }

  render() {
    const {
      name,
      secure,
      keyboard,
      placeholder,
      handleData,
      required
    } = this.props;
    const placeholderVal = placeholder ? I18n.t(name + '_message') : '';
    return (
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          flex: 1
        }}>
        <Text
          style={{
            paddingTop: 5,
            fontFamily: 'cairo',
            textAlign: 'left',
            color: 'black',
            padding: 2
          }}>
          {I18n.t(this.props.name)} {required ? '*' : null}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            onChangeText={e => handleData(name, e)}
            style={{
              textAlign: isRTL ? 'right' : 'left',
              color: 'black',
              minHeight: 40,
              flex: 1,
              fontFamily: text.font,
              borderBottomWidth: 1,
              borderBottomColor: 'lightgrey'
            }}
            secureTextEntry={secure ? secure : false}
            placeholder={
              !validate.isBoolean(placeholder) ? placeholder : placeholderVal
            }
            placeholderTextColor="black"
            keyboardType={keyboard ? keyboard : 'default'}
          />
        </View>
      </View>
    );
  }
}

//<FormInput
//    onChangeText={e => handleData(name, e)}
//    placeholder={
//            !_.isNull(placeholder) ? placeholder : I18n.t(name + '_message')
//          }
//    placeholderTextColor="black"
//    keyboardType={keyboard ? keyboard : 'default'}
//    secureTextEntry={secure ? secure : false}
//    inputStyle={{
//            textAlign: 'right',
//            color: 'black',
//            fontFamily: text.font
//          }}
///>
