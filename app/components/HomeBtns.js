import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {height} from '../constants';
import MainBtnElement from './MainBtnElement';
import I18n from '../I18n';
import PropTypes from 'prop-types';
import DocumentIndexScreen from '../screens/Document/DocumentIndexScreen';

export default class HomeBtns extends Component {
  constructor(props) {
    super(props);
    this.state = {roles: [], navigation: {}};
  }

  static getDerivedStateFromProps(nextProps) {
    const {navigation, roles} = nextProps;
    return {
      roles,
      navigation
    };
  }

  render() {
    const {roles, navigation} = this.state;
    return (
      <View style={styles.container}>
        {roles.map(r => {
          return (
            <MainBtnElement
              element={r}
              navigation={navigation}
              key={r.id}
              title={r.slug}
              routeName={r.routeName} // i added routeName statically through RoleResources
              iconName={r.name}
            />
          );
        })}
        <MainBtnElement
          navigation={navigation}
          name="Guest"
          title={I18n.t('guest')}
          routeName="Contactus" // i added routeName statically through RoleResources
          iconName="guest"
        />
      </View>
    );
  }
}

DocumentIndexScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
  container: {
    height: height,
    justifyContent: 'center',
    marginTop: 150,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
