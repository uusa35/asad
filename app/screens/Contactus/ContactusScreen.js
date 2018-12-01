import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CompanyProfile from './../../components/CompanyProfile/CompanyProfile';

class ContactusScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {settings, navigation} = this.props;
    return <CompanyProfile settings={settings} navigation={navigation} />;
  }
}

ContactusScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(ContactusScreen);
