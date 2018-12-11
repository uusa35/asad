import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import GalleryIndexScreen from './GalleryIndexScreen';
import FastImage from 'react-native-fast-image';
import I18n from './../../I18n';
import validate from 'validate.js';
import {width} from './../../constants';

export default class GalleryShowScreen extends Component {
  _renderItem = img => {
    const {element} = this.props.navigation.state.params;
    return (
      <TouchableOpacity
        key={img.id * Math.random()}
        onPress={() =>
          this.props.navigation.navigate('ImageShow', {
            name: !validate.isEmpty(img.name) ? img.name : I18n.t('image'),
            img,
            index: img.id,
            images: element.images
          })
        }>
        <FastImage
          key={img.id}
          style={styles.imageElement}
          source={{uri: img.thumbnail}}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };
  render() {
    const {navigation} = this.props;
    const {element} = navigation.state.params;
    return (
      <ScrollView
        style={{backgroundColor: 'white'}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        endFillColor="white"
        showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          {element.images.map(this._renderItem)}
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
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: '3%'
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10
  },
  imageElement: {
    margin: 3,
    width: width / 3.5,
    height: width / 3.5,
    borderWidth: 0.5,
    borderColor: 'lightgrey'
  }
});
