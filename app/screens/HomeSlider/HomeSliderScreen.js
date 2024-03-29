import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {Button, Icon, Card} from 'react-native-elements';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toggleLoading} from '../../redux/actions';
import AppIntroSlider from 'react-native-app-intro-slider';
import FastImage from 'react-native-fast-image';
import {height, width, colors} from './../../constants';
import I18n, {isRTL} from './../../I18n';
import {isAuthenticated} from '../../helpers';

class HomeSliderScreen extends Component {
  constructor(props) {
    super(props);
  }

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
            containerStyle={{opacity: 0.8, marginTop: 100}}
            title={s.title}
            titleStyle={{fontFamily: 'cairo', textAlign: 'left', margin: 10}}
            image={{uri: s.image}}>
            <Text
              style={{
                marginBottom: 10,
                fontSize: 20,
                fontFamily: 'cairo',
                textAlign: 'left'
              }}>
              {s.content}
            </Text>
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
        hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
      />
    );
  };
  _renderDoneButton = () => {
    const {navigation, auth} = this.props;
    return (
      <Button
        containerStyle={{margin: 15}}
        buttonStyle={{margin: 15, width: 300, backgroundColor: colors.main}}
        titleStyle={{textAlign: 'right', color: 'black', fontFamily: 'cairo'}}
        icon={{
          name: 'ios-arrow-forward',
          type: 'ionicon',
          size: 15,
          color: 'white'
        }}
        title={I18n.t('done')}
        titleStyle={styles.titleStyleBtn}
        onPress={() => navigation.navigate('Home')}
      />
    );
  };

  _renderSkipButton = () => {
    return (
      <Button
        buttonStyle={styles.skipBtn}
        title={I18n.t('skip')}
        titleStyle={styles.titleStyleBtn}
        onPress={() => this.props.navigation.navigate('Home')}
      />
    );
  };

  render() {
    const {homeSliders} = this.props;
    return (
      <AppIntroSlider
        showDoneButton={true}
        showSkipButton={true}
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
      toggleLoading: bindActionCreators(toggleLoading, dispatch)
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
    width: width,
    opacity: 0.7
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
  },
  skipBtn: {
    backgroundColor: 'white'
  },
  titleStyleBtn: {
    textAlign: 'left',
    color: colors.main,
    fontFamily: 'cairo'
  }
});
