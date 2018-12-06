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
  }

  handleNav = (routeName, element) =>
    this.props.navigation.navigate(routeName, element);

  _renderItem = d => {
    return (
      <PdfBtnElement
        key={d.id}
        element={d}
        handleNav={this.handleNav}
        iconName="reports"
        routeName="AppPDFViewer"
      />
    );
  };

  render() {
    const {project} = this.props.navigation.state.params;
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
            project.reports.map(this._renderItem)
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
