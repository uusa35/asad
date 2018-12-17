import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import PaymentPanelElement from './../../components/Project/PaymentPanelElement';
import validate from 'validate.js';
import NotAvailablElement from '../../components/NotAvailableElement';

export default class PaymentIndexScreen extends Component {
  constructor(props) {
    super(props);
  }

  handleNav = (routeName, element) =>
    this.props.navigation.navigate(routeName, element);

  _renderItem = d =>
    d.visible ? (
      <PaymentPanelElement
        key={d.id}
        element={d}
        handleNav={this.handleNav}
        iconName="payments"
        routeName="AppPDFViewer"
      />
    ) : null;

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
          {validate.isEmpty(project.payments) ? (
            <NotAvailablElement routeName="payments" />
          ) : (
            project.payments.map(this._renderItem)
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
