import React, {Component} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import PdfBtnElement from '../../components/Project/PdfBtnElement';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import NotAvailablElement from '../../components/NotAvailableElement';

export default class PhaseIndexScreen extends Component {
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
        routeName="TaskShow"
        iconName="phases"
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
          {validate.isEmpty(project.phases) ? (
            <NotAvailablElement routeName="phases" />
          ) : (
            project.phases.map(this._renderItem)
          )}
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
