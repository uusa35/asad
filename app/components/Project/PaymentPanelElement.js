import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Divider} from 'react-native-elements';
import {width, height, text, colors} from './../../constants';
import I18n from './../../I18n';
import Communications from 'react-native-communications';

export default class PaymentPanelElement extends Component {
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
    const {element} = this.state;
    return (
      <View style={styles.panelWrapper}>
        <Divider />
        <View style={styles.panelTitleWrapper}>
          <Text style={styles.panelBtnText}>{element.name}</Text>
        </View>
        <Divider />
        <View style={styles.panelDescriptionWrapper}>
          <Text style={styles.panelBtnText}>{element.description}</Text>
        </View>
        <Divider />
        <View style={styles.fileTypeView}>
          <Text style={styles.fileTypeText}>{I18n.t('due_date')} : </Text>
          <Text style={styles.fileTypeText}>{element.due_date}</Text>
        </View>
        <View style={styles.fileTypeView}>
          <Text style={styles.fileTypeText}>{I18n.t('date_received')} : </Text>
          <Text style={styles.fileTypeText}>{element.date_received}</Text>
        </View>
      </View>
    );
  }
}

PaymentPanelElement.propTypes = {
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
    textAlign: 'left',
    fontFamily: text.font,
    padding: 5
  },
  panelDescriptionWrapper: {
    width: '100%',
    fontFamily: text.font,
    padding: 5,
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: 'left'
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
    fontWeight: 'bold',
    textAlign: 'left'
  },
  fileTypeView: {
    flexDirection: 'row',
    padding: 10
  },
  panelBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  fileTypeText: {
    width: 100,
    fontFamily: text.font,
    fontSize: text.small,
    textAlign: 'left'
  }
});
