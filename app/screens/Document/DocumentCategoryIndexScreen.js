import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import DocumentPanelElement from '../../components/Project/DocumentPanelElement';
import {bindActionCreators} from 'redux';
import {getProject} from '../../redux/actions';
import connect from 'react-redux/es/connect/connect';

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
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: 'blue',
                  height: 120
                }}
                onPress={() =>
                  navigation.navigate('DocumentsList', {
                    category: c
                  })
                }>
                <Text>{c.name}</Text>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center'
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
