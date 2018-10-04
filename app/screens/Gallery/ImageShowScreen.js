import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {width, height} from './../../constants';
import ImageZoom from 'react-native-image-pan-zoom';
import {createImageProgress} from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
import ProgressBar from 'react-native-progress/Bar';
const Image = createImageProgress(FastImage);
export default class ImageShowScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {navigation: {}, img: []};
  }

  static getDerivedStateFromProps(nextProps) {
    const {navigation} = nextProps;
    return {
      img: navigation.state.params.img,
      navigation
    };
  }

  render() {
    const {img} = this.state;
    return (
      <ImageZoom
        cropWidth={width}
        cropHeight={height}
        imageWidth={width}
        imageHeight={height}>
        <Image
          key={img.id}
          style={styles.imageElement}
          source={{uri: img.thumbnail}}
          resizeMode={FastImage.resizeMode.center}
          indicator={ProgressBar}
          indicatorProps={{
            size: 80,
            borderWidth: 0,
            color: 'rgba(150, 150, 150, 1)',
            unfilledColor: 'rgba(200, 200, 200, 0.2)'
          }}
        />
      </ImageZoom>
    );
  }
}

ImageShowScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  imageElement: {
    width: width,
    height: height
  }
});
