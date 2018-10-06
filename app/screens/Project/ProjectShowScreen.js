import React, {Component} from 'react';
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

class ProjectShowScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {},
      navigation: {},
      refreshing: false,
      auth: {},
      filteredModules: []
    };
  }

  static getDerivedStateFromProps(nextProps) {
    const {navigation, auth} = nextProps;
    const filteredModules = modules.filter(e => {
      if (auth.role[e]) {
        return e;
      }
    });
    return {
      project: navigation.state.params.project,
      navigation,
      auth,
      filteredModules
    };
  }

  _onRefresh = () => {
    const {id} = this.state.project;
    return this.props.actions.refetchProject(id);
  };

  render() {
    const {project, navigation, refreshing, auth, filteredModules} = this.state;
    return (
      <View style={styles.elementContainer}>
        <ProjectPanelHomeWidget
          name={project.name}
          description={project.description}
          image={project.image}
        />
        <FlatList
          containtContainerStyle={styles.flatListContainer}
          data={filteredModules}
          renderItem={({item}) => {
            return auth.role[item] ? (
              <MainBtnElement
                navigation={navigation}
                element={project}
                title={I18n.t(item)}
                iconName={item}
                routeName={item}
              />
            ) : null;
          }}
          numColumns={3}
          columnWrapperStyle={styles.modulesWrapper}
          ListFooterComponent={() => <View style={{marginTop: 120}} />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
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
