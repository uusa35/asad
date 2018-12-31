import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  BackHandler
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  toggleLoading,
  getProject,
  getSearch,
  refetchProjects,
  linkNotification,
  goBackBtn,
  setPlayerId
} from '../../redux/actions';
import {Button} from 'react-native-elements';
import {bindActionCreators} from 'redux';
import validate from 'validate.js';
import SearchInput from '../../components/SearchInput';
import ProjectPanelWidget from '../../components/Project/ProjectPanelWidget';
import {height, colors, isIOS} from './../../constants';
import I18n from './../../I18n';
import OneSignal from 'react-native-onesignal';
import HomeBtns from '../../components/HomeBtns';
import {ONE_SIGNAL_APP_ID} from 'react-native-dotenv';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {refreshing: false, linkNotification: false};

  componentWillMount() {
    OneSignal.init(ONE_SIGNAL_APP_ID);
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  componentDidMount() {
    OneSignal.configure(); // this will fire even to fetch the player_id of the device;
    !isIOS
      ? BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
      : null;
  }

  handleNav = (routeName, element) =>
    this.props.navigation.navigate(routeName, element);

  handleBackPress = () => {
    const {navigation, actions} = this.props;
    actions.goBackBtn(navigation.isFocused());
    return true;
  };

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
    __DEV__ ? console.log('Device info: ', device.userId) : null;
    this.props.actions.setPlayerId(device.userId);
  };

  _startSearching = text => {
    return this.props.actions.getSearch(text);
  };

  _onRefresh = () => {
    return this.props.actions.refetchProjects();
  };

  _renderItem = ({item}) => {
    const {actions} = this.props;
    return (
      <ProjectPanelWidget
        project={item}
        key={item.id}
        handleClick={() => actions.getProject(item.id)}
      />
    );
  };

  render() {
    const {auth, projects, navigation, roles} = this.props;
    const {refreshing} = this.state;
    return (
      <View
        showsHorizontalScrollIndicator={false}
        style={styles.mainContainer}
        endFillColor="white"
        showsVerticalScrollIndicator={false}>
        {validate.isEmpty(auth) ? (
          <View
            style={{flex: 0.9, justifyContent: 'center', alignItems: 'center'}}>
            <HomeBtns roles={roles} handleNav={this.handleNav} />
          </View>
        ) : validate.isEmpty(auth) || validate.isEmpty(projects) ? (
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
              showsVerticalScrollIndicator={false}
              data={projects}
              renderItem={this._renderItem}
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
      setPlayerId: bindActionCreators(setPlayerId, dispatch),
      getSearch: bindActionCreators(getSearch, dispatch),
      linkNotification: bindActionCreators(linkNotification, dispatch),
      goBackBtn: bindActionCreators(goBackBtn, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '5%'
  },
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
