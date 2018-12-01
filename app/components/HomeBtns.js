import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {height} from '../constants';
import MainBtnElement from './MainBtnElement';
import I18n from '../I18n';
import PropTypes from 'prop-types';

export default class HomeBtns extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {roles, navigation} = this.props;
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

HomeBtns.propTypes = {
  navigation: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap'
  }
});
