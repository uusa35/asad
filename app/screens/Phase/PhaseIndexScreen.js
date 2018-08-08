import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import Timeline from 'react-native-timeline-listview';
import PdfBtnElement from '../../components/Project/PdfBtnElement';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

export default class PhaseIndexScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {project: {}, navigation: {}};
  }

  static getDerivedStateFromProps(nextProps, prevProps) {
    const {navigation} = nextProps;
    return {
      project: navigation.state.params.project,
      navigation
    };
  }

  render() {
    const {project} = this.state;
    return (
      <ScrollView
        style={{backgroundColor: 'white'}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30, backgroundColor: 'white'}}
        endFillColor="white"
        showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          {project.phases.map(d => {
            return (
              <PdfBtnElement
                key={d.id}
                element={d}
                navigation={navigation}
                iconName="phases"
              />
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

PhaseIndexScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});
