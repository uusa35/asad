import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import TimeLine from 'react-native-timeline-theme';
import {width} from './../../constants';

export default class TaskShowScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {element: {}, navigation: {}};
  }

  static getDerivedStateFromProps(nextProps) {
    const {navigation} = nextProps;
    return {
      element: navigation.state.params.element,
      navigation
    };
  }

  render() {
    const {element} = this.state;
    return (
      <ScrollView
        style={{backgroundColor: 'white'}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30, backgroundColor: 'white'}}
        endFillColor="white"
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <TimeLine
            style={{width: width - 20, padding: 10, margin: 5}}
            data={element.tasks}
            isRenderSeperator={true}
            innerCircleType="dot"
            columnFormat={'two-column'}
            dotSize={12}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
