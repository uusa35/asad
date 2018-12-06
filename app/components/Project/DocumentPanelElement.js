import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Divider} from 'react-native-elements';
import {width, text, colors} from './../../constants';
import I18n from './../../I18n';

export default class DocumentPanelElement extends Component {
  constructor(props) {
    super(props);
    this.state = {element: {}, navigation: {}, iconName: ''};
  }

  // static getDerivedStateFromProps(nextProps) {
  //   const {element, navigation, iconName, routeName} = nextProps;
  //   return {
  //     element,
  //     navigation,
  //     iconName,
  //     routeName
  //   };
  // }

  // componentWillMount() {
  //   const {iconName, routeName, handleNav } = this.props;
  //   this.setState({iconName, routeName});
  // }

  render() {
    const {element, handleNav} = this.props;
    return (
      <View style={styles.panelWrapper}>
        <View style={styles.panelTitleWrapper}>
          <Text style={styles.panelBtnText}>{element.name}</Text>
        </View>
        <Divider />
        <View style={styles.panelDescriptionWrapper}>
          <Text style={styles.panelBtnText}>{element.description}</Text>
        </View>
        <Divider />
        {element.hasOwnProperty('ongoing') ? (
          <View style={styles.fileTypeView}>
            <Text style={styles.fileTypeText}>{I18n.t('file_type')} : </Text>
            <Text style={styles.fileTypeText}>
              {element.on_going ? I18n.t('on_going') : I18n.t('out_going')}
            </Text>
          </View>
        ) : null}
        {element.hasOwnProperty('category') ? (
          <View style={styles.fileTypeView}>
            <Text style={styles.fileTypeText}>{I18n.t('category')} : </Text>
            <Text style={styles.fileTypeText}>{element.category.name}</Text>
          </View>
        ) : null}
        <View style={styles.panelBtnWrapper}>
          <TouchableOpacity
            onPress={() =>
              handleNav('AppPDFViewer', {
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

DocumentPanelElement.propTypes = {
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
    textAlign: 'left'
  },
  fileTypeView: {
    flexDirection: 'row',
    padding: 15
  },
  panelBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  fileTypeText: {
    width: 100,
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: 'left'
  }
});
