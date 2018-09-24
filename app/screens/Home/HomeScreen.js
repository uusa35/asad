import React, {Component} from 'react';
import {View, StyleSheet, FlatList, RefreshControl, Text} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  toggleLoading,
  getProject,
  getSearch,
  refetchProjects,
  linkNotification
} from '../../redux/actions';
import {Button} from 'react-native-elements';
import {bindActionCreators} from 'redux';
import validate from 'validate.js';
import SearchInput from '../../components/SearchInput';
import ProjectPanelWidget from '../../components/Project/ProjectPanelWidget';
import {height, colors} from './../../constants';
import I18n from './../../I18n';
import MainBtnElement from '../../components/MainBtnElement';
import OneSignal from 'react-native-onesignal';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {refreshing: false, linkNotification: false};
  }

  componentWillMount() {
    OneSignal.init('03881e7c-ce2f-44c0-8828-233674af6eab');
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived = notification => {
    console.log('Notification received: ', notification);
  };

  onOpened = openResult => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
    return this.props.actions.linkNotification(
      openResult.notification.payload.additionalData
    );
  };

  onIds = device => {
    console.log('Device info: ', device);
  };

  _startSearching = text => {
    return this.props.actions.getSearch(text);
  };

  _onRefresh = () => {
    return this.props.actions.refetchProjects();
  };

  render() {
    const {auth, projects, actions, navigation, roles} = this.props;
    const {refreshing} = this.state;
    return (
      <View style={{backgroundColor: 'white'}}>
        {validate.isEmpty(auth) ? (
          <View
            style={{
              height: height,
              justifyContent: 'center',
              marginTop: 150,
              alignItems: 'center',
              flexDirection: 'row',
              flexWrap: 'wrap'
            }}>
            {roles.map(r => {
              return (
                <MainBtnElement
                  element={r}
                  navigation={navigation}
                  key={r.id}
                  title={r.slug}
                  routeName={r.routeName} // i added routeName statically through RoleResources
                  iconName={r.name}
                />
              );
            })}
            <MainBtnElement
              navigation={navigation}
              name="Guest"
              title={I18n.t('guest')}
              routeName="Contactus" // i added routeName statically through RoleResources
              iconName="guest"
            />
          </View>
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
      getSearch: bindActionCreators(getSearch, dispatch),
      linkNotification: bindActionCreators(linkNotification, dispatch)
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
    height: height,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainTitle: {
    fontFamily: 'cairo',
    fontSize: 20,
    textAlign: 'center'
  }
});
