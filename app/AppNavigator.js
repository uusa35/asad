import React from 'react';
import {connect} from 'react-redux';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator
} from 'react-navigation';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';
import I18n, {isRTL} from './I18n';
import SideMenu from './components/SideMenu';
import {getHeader} from './helpers';
import {colors, isIOS} from './constants';
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
import DocumentCategoryIndexScreen from './screens/Document/DocumentCategoryIndexScreen';
import GalleryIndexScreen from './screens/Gallery/GalleryIndexScreen';
import PhaseIndexScreen from './screens/Phase/PhaseIndexScreen';
import TimelineIndexScreen from './screens/Timeline/TimelineIndexScreen';
import ReportIndexScreen from './screens/Report/ReportIndexScreen';
import AppPDFViewerScreen from './components/AppPDFViewerScreen';
import TaskShowScreen from './screens/Task/TaskShowScreen';
import SubcontractorIndexScreen from './screens/Subcontractor/SubcontractorIndexScreen';
import ConsultantIndexScreen from './screens/Consultant/ConsultantIndexScreen';
import GalleryShowScreen from './screens/Gallery/GalleryShowScreen';
import ImageShowScreen from './screens/Gallery/ImageShowScreen';
import SearchIndexScreen from './screens/Search/SearchIndexScreen';
import LiveCamIndexScreen from './screens/LiveCam/LiveCamIndexScreen';
import NotificationIndexScreen from './screens/Notification/NotificationIndexScreen';

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
        headerTitle: getHeader(
          I18n.t('register_as_supplier').toLocaleUpperCase()
        )
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
    SearchIndex: {
      screen: SearchIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(I18n.t('search'))
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
      screen: DocumentCategoryIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(navigation.state.params.name)
      })
    },
    DocumentsList: {
      screen: DocumentIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(navigation.state.params.category.slug)
      })
    },
    Timelines: {
      screen: TimelineIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(navigation.state.params.name)
      })
    },
    Payments: {
      screen: PaymentIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(navigation.state.params.project.name)
      })
    },
    Subcontractors: {
      screen: SubcontractorIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(navigation.state.params.project.name)
      })
    },
    Consultants: {
      screen: ConsultantIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(navigation.state.params.project.name)
      })
    },
    Livecam: {
      screen: LiveCamIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(navigation.state.params.project.name)
      })
    },
    Phases: {
      screen: PhaseIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(navigation.state.params.project.name)
      })
    },
    TaskShow: {
      screen: TaskShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(navigation.state.params.element.name)
      })
    },
    Galleries: {
      screen: GalleryIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(navigation.state.params.moduleName)
      })
    },
    GalleryShow: {
      screen: GalleryShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(navigation.state.params.name)
      })
    },
    ImageShow: {
      screen: ImageShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(navigation.state.params.name)
      })
    },
    Timeframes: {
      screen: TimelineIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(navigation.state.params.name)
      })
    },
    Notifications: {
      screen: NotificationIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(I18n.t('notifications'))
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

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export {RootNavigator, AppNavigator, navMiddleware};
