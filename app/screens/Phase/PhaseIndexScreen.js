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

  render() {
    const {navigation} = this.props;
    const {project} = navigation.state.params;
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
            project.phases.map(d => (
              <PdfBtnElement
                key={d.id}
                element={d}
                navigation={navigation}
                routeName="TaskShow"
                iconName="phases"
              />
            ))
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
