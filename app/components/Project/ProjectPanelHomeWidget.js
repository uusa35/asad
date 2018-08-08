import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Communications from 'react-native-communications';
import FastImage from 'react-native-fast-image';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
import MainBtnElement from '../MainBtnElement';

export default class ProjectPanelHomeWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', description: '', image: ''};
  }

  static getDerivedStateFromProps(nextProps, prevProps) {
    const {name, description, image} = nextProps;
    return {
      name,
      description,
      image
    };
  }

  render() {
    const {name, description, image} = this.state;
    return (
      <View style={styles.headerContainer}>
        <FastImage
          style={styles.logo}
          source={{uri: image}}
          resizeMode={FastImage.resizeMode.center}
        />
        <View style={styles.headerWrapper}>
          <View style={styles.headerTitleWrapper}>
            <Text style={styles.mainTitle}>{name}</Text>
          </View>
          <View style={styles.descriptionWrapper}>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
      </View>
    );
  }
}

ProjectPanelHomeWidget.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  headerContainer: {
    margin: 10,
    flexDirection: 'row'
  },
  headerWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 5,
    marginTop: 0
  },
  headerTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#474747',
    width: '100%'
  },
  descriptionWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    paddingRight: 5,
    paddingLeft: 5,
    paddingTop: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 2,
    shadowOpacity: 0.2
  },
  mainTitle: {
    textAlign: 'left',
    fontFamily: 'cairo',
    fontSize: 16,
    padding: 2,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: 'white'
  },
  description: {
    fontSize: 13,
    padding: 1,
    paddingBottom: 10
  },
  logo: {
    width: 80,
    height: 100,
    borderWidth: 1,
    borderColor: 'lightgrey'
  }
});
