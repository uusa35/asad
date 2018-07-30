import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class ProjectShowScreen extends Component {
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
