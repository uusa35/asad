import React, {Component} from 'react';
import {Text, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {toggleLoading} from '../../redux/actions';
import {bindActionCreators} from 'redux';
import validate from 'validate.js';
import CompanyProfile from './../../components/CompanyProfile/CompanyProfile';
import ProjectIndexScreen from './../Project/ProjectIndexScreen';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {auth, settings} = this.props;
    return (
      <ScrollView
        style={{backgroundColor: 'white'}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30, backgroundColor: 'white'}}
        endFillColor="white"
        showsVerticalScrollIndicator={false}>
        {validate.isEmpty(auth) ? (
          <CompanyProfile settings={settings} />
        ) : (
          <ProjectIndexScreen projects={auth.projects} />
        )}
      </ScrollView>
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
