import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {toggleLoading} from '../../redux/actions';
import {bindActionCreators} from 'redux';
import validate from 'validate.js';
import CompanyProfile from './../../components/CompanyProfile/CompanyProfile';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {navigation, auth, settings} = this.props;
    return (
      <View>
        {validate.isEmpty(auth) ? (
          <CompanyProfile settings={settings} />
        ) : (
          <Text>User is Loggged in</Text>
        )}
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
