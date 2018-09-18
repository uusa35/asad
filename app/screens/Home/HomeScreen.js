import React, {Component} from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {toggleLoading, getProject, getSearch} from '../../redux/actions';
import {bindActionCreators} from 'redux';
import validate from 'validate.js';
import CompanyProfile from './../../components/CompanyProfile/CompanyProfile';
import SearchInput from '../../components/SearchInput';
import ProjectPanelWidget from '../../components/Project/ProjectPanelWidget';
import {height} from './../../constants';
import I18n from './../../I18n';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  _startSearching = text => {
    return this.props.actions.getSearch(text);
  };

  render() {
    const {auth, projects, settings, actions} = this.props;
    return (
      <ScrollView
        style={{backgroundColor: 'white'}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30, backgroundColor: 'white'}}
        endFillColor="white"
        showsVerticalScrollIndicator={false}>
        {validate.isEmpty(auth) ? (
          <CompanyProfile settings={settings} />
        ) : validate.isEmpty(auth.projects) ? (
          <View style={styles.titleView}>
            <Text style={styles.title}>
              {I18n.t('there_are_no_projects_please_contact_us')}
            </Text>
          </View>
        ) : (
          <View>
            <SearchInput startSearching={this._startSearching} />
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
      getProject: bindActionCreators(getProject, dispatch),
      getSearch: bindActionCreators(getSearch, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const styles = StyleSheet.create({
  titleView: {
    padding: 20,
    height: height - 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'cairo',
    fontSize: 20
  }
});
