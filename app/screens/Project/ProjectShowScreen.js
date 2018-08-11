import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {getProject} from '../../redux/actions';
import connect from 'react-redux/es/connect/connect';
import ProjectPanelHomeWidget from '../../components/Project/ProjectPanelHomeWidget';
import ProjectPanelWidget from '../../components/Project/ProjectPanelWidget';
import MainBtnElement from '../../components/MainBtnElement';
import I18n from './../../I18n';
import {upperFirst} from 'lodash';
const modules = [
  'drawings',
  'documents',
  'phases',
  'payments',
  'galleries',
  'subcontractors',
  'timeframes',
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
    console.log('the project', project);
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
              <MainBtnElement
                key={Math.random()}
                navigation={navigation}
                element={project}
                title={I18n.t(moduleName)}
                iconName={moduleName}
                moduleName={moduleName}
              />
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

ProjectShowScreen.propTypes = {
  navigation: PropTypes.object.isRequired
  // project: PropTypes.object.isRequired
};

// function mapStateToProps(state) {
//   return state;
// }

// export default connect(mapStateToProps)(ProjectShowScreen);

export const styles = StyleSheet.create({});
