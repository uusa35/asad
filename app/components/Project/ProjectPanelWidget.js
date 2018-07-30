import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class ProjectPanelWidget extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {project} = this.props;
    return (
      <View key={project.id}>
        <Text>{project.name}</Text>
      </View>
    );
  }
}
