import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors, height, icons, width} from '../constants';
import PropTypes from 'prop-types';
export default class MainBtnElement extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {navigation, element, title, routeName, iconName} = this.props;
    return (
      <View key={element.id} style={styles.elementWrapper}>
        <View style={styles.elementSlug} key={element.id * Math.random()}>
          <Text style={styles.elementSlugTitle}>{title}</Text>
        </View>
        <TouchableOpacity
          key={element.id * Math.random()}
          style={styles.elementTypeBtn}
          onPress={() =>
            navigation.navigate(routeName, {
              type: element.name,
              project: element,
              name: element.name
            })
          }>
          <FastImage
            style={styles.elementIcon}
            source={icons[iconName]}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

MainBtnElement.propTypes = {
  navigation: PropTypes.object.isRequired,
  element: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired
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
    backgroundColor: 'white',
    width: 110,
    height: 30,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 2,
    shadowOpacity: 0.2
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
