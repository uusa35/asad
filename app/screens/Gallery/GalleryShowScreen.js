import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import GalleryIndexScreen from './GalleryIndexScreen';
import FastImage from 'react-native-fast-image';
import I18n from './../../I18n';
import validate from 'validate.js';
import {width} from './../../constants';

export default class GalleryShowScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {element: {}, navigation: {}, imageURLs: []};
  }

  static getDerivedStateFromProps(nextProps) {
    const {navigation} = nextProps;
    return {
      element: navigation.state.params.element,
      navigation
    };
  }

  render() {
    const {element, navigation} = this.state;
    return (
      <ScrollView
        style={{backgroundColor: 'white'}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        endFillColor="white"
        showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          {element.images.map(img => {
            return (
              <TouchableOpacity
                key={img.id * Math.random()}
                onPress={() =>
                  navigation.navigate('ImageShow', {
                    name: !validate.isEmpty(img.name)
                      ? img.name
                      : I18n.t('image'),
                    img
                  })
                }>
                <FastImage
                  key={img.id}
                  style={styles.imageElement}
                  source={{uri: img.thumbnail}}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

GalleryIndexScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
    width: width - 50,
    paddingTop: 15
  },
  imageElement: {
    width: 110,
    height: 110,
    borderWidth: 0.5,
    margin: 5,
    borderColor: 'lightgrey'
  }
});
