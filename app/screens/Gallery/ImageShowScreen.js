import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {width, height} from './../../constants';
import ImageZoom from 'react-native-image-pan-zoom';
import {createImageProgress} from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
//import ProgressBar from 'react-native-progress/Bar';
import Swiper from 'react-native-swiper';

const Image = createImageProgress(FastImage);
export default class ImageShowScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {images, index } = this.props.navigation.state.params;
    console.log('index',index);
    return (
      <Swiper showsButtons={false} index={index}>
        {images.map((img, i) => {
          return (
            <View style={styles.slide1} key={img.id}>
              <ImageZoom
                cropWidth={width}
                cropHeight={height}
                imageWidth={width}
                imageHeight={height}>
                <Image
                  key={img.id}
                  source={{
                    uri: `${img.large}`
                  }}
                  style={{width: width, height: height}}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </ImageZoom>
            </View>
          );
        })}
      </Swiper>
    );
  }
}

ImageShowScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  imageElement: {
    width: width,
    height: height,
    backgroundColor: 'black'
  },
  wrapper: {
    flex: 1
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
    backgroundColor: 'black'
  }
});
