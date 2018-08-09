import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Divider} from 'react-native-elements';
import {width, height, text, colors} from './../../constants';
import I18n from './../../I18n';
import Communications from 'react-native-communications';

export default class PanelBtnElement extends Component {
  constructor(props) {
    super(props);
    this.state = {element: {}, navigation: {}, iconName: ''};
  }

  static getDerivedStateFromProps(nextProps) {
    const {element, navigation, iconName, routeName} = nextProps;
    return {
      element,
      navigation,
      iconName,
      routeName
    };
  }

  render() {
    const {element, navigation} = this.state;
    return (
      <View style={styles.panelWrapper}>
        <Divider />
        <View style={styles.panelTitleWrapper}>
          <Text style={styles.title}>{element.name}</Text>
        </View>
        <Divider />
        <View style={styles.panelDescriptionWrapper}>
          <Text>{element.description}</Text>
        </View>
        <Divider />
        <View style={styles.fileTypeView}>
          <Text style={{width: 100}}>{I18n.t('file_type')} : </Text>
          <Text>
            {element.on_going ? I18n.t('on_going') : I18n.t('out_going')}
          </Text>
        </View>
        <View style={styles.panelBtnWrapper}>
          <TouchableOpacity
            onPress={() => Communications.web(element.path)}
            style={styles.panelBtn}>
            <Text style={styles.panelBtnText}>
              {I18n.t('download').toUpperCase()}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AppPDFViewer', {
                pdfLink: element.path,
                title: element.name
              })
            }
            style={styles.panelBtn}>
            <Text style={styles.panelBtnText}>
              {I18n.t('view').toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

PanelBtnElement.propTypes = {
  navigation: PropTypes.object.isRequired,
  element: PropTypes.object.isRequired,
  iconName: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  panelContainer: {},
  panelWrapper: {
    marginTop: 8,
    marginBottom: 8,
    width: width - 20,
    borderWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: 'white',
    padding: 10,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 2,
    shadowOpacity: 0.2
  },
  panelTitleWrapper: {
    width: '100%',
    padding: 5
  },
  panelDescriptionWrapper: {
    width: '100%',
    padding: 5,
    paddingTop: 15,
    paddingBottom: 15
  },
  panelBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.main,
    height: 40,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 2,
    shadowOpacity: 0.2,
    width: 150
  },
  panelBtnText: {
    fontFamily: text.font,
    fontSize: text.medium,
    fontWeight: 'bold'
  },
  fileTypeView: {
    flexDirection: 'row',
    padding: 10
  },
  panelBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
