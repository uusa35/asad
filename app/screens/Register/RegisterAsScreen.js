import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {toggleLoading} from '../../redux/actions';
import I18n from './../../I18n';
import {height, width} from '../../constants';
import MainBtnElement from './../../components/MainBtnElement';

class RegisterAsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {routeName: ''};
  }

  render() {
    const {roles, navigation} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.mainTitle}>
          {I18n.t('please_choose_user_type')}
        </Text>
        <View style={styles.wrapper}>
          {roles.map(r => (
            <MainBtnElement
              element={r}
              navigation={navigation}
              key={r.id}
              title={r.slug}
              routeName={r.routeName} // i added routeName statically through RoleResources
              iconName={r.name}
            />
          ))}
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
  container: {
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
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  }
});
