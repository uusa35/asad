import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import NotAvailablElement from '../../components/NotAvailableElement';
import FastImage from 'react-native-fast-image';
import {width} from '../../constants';

export default class GalleryIndexScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {project: {}, navigation: {}, moduleName: '', galleries: []};
  }

  static getDerivedStateFromProps(nextProps) {
    const {navigation} = nextProps;
    console.log('the project', navigation.state.params.project);
    console.log('the galleires', navigation.state.params.project.galleries);
    return {
      project: navigation.state.params.project,
      moduleName: navigation.state.params.moduleName,
      galleries: navigation.state.params.project.galleries,
      navigation
    };
  }
  render() {
    const {navigation, moduleName, galleries} = this.state;
    console.log('the galleries from GalleryIndex', galleries);
    return (
      <ScrollView
        style={{backgroundColor: 'white'}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30, backgroundColor: 'white'}}
        endFillColor="white"
        showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          {validate.isEmpty(galleries) ? (
            <NotAvailablElement routeName={moduleName} />
          ) : (
            <View>
              {galleries.map(g => {
                return (
                  <TouchableOpacity
                    key={g.id * Math.random()}
                    style={styles.elementTypeBtn}
                    onPress={() =>
                      navigation.navigate('GalleryShow', {
                        element: g,
                        name: g.name,
                        moduleName
                      })
                    }>
                    <FastImage
                      style={styles.elementIcon}
                      source={{uri: g.cover}}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}

GalleryIndexScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  elementIcon: {
    width: width,
    height: 220
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
  elementTypeBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5
  },
  elementSlugTitle: {
    color: 'black',
    fontFamily: 'cairo',
    fontSize: 12
  }
});
