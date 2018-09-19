import React, {Component} from 'react';
import {View, StyleSheet, RefreshControl, FlatList} from 'react-native';
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
  'drawings',
  'documents',
  'phases',
  'payments',
  'galleries',
  'subcontractors',
  'timelines',
  'reports',
  'consultants',
  'livecam'
];

class ProjectShowScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {project: {}, navigation: {}, refreshing: false, auth: {}};
  }

  static getDerivedStateFromProps(nextProps) {
    const {navigation, auth} = nextProps;
    return {
      project: navigation.state.params.project,
      navigation,
      auth
    };
  }

  _onRefresh = () => {
    const {id} = this.state.project;
    return this.props.actions.refetchProject(id);
  };

  render() {
    const {project, navigation, refreshing, auth} = this.state;
    return (
      <View style={styles.elementContainer}>
        <ProjectPanelHomeWidget
          name={project.name}
          description={project.description}
          image={project.image}
        />
        <View style={styles.modulesWrapper}>
          <FlatList
            style={{height: height}}
            data={modules}
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
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this._onRefresh}
              />
            }
          />
        </View>
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
  }
});
