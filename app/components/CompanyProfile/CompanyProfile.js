import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {height} from './../../constants';
import PropTypes from 'prop-types';
import I18n from './../../I18n';
import CompanyProfileHeaderWidget from './CompanyProfileHeaderWidget';
import PanelWidget from './../PanelWidget';
import ContactDetailsWidget from './ContactDetailsWidget';
import LocationWidget from './LocationWidget';

export default class CompanyProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {settings} = this.props;
    return (
      <ScrollView
        style={{backgroundColor: 'white'}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30, backgroundColor: 'white'}}
        endFillColor="white"
        showsVerticalScrollIndicator={false}>
        <View style={styles.scrollViewContainer}>
          <View>
            <CompanyProfileHeaderWidget settings={settings} />
            <PanelWidget
              title={I18n.t('about') + ' ' + settings.name}
              content={settings.description}
            />
            <ContactDetailsWidget settings={settings} />
            <LocationWidget settings={settings} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

CompanyProfile.propTypes = {
  settings: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: 'white',
    minHeight: height
  }
});
