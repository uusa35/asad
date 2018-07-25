import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {toggleLoading} from '../../redux/actions';
import FastImage from 'react-native-fast-image';
import {Button, Icon} from 'react-native-elements';
import I18n from './../../I18n';
import {images} from './../../constants';
import {height, icons, width} from '../../constants';

class RegisterAsScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {roles, navigation} = this.props;
    return (
      <View style={styles.wrapper}>
        <FastImage
          style={styles.imgBg}
          source={images.bg}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={{justifyContent: 'center',  flexWrap : 'wrap', width : width , borderWidth : 1, borderColor : 'green'}}>
          {roles.map(r => {
            return (
                <View style={{ flexDirection: 'column' , jusitfyContent : 'flex-start', padding: 0,  alignItems : 'flex-start', borderWidth : 1, borderColor : 'blue' , width : 100 }}>
                    <Text style={{ color : 'white'}}>{r.name}</Text>
                </View>
            );
          })}
          <Button
            containerStyle={{margin: 15}}
            buttonStyle={{
              margin: 15,
              width: 220,
              opacity: 0.7,
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: 'grey'
            }}
            icon={{
              name: 'ios-arrow-forward',
              type: 'ionicon',
              size: 15,
              color: 'white'
            }}
            title={I18n.t('go_to_home')}
            onPress={() => navigation.navigate('Home')}
          />
        </View>
      </View>
    );
  }
}

RegisterAsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired
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
)(RegisterAsScreen);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  imgBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    height: height,
    width: width
  },
    iconTabBar: {
        width: 30,
        height: 30,
        tintColor : 'white'
    }
});
