import React, {Component} from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import ProjectPanelWidget from '../../components/Project/ProjectPanelWidget';
import {map} from 'lodash';

export default class ProjectIndexScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {projects} = this.props;
    console.log('projects from ProjectIndex', projects);
    return (
      <View>
        {map(projects, p => {
          console.log('the p', p);
          return <ProjectPanelWidget project={p} key={p.id} />;
        })}
      </View>
    );
  }
}

ProjectIndexScreen.propTypes = {
  auth: PropTypes.object.isRequired
};
