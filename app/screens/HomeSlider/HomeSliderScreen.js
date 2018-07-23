import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {Button, Icon, Card} from 'react-native-elements';
import {connect} from 'react-redux';
import {enableLoading} from '../../redux/actions/sagas/appSagas';
import {bindActionCreators} from 'redux';
import AppIntroSlider from 'react-native-app-intro-slider';
import FastImage from 'react-native-fast-image';
import {height, width} from './../../constants';
import I18n, {isRTL} from './../../I18n';

class HomeSliderScreen extends Component {
  constructor(props) {
    super(props);
  }
  onSkipBtnHandle = index => {
    Alert.alert('Skip');
    console.log(index);
  };
  doneBtnHandle = () => {
    Alert.alert('Done');
  };
  nextBtnHandle = index => {
    Alert.alert('Next');
    console.log(index);
  };
  onSlideChangeHandle = (index, total) => {
    console.log(index, total);
  };

  _renderItem = s => {
    return (
      <View style={styles.slide} key={s.id} level={s.id}>
        <FastImage
          style={styles.imgBg}
          source={{
            uri: `${s.bg}`,
            priority: FastImage.priority.normal
          }}
          resizeMode={FastImage.resizeMode.cover}>
          <Card
            containerStyle={{opacity: 0.7, marginTop: 100}}
            title={s.title}
            image={{uri: s.image}}>
            <Text style={{marginBottom: 10}}>{s.content}</Text>
          </Card>
        </FastImage>
      </View>
    );
  };
  _renderNextButton = () => {
    return (
      <Icon
        name={isRTL ? 'ios-arrow-back' : 'ios-arrow-forward'}
        type="ionicon"
        color="white"
      />
    );
  };
  _renderDoneButton = () => {
    return (
      <Icon
        name="ios-exit"
        type="ionicon"
        color="white"
        onPress={() => this.props.navigation.navigate('Home')}
      />
    );
  };

  _renderSkipButton = () => {
    return (
      <Button
        buttonStyle={{backgroundColor: 'transparent'}}
        title={I18n.t('skip')}
        onPress={() => this.props.navigation.navigate('Home')}
      />
    );
  };

  render() {
    const {navigation, homeSliders} = this.props;
    return (
      <AppIntroSlider
        showDoneButton={true}
        showSkipButton={true}
        doneLabel={I18n.t('done')}
        skipLabel={I18n.t('skip')}
        nextLabel={I18n.t('next')}
        slides={homeSliders}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
        renderSkipButton={this._renderSkipButton}
        renderItem={this._renderItem}
      />
    );
  }
}

HomeSliderScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  homeSliders: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      enableLoading: bindActionCreators(enableLoading, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeSliderScreen);

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  imgSlide: {
    height: 200,
    width: 200
  },
  imgBg: {
    height: height,
    width: width
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 320,
    height: 320
  }
});
