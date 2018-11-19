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
  }

  render() {
    const {navigation} = this.props;
    const {moduleName} = navigation.state.params;
    const {galleries} = navigation.state.params.project;
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
                    <View style={styles.headerContainer}>
                      <View style={styles.headerWrapper}>
                        <View style={styles.headerTitleWrapper}>
                          <Text style={styles.mainTitle}>{g.name}</Text>
                        </View>
                        <View style={styles.descriptionWrapper}>
                          <Text style={styles.description}>
                            {g.description}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <FastImage
                      key={g.id}
                      style={styles.elementIcon}
                      source={{uri: g.cover}}
                      resizeMode={FastImage.resizeMode.stretch}
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
  },
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
    backgroundColor: 'white',
    padding: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'black',
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
    fontSize: 16
  },
  description: {
    fontSize: 16,
    textAlign: 'left',
    fontFamily: 'cairo'
  }
});
