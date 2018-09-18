import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, RefreshControl} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  toggleLoading,
  getProject,
  getSearch,
  refetchProjects
} from '../../redux/actions';
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
    this.state = {refreshing: false};
  }

  _startSearching = text => {
    return this.props.actions.getSearch(text);
  };

  _onRefresh = () => {
    return this.props.actions.refetchProjects();
  };

  render() {
    const {auth, projects, settings, actions} = this.props;
    const {refreshing} = this.state;
    return (
      <View style={{paddingBottom: 30, backgroundColor: 'white'}}>
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
            <FlatList
              data={projects}
              renderItem={({item}) => (
                <ProjectPanelWidget
                  project={item}
                  key={item.id}
                  handleClick={() => actions.getProject(item.id)}
                />
              )}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={this._onRefresh}
                />
              }
            />
          </View>
        )}
      </View>
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
      refetchProjects: bindActionCreators(refetchProjects, dispatch),
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
