import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import DocumentPanelElement from './../../components/Project/DocumentPanelElement';
import validate from 'validate.js';
import NotAvailablElement from '../../components/NotAvailableElement';

export default class DocumentIndexScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {navigation} = this.props;
    const {documents} = navigation.state.params.category;
    return (
      <ScrollView
        style={{backgroundColor: 'white'}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30, backgroundColor: 'white'}}
        endFillColor="white"
        showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          {validate.isEmpty(documents) ? (
            <NotAvailablElement routeName="documents" />
          ) : (
            documents.map(d => {
              return (
                <DocumentPanelElement
                  key={d.id}
                  element={d}
                  navigation={navigation}
                  iconName="documents"
                  routeName="AppPDFViewer"
                />
              );
            })
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});

DocumentIndexScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};
