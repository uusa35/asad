import React from 'react';
import {connect} from 'react-redux';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
  DrawerItems
} from 'react-navigation';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';
import I18n from './I18n';
import SideMenu from './components/SideMenu';
import {getHeader, getTabTitle} from './helpers';
import {colors, text} from './constants';
import HeaderLeft from './components/HeaderLeft';
import HeaderCustom from './components/HeaderCustom';
import HomeSliderScreen from './screens/HomeSlider/HomeSliderScreen';
import HomeScreen from './screens/Home/HomeScreen';
import LoginScreen from './screens/Login/LoginScreen';
import RegisterScreen from './screens/Register/RegisterScreen';
import RegisterAsScreen from './screens/Register/RegisterAsScreen';
import ForgetPasswordScreen from './screens/ForgetPassword/ForgetPasswordScreen';
import ResetPasswordScreen from './screens/ResetPassword/ResetPasswordScreen';
import ContactusScreen from './screens/Contactus/ContactusScreen';
import ProjectShowScreen from './screens/Project/ProjectShowScreen';
import DrawingIndexScreen from './screens/Drawing/DrawingIndexScreen';
import PaymentIndexScreen from './screens/Payment/PaymentIndexScreen';
import DocumentIndexScreen from './screens/Document/DocumentIndexScreen';
import GalleryIndexScreen from './screens/Gallery/GalleryIndexScreen';
import PhaseIndexScreen from './screens/Phase/PhaseIndexScreen';
import TimeframeIndexScreen from './screens/Timeframe/TimeframeIndexScreen';
import VideoIndexScreen from './screens/Video/VideoIndexScreen';
import ReportIndexScreen from './screens/Report/ReportIndexScreen';
import AppPDFViewerScreen from './components/AppPDFViewerScreen';
import TaskShowScreen from './screens/Task/TaskShowScreen';

const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);

const headerStyle = {
  headerStyle: {
    backgroundColor: colors.main,
    borderWidth: 1,
    borderColor: 'grey'
  },
  drawerLockMode: 'locked-closed'
};

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(I18n.t('home')),
        headerLeft: <HeaderLeft navigation={navigation} />
      })
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(I18n.t('login'))
      })
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: ({navigation}) => ({
        isModal: true,
        headerTitle: getHeader(I18n.t('register').toLocaleUpperCase())
      })
    },
    RegisterAs: {
      screen: RegisterAsScreen,
      navigationOptions: ({navigation}) => ({
        isModal: true,
        headerTitle: getHeader(I18n.t('register_as').toLocaleUpperCase())
      })
    },
    ResetPassword: {
      screen: ResetPasswordScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(I18n.t('register'))
      })
    },
    ForgetPassword: {
      screen: ForgetPasswordScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(I18n.t('forget_password'))
      })
    },
    Contactus: {
      screen: ContactusScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(I18n.t('contactus'))
      })
    },
    ProjectShow: {
      screen: ProjectShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(navigation.state.params.name)
      })
    },
    Drawings: {
      screen: DrawingIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(navigation.state.params.name)
      })
    },
    Reports: {
      screen: ReportIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(navigation.state.params.name)
      })
    },
    Documents: {
      screen: DocumentIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(navigation.state.params.name)
      })
    },
    Payments: {
      screen: PaymentIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(navigation.state.params.name)
      })
    },
    Phases: {
      screen: PhaseIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(navigation.state.params.name)
      })
    },
    TaskShow: {
      screen: TaskShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(navigation.state.params.name)
      })
    },
    Galleries: {
      screen: GalleryIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(navigation.state.params.name)
      })
    },
    Timeframes: {
      screen: TimeframeIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(navigation.state.params.name)
      })
    },
    Videos: {
      screen: VideoIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(navigation.state.params.name)
      })
    },
    AppPDFViewer: {
      screen: AppPDFViewerScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(navigation.state.params.title)
      })
    }
  },
  {
    mode: 'card',
    headerMode: 'screen',
    navigationOptions: headerStyle
  }
);

const RootStack = createStackNavigator(
  {
    HomeSlider: {
      screen: HomeSliderScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(I18n.t('home_slider'))
      })
    }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
);

const TabsStack = createBottomTabNavigator(
  {
    RootStack: {
      screen: RootStack
    },
    HomeStack: {
      screen: HomeStack
    }
  },
  {
    //   tabBarPosition: 'bottom',
    //   tabBarOptions: {
    //     showIcon: true,
    //     scrollEnabled: false,
    //     allowFontScaling: true,
    //     activeTintColor: 'pink',
    //     activeBackgroundColor: '#bfbfbf',
    //     labelStyle: {
    //       fontSize: 10,
    //       fontFamily: 'cairo',
    //       fontWeight: 'bold',
    //       color: 'white'
    //     },
    //     style: {
    //       backgroundColor: '#f2f2f2'
    //     }
    //   },
    navigationOptions: {
      tabBarVisible: false
    },
    initialRouteName: 'RootStack',
    order: ['RootStack', 'HomeStack']
  }
);

const RootNavigator = createDrawerNavigator(
  {
    Tabs: {
      screen: TabsStack
    }
  },
  {
    contentComponent: ({navigation}) => <SideMenu navigation={navigation} />
  }
);

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = state => ({
  state: state.nav
});

const mapDispatchToProps = ({navigation}) => {};
const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export {RootNavigator, AppNavigator, navMiddleware};
