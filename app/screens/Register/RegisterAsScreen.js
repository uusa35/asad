import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {toggleLoading} from '../../redux/actions';
import FastImage from 'react-native-fast-image';
import I18n from './../../I18n';
import {height, icons, width, colors} from '../../constants';

class RegisterAsScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {roles, navigation} = this.props;
    return (
      <View style={styles.wrapper}>
        <Text style={styles.mainTitle}>
          {I18n.t('please_choose_user_type')}
        </Text>
        <View style={styles.roleContainer}>
          {roles.map(r => {
            return (
              <View key={r.id} style={styles.roleWrapper}>
                <View style={styles.roleSlug}>
                  <Text style={styles.roleSlugTitle}>{r.slug}</Text>
                </View>
                <TouchableOpacity
                  style={styles.roleTypeBtn}
                  onPress={() =>
                    navigation.navigate('Register', {type: r.name})
                  }>
                  <FastImage
                    style={styles.roleIcon}
                    source={icons[r.name]}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
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
  mainTitle: {
    textAlign: 'center',
    fontFamily: 'cairo',
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
    padding: 15
  },
  imgBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    height: height,
    width: width
  },
  roleIcon: {
    width: 40,
    height: 40
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  roleWrapper: {
    justifyContent: 'flex-start',
    padding: 0,
    alignItems: 'center',
    width: 110,
    flexWrap: 'wrap',
    margin: 5,
    marginBottom: 10,
    marginTop: 10
  },
  roleSlug: {
    backgroundColor: 'white',
    width: 110,
    height: 30,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 2,
    shadowOpacity: 0.2
  },
  roleTypeBtn: {
    backgroundColor: colors.main,
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center'
  },
  roleSlugTitle: {
    color: 'black',
    fontFamily: 'cairo',
    fontSize: 12
  }
});
