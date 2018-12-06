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

  handleNav = (routeName, element) =>
    this.props.navigation.navigate(routeName, element);

  _renderItem = item => {
    return (
      <PdfBtnElement
        key={item.id}
        element={item}
        handleNav={this.handleNav}
        iconName="drawings"
        routeName="AppPDFViewer"
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
          {validate.isEmpty(project.drawings) ? (
            <NotAvailablElement routeName="drawings" />
          ) : (
            project.drawings.map(this._renderItem)
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
