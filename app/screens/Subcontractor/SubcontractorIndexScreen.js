import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import PaymentPanelElement from './../../components/Project/PaymentPanelElement';
import SubContractorPanelElement from '../../components/Project/SubContractorPanelElement';
import validate from 'validate.js';
import NotAvailableElement from '../../components/NotAvailableElement';

export default class SubcontractorIndexScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {project: {}, navigation: {}, moduleName: ''};
  }

  static getDerivedStateFromProps(nextProps) {
    const {navigation} = nextProps;
    return {
      project: navigation.state.params.project,
      moduleName: navigation.state.params.moduleName,
      navigation
    };
  }
  render() {
    const {navigation, project, moduleName} = this.state;
    return (
      <ScrollView
        style={{backgroundColor: 'white'}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30, backgroundColor: 'white'}}
        endFillColor="white"
        showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          {validate.isEmpty(project.subcontractors) ? (
            <NotAvailableElement moduleName={moduleName} />
          ) : (
            <View>
              {project.subcontractors.map(d => {
                return (
                  <SubContractorPanelElement
                    key={d.id}
                    element={d}
                    navigation={navigation}
                  />
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}

SubcontractorIndexScreen.propTypes = {
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