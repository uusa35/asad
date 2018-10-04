import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors, height, icons, width, isIOS} from '../constants';
import PropTypes from 'prop-types';
import _ from 'lodash';
import validate from 'validate.js';
import I18n from './../I18n';

export default class MainBtnElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      element: {},
      navigation: {},
      title: '',
      routeName: '',
      iconName: ''
    };
  }

  static getDerivedStateFromProps(nextProps) {
    const {navigation, element, title, routeName, iconName} = nextProps;
    return {
      navigation,
      element,
      title,
      routeName,
      iconName
    };
  }

  render() {
    const {navigation, element, title, iconName, routeName, name} = this.state;
    return (
      <View>
        {!validate.isEmpty(element) ? (
          <View key={element.id} style={styles.elementWrapper}>
            <View style={styles.elementSlug} key={element.id * Math.random()}>
              <Text style={styles.elementSlugTitle}>{title}</Text>
            </View>
            <TouchableOpacity
              key={element.id * Math.random()}
              style={styles.elementTypeBtn}
              onPress={() =>
                navigation.navigate(_.upperFirst(routeName), {
                  type: element.name,
                  project: element,
                  name: element.name,
                  routeName,
                  moduleName: routeName
                })
              }>
              <FastImage
                style={styles.elementIcon}
                source={icons[iconName]}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.elementWrapper} key={Math.random()}>
            <View style={styles.elementSlug} key={Math.random()}>
              <Text style={styles.elementSlugTitle}>{title}</Text>
            </View>
            <TouchableOpacity
              key={Math.random()}
              style={styles.elementTypeBtn}
              onPress={() =>
                navigation.navigate(_.upperFirst(routeName), {
                  type: name,
                  name: name,
                  routeName,
                  moduleName: routeName
                })
              }>
              <FastImage
                style={styles.elementIcon}
                source={icons[iconName]}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

MainBtnElement.propTypes = {
  navigation: PropTypes.object.isRequired,
  element: PropTypes.object,
  title: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  mainTitle: {
    textAlign: 'center',
    fontFamily: 'cairo',
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
    padding: 15
  },
  imgBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    height: height,
    width: width
  },
  elementIcon: {
    width: 40,
    height: 40
  },
  elementWrapper: {
    justifyContent: 'flex-start',
    padding: 0,
    alignItems: 'center',
    width: 110,
    flexWrap: 'wrap',
    margin: 5,
    marginBottom: 10,
    marginTop: 10
  },
  elementSlug: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 110,
    height: 30,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 2,
    shadowOpacity: 0.2,
    borderWidth: !isIOS ? 1 : null,
    borderColor: !isIOS ? 'lightgrey' : null
  },
  elementTypeBtn: {
    backgroundColor: colors.main,
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center'
  },
  elementSlugTitle: {
    color: 'black',
    fontFamily: 'cairo',
    fontSize: 12
  }
});
