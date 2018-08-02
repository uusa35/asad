import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {getProject} from '../../redux/actions';
import connect from 'react-redux/es/connect/connect';

class ProjectShowScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {project} = this.props;
    return (
      <View>
        <Text>ProjectShowScreen</Text>
        <Text>{project.name}</Text>
      </View>
    );
  }
}

ProjectShowScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(ProjectShowScreen);

export const styles = StyleSheet.create({});
