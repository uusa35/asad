import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import PdfBtnElement from './../../components/Project/PdfBtnElement';
import validate from 'validate.js';
import NotAvailablElement from '../../components/NotAvailableElement';
import PropTypes from 'prop-types';

export default class DrawingIndexScreen extends Component {
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
          {validate.isEmpty(project.drawings) ? (
            <NotAvailablElement routeName="drawings" />
          ) : (
            project.drawings.map(d => (
              <PdfBtnElement
                key={d.id}
                element={d}
                navigation={navigation}
                iconName="drawings"
                routeName="AppPDFViewer"
              />
            ))
          )}
        </View>
      </ScrollView>
    );
  }
}

DrawingIndexScreen.propTypes = {
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
