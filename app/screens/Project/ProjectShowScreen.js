import React, {PureComponent} from 'react';
import {
  View,
  StyleSheet,
  RefreshControl,
  FlatList,
  ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import ProjectPanelHomeWidget from '../../components/Project/ProjectPanelHomeWidget';
import MainBtnElement from '../../components/MainBtnElement';
import I18n from './../../I18n';
import {upperFirst} from 'lodash';
import {bindActionCreators} from 'redux';
import {refetchProject} from '../../redux/actions';
import {height} from './../../constants';

import connect from 'react-redux/es/connect/connect';
const modules = [
  'documents',
  'galleries',
  'drawings',
  'reports',
  'phases',
  'payments',
  'subcontractors',
  'consultants',
  'timelines',
  'livecam'
];

class ProjectShowScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      filteredModules: []
    };
  }

  _onRefresh = () => {
    const {id} = this.props.project;
    return this.props.actions.refetchProject(id);
  };

  filteredModules = () => {
    const {auth} = this.props;
    const filteredModules = modules.filter(e => {
      if (auth.role[e]) {
        return e;
      }
    });
    return filteredModules;
  };

  handleNav = (routeName, element) =>
    this.props.navigation.navigate(routeName, element);

  _renderItem = ({item}) => {
    const {auth, navigation} = this.props;
    return auth.role[item] ? (
      <MainBtnElement
        handleNav={this.handleNav}
        element={navigation.state.params.project}
        title={I18n.t(item)}
        iconName={item}
        routeName={item}
      />
    ) : null;
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.elementContainer}>
        <ProjectPanelHomeWidget
          name={navigation.state.params.project.name}
          description={navigation.state.params.project.description}
          image={navigation.state.params.project.image}
        />
        <FlatList
          containtContainerStyle={styles.flatListContainer}
          data={this.filteredModules()}
          renderItem={this._renderItem}
          numColumns={3}
          columnWrapperStyle={styles.modulesWrapper}
          ListFooterComponent={() => <View style={{marginTop: 120}} />}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        />
      </View>
    );
  }
}

ProjectShowScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      refetchProject: bindActionCreators(refetchProject, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectShowScreen);

const styles = StyleSheet.create({
  elementContainer: {
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: height
  },
  modulesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  flatListContainer: {
    height: height,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
