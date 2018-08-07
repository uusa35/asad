import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text
} from 'react-native';
import SearchInput from '../../components/SearchInput';
import PropTypes from 'prop-types';
import {colors, icons} from '../../constants';
import FastImage from 'react-native-fast-image';

export default class DrawingIndexScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {project} = this.props.navigation.state.params;
    return (
      <ScrollView
        style={{backgroundColor: 'white'}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30, backgroundColor: 'white'}}
        endFillColor="white"
        showsVerticalScrollIndicator={false}>
        <SearchInput />
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}>
          {project.drawings.map(d => {
            return (
              <TouchableOpacity
                key={d.id}
                style={styles.elementTypeBtn}
                onPress={() => console.log('clicked')}>
                <View style={{ justyfContent : 'center', alignItems: 'center'}}>
                  <FastImage
                    style={styles.elementIcon}
                    source={icons.drawings}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  <Text>{d.name_ar}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

DrawingIndexScreen.propTypes = {
  navigation: PropTypes.object.isRequired
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
  elementIcon: {
    width: 40,
    height: 40
  },
  elementTypeBtn: {
    backgroundColor: 'white',
    width: 90,
    height: 90,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
      shadowColor: 'black',
      shadowOffset: {width: 1, height: 1},
      shadowRadius: 2,
      shadowOpacity: 0.2
  }
});
