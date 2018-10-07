import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import PaymentPanelElement from './../../components/Project/PaymentPanelElement';
import validate from 'validate.js';
import NotAvailablElement from '../../components/NotAvailableElement';

export default class PaymentIndexScreen extends Component {
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
          {validate.isEmpty(project.payments) ? (
            <NotAvailablElement routeName="payments" />
          ) : (
            project.payments.map(d => (
              <PaymentPanelElement
                key={d.id}
                element={d}
                navigation={navigation}
                iconName="payments"
                routeName="AppPDFViewer"
              />
            ))
          )}
        </View>
      </ScrollView>
    );
  }
}

PaymentIndexScreen.propTypes = {
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
