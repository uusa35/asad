import React, {Component} from 'react';
import {View} from 'react-native';
import ImageBrowser from 'react-native-interactive-image-gallery';
import I18n from './../../I18n';
import NotAvailableElement from './../../components/NotAvailableElement';
import validate from 'validate.js';

export default class GalleryShowScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {element: {}, navigation: {}};
  }

  static getDerivedStateFromProps(nextProps) {
    const {navigation} = nextProps;
    return {
      element: navigation.state.params.element,
      navigation
    };
  }

  render() {
    const {images} = this.state.element;
    const imageURLs: Array<Object> = images.map(
      (img: Object, index: number) => ({
        URI: img.URI,
        thumbnail: img.thumbnail,
        id: String(index),
        title: img.name,
        description: img.caption
      })
    );
    return <ImageBrowser images={imageURLs} closeText={I18n.t('close')} />;
  }
}
