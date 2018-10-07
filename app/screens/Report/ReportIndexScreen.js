import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import PdfBtnElement from './../../components/Project/PdfBtnElement';
import validate from 'validate.js';
import NotAvailablElement from '../../components/NotAvailableElement';

export default class ReportIndexScreen extends Component {
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
    const {navigation, project} = this.state;
    return (
      <ScrollView
        style={{backgroundColor: 'white'}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30, backgroundColor: 'white'}}
        endFillColor="white"
        showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          {validate.isEmpty(project.reports) ? (
            <NotAvailablElement routeName="reports" />
          ) : (
            project.reports.map(d => (
              <PdfBtnElement
                key={d.id}
                element={d}
                navigation={navigation}
                iconName="reports"
                routeName="AppPDFViewer"
              />
            ))
          )}
        </View>
      </ScrollView>
    );
  }
}

ReportIndexScreen.propTypes = {
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
