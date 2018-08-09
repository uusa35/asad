import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Timeline from 'react-native-timeline-listview';

export default class TaskShowScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>TaskShowScreen</Text>
        <Timeline data={this.data} />
      </View>
    );
  }
}
