import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import ProjectPanelWidget from '../../components/Project/ProjectPanelWidget';
import {bindActionCreators} from 'redux';
import {getProject} from '../../redux/actions';
import {connect} from 'react-redux';

class ProjectIndexScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('render method from ProjectIndexScreen');
    const {projects, actions} = this.props;
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        endFillColor="white"
        showsVerticalScrollIndicator={false}>
        {projects.map(project => (
          <ProjectPanelWidget
            project={project}
            key={project.id}
            handleClick={() => actions.getProject(project.id)}
          />
        ))}
      </ScrollView>
    );
  }
}

ProjectIndexScreen.propTypes = {
  projects: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProject: bindActionCreators(getProject, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectIndexScreen);

export const styles = StyleSheet.create({});
