import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {toggleLoading, getProject} from '../../redux/actions';
import {bindActionCreators} from 'redux';
import validate from 'validate.js';
import CompanyProfile from './../../components/CompanyProfile/CompanyProfile';
import SearchInput from '../../components/SearchInput';
import ProjectPanelWidget from '../../components/Project/ProjectPanelWidget';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {auth, projects, settings, navigation, actions} = this.props;
    console.log('navigation from HomeScreenn', navigation);
    return (
      <ScrollView
        style={{backgroundColor: 'white'}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30, backgroundColor: 'white'}}
        endFillColor="white"
        showsVerticalScrollIndicator={false}>
        {validate.isEmpty(auth) || validate.isEmpty(auth.projects) ? (
          <CompanyProfile settings={settings} />
        ) : (
          <View>
            <SearchInput />
            {projects.map(project => (
              <ProjectPanelWidget
                project={project}
                key={project.id}
                handleClick={() => actions.getProject(project.id)}
                iconName={project.name}
              />
            ))}
          </View>
        )}
      </ScrollView>
    );
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  auth: PropTypes.object,
  projects: PropTypes.array
};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      toggleLoading: bindActionCreators(toggleLoading, dispatch),
      getProject: bindActionCreators(getProject, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
