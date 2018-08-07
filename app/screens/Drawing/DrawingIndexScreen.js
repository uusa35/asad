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
import {icons} from '../../constants';
import FastImage from 'react-native-fast-image';
import connect from 'react-redux/es/connect/connect';
import {NavigationActions} from 'react-navigation';
import {width} from './../../constants';
import PdfBtnElement from './../../components/Project/PdfBtnElement';

class DrawingIndexScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {navigation} = this.props;
    const {project} = navigation.state.params;
    console.log('the pojrect', project);
    return (
      <ScrollView
        style={{backgroundColor: 'white'}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30, backgroundColor: 'white'}}
        endFillColor="white"
        showsVerticalScrollIndicator={false}>
        <SearchInput />
        <View style={styles.wrapper}>
          {project.drawings.map(d => {
            return <PdfBtnElement element={d} navigation={navigation} iconName="drawings"/>;
          })}
        </View>
      </ScrollView>
    );
  }
}

DrawingIndexScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(DrawingIndexScreen);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});
