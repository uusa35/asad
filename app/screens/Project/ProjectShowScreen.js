import React, {Component} from 'react';
import {View, StyleSheet, RefreshControl, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import ProjectPanelHomeWidget from '../../components/Project/ProjectPanelHomeWidget';
import MainBtnElement from '../../components/MainBtnElement';
import I18n from './../../I18n';
import {upperFirst} from 'lodash';
import validate from 'validate.js';
import {width, height} from './../../constants';
import ProjectPanelWidget from '../../components/Project/ProjectPanelWidget';
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
export default class ProjectShowScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {project: {}, navigation: {}, refreshing: false};
  }

  static getDerivedStateFromProps(nextProps) {
    const {navigation} = nextProps;
    return {
      project: navigation.state.params.project,
      navigation
    };
  }

  _onRefresh = () => {
    console.log('project_id', this.state.project.id);
    // return this.props.actions.refetchProject(id);
  };

  render() {
    const {project, navigation, refreshing} = this.state;
    return (
      <View style={styles.elementContainer}>
        <ProjectPanelHomeWidget
          name={project.name}
          description={project.description}
          image={project.image}
        />
        <View style={styles.modulesWrapper}>
          <FlatList
            data={modules}
            renderItem={({item}) => (
              <MainBtnElement
                navigation={navigation}
                element={project}
                title={I18n.t(item)}
                iconName={item}
                routeName={item}
              />
            )}
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

const styles = StyleSheet.create({
  elementContainer: {
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center'
    // height : height,
  },
  modulesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
