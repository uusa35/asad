import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import {width, colors} from './../../constants';

class DocumentCategoryIndexScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {categories: [], navigation: {}};
  }

  static getDerivedStateFromProps(nextProps) {
    const {navigation, categories} = nextProps;
    return {
      categories,
      navigation
    };
  }

  render() {
    const {navigation, categories} = this.state;
    return (
      <ScrollView
        style={{backgroundColor: 'white'}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30, backgroundColor: 'white'}}
        endFillColor="white"
        showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          {categories.map(c => {
            return (
              <TouchableOpacity
                key={c.id}
                style={styles.textWrapper}
                onPress={() =>
                  navigation.navigate('DocumentsList', {
                    category: c
                  })
                }>
                <Text style={styles.textElement}>{c.slug}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  textElement: {
    fontSize: 25,
    fontFamily: 'cairo',
    color: 'black',
    textAlign: 'left'
  },
  textWrapper: {
    width: width - 50,
    borderWidth: 1,
    borderColor: 'grey',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.main,
    margin: 5
  }
});

DocumentCategoryIndexScreen.propTypes = {
  categories: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(DocumentCategoryIndexScreen);
