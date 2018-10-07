import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import DocumentPanelElement from './../../components/Project/DocumentPanelElement';

export default class DocumentIndexScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {documents: {}, navigation: {}};
  }

  static getDerivedStateFromProps(nextProps) {
    const {navigation} = nextProps;
    return {
      documents: navigation.state.params.category.documents,
      navigation
    };
  }

  render() {
    const {navigation, documents} = this.state;
    return (
      <ScrollView
        style={{backgroundColor: 'white'}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30, backgroundColor: 'white'}}
        endFillColor="white"
        showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          {documents.map(d => {
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
