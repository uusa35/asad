import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import GalleryIndexScreen from './GalleryIndexScreen';
import FastImage from 'react-native-fast-image';
import I18n from './../../I18n';
import validate from 'validate.js';

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
        contentContainerStyle={{paddingBottom: 30, backgroundColor: 'white'}}
        endFillColor="white"
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5
          }}>
          {element.images.map(img => {
            return (
              <View>
                <TouchableOpacity
                  key={img.id * Math.random()}
                  onPress={() =>
                    navigation.navigate('ImageShow', {
                      name: !validate.isEmpty(img.name)
                        ? img.name
                        : I18n.t('image'),
                      img
                    })
                  }
                  style={{
                    width: 125,
                    height: 125,
                    borderWidth: 1,
                    borderColor: 'blue'
                  }}>
                  <FastImage
                    key={img.id * Math.random()}
                    style={styles.imageElement}
                    source={{uri: img.thumbnail}}
                  />
                </TouchableOpacity>
              </View>
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
  imageElement: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: 'lightgrey'
  }
});
