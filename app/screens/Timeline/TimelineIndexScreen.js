import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import DocumentPanelElement from '../../components/Project/DocumentPanelElement';

export default class TimelineIndexScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {project: {}, navigation: {}};
  }

  static getDerivedStateFromProps(nextProps) {
    const {navigation} = nextProps;
    return {
      project: navigation.state.params.project,
      navigation
    };
  }

  render() {
    const {navigation, project} = this.state;
    return (
      <ScrollView
        style={{backgroundColor: 'white'}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30, backgroundColor: 'white'}}
        endFillColor="white"
        showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          {project.timelines.map(d => {
            return (
              <DocumentPanelElement
                key={d.id}
                element={d}
                navigation={navigation}
                iconName="documents"
                routeName="AppPDFViewer"
              />
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

TimelineIndexScreen.propTypes = {
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
