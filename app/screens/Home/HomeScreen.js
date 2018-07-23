import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {toggleLoading} from '../../redux/actions';
import {bindActionCreators} from 'redux';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {navigation} = this.props;
    console.log('this.props', this.props);
    return (
      <View>
        <Text>Home</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text>Go to Login Scren</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      toggleLoading: bindActionCreators(toggleLoading, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
