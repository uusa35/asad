import React, {Component} from 'react';
import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  toggleLoading,
  getProject,
  getSearch,
  refetchProjects
} from '../../redux/actions';
import {Button} from 'react-native-elements';
import {bindActionCreators} from 'redux';
import validate from 'validate.js';
import CompanyProfile from './../../components/CompanyProfile/CompanyProfile';
import SearchInput from '../../components/SearchInput';
import ProjectPanelWidget from '../../components/Project/ProjectPanelWidget';
import {height, colors} from './../../constants';
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
    const {auth, projects, settings, actions, navigation} = this.props;
    const {refreshing} = this.state;
    return (
      <View style={{paddingBottom: 30, backgroundColor: 'white'}}>
        {validate.isEmpty(auth) ? (
          <CompanyProfile settings={settings} />
        ) : validate.isEmpty(auth.projects) ? (
          <View style={styles.titleView}>
            <Button
              raised
              large
              buttonStyle={{backgroundColor: colors.main}}
              onPress={() => navigation.navigate('Contactus')}
              icon={{name: 'info', color: 'white'}}
              title={I18n.t('there_are_no_projects_please_contact_us')}
              titleStyle={styles.mainTitle}
            />
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
              ListFooterComponent={() => <View style={{marginTop: 120}} />}
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
  mainTitle: {
    fontFamily: 'cairo',
    fontSize: 20,
    textAlign: 'center'
  }
});
