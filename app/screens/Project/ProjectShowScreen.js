import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import ProjectPanelHomeWidget from '../../components/Project/ProjectPanelHomeWidget';
import MainBtnElement from '../../components/MainBtnElement';
import I18n from './../../I18n';
import {upperFirst} from 'lodash';
import validate from 'validate.js';
const modules = [
  'drawings',
  'documents',
  'phases',
  'payments',
  'galleries',
  'subcontractors',
  'timelines',
  'reports',
  'subcontractors',
  'consultants'
];
export default class ProjectShowScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {project: {}, navigation: {}};
  }

  static getDerivedStateFromProps(nextProps) {
    const {navigation} = nextProps;
    return {
      project: navigation.state.params.project,
      navigation
    };
  }

  render() {
    const {project, navigation} = this.state;
    return (
      <ScrollView
        style={{backgroundColor: 'white'}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30, backgroundColor: 'white'}}
        endFillColor="white"
        showsVerticalScrollIndicator={false}>
        <ProjectPanelHomeWidget
          name={project.name}
          description={project.description}
          image={project.image}
        />
        <View style={{flexDirection: 'row', flexWrap: 'wrap', margin: 5}}>
          {modules.map(moduleName => {
            return (
              <View key={Math.random()}>
                {!validate.isEmpty(project[moduleName]) ? (
                  <MainBtnElement
                    key={Math.random()}
                    navigation={navigation}
                    element={project}
                    title={I18n.t(moduleName)}
                    iconName={moduleName}
                    routeName={moduleName}
                  />
                ) : null}
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

ProjectShowScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};
