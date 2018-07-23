import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {toggleLoading} from '../../redux/actions';
import FastImage from 'react-native-fast-image';
import {Button, Icon} from 'react-native-elements';
import {images} from './../../constants';
import {height, width} from '../../constants';

class RegisterAsScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {roles} = this.props;
    return (
      <View style={styles.wrapper}>
        <FastImage
          style={styles.imgBg}
          source={images.bg}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {roles.map(r => {
            return (
              <Button
                key={r.id}
                containerStyle={{margin: 15}}
                buttonStyle={{margin: 15, width: 220}}
                titleStyle={{textAlign: 'right', color: 'green'}}
                icon={{
                  key: r.id,
                  name: 'ios-arrow-forward',
                  type: 'ionicon',
                  size: 15,
                  color: 'white'
                }}
                title={r.slug}
              />
            );
          })}
          <Text>testing</Text>
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
  }
});
