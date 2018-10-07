import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import PdfBtnElement from './../../components/Project/PdfBtnElement';
import validate from 'validate.js';
import NotAvailablElement from '../../components/NotAvailableElement';

export default class DrawingIndexScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {project: {}, navigation: {}};
  }

  static getDerivedStateFromProps(nextProps, prevProps) {
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

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});
