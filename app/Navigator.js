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
import TestSideMenu from './components/TestSideMenu';
import {getHeader, getTabTitle} from './helpers';
import HeaderLeft from './components/HeaderLeft';
import HeaderCustom from './components/HeaderCustom';
import HomeSliderScreen from './screens/HomeSlider/HomeSliderScreen';
import HomeScreen from './screens/Home/HomeScreen';
import LoginScreen from './screens/Login/LoginScreen';
import RegisterScreen from './screens/Register/RegisterScreen';
import RegisterAsScreen from './screens/Register/RegisterAsScreen';
import ForgetPasswordScreen from './screens/ForgetPassword/ForgetPasswordScreen';
import ResetPasswordScreen from './screens/ResetPassword/ResetPasswordScreen';

const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);

const headerStyle = {
  headerStyle: {
    backgroundColor: 'white',
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
        headerTitle: getHeader(I18n.t('home'))
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
    }
  },
  {
    mode: 'card',
    headerMode: 'screen',
    navigationOptions: headerStyle
  }
);

const LoginRegisterStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(I18n.t('login'))
      })
    },
    RegisterAs: {
      screen: RegisterAsScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(I18n.t('register_as'))
      })
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(I18n.t('register'))
      })
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: headerStyle
  }
);

const RootStack = createStackNavigator(
  {
    HomeSlider: {
      screen: HomeSliderScreen,
      navigationOptions: ({navigation}) => ({
        isModal: true,
        headerTitle: getHeader(I18n.t('home_slider'))
      })
    },
    MainStack: {
      screen: HomeStack,
      navigationOptions: ({navigation}) => ({
        isModal: false
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
    LoginAndRegister: {
      screen: LoginRegisterStack
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
    order: ['RootStack', 'LoginAndRegister']
  }
);

// export const RootNavigation = createDrawerNavigator({
//   taps: {
//     screen: Tabs
//   },{
// contentComponent: <TestSideMenu />;
// contentComponent: ({navigation}) => <SideMenu navigation={navigation} />,
// drawerOpenRoute: 'DrawerOpen',
// drawerCloseRoute: 'DrawerClose',
// drawerToggleRoute: 'DrawerToggle'
// }});

const RootNavigator = createDrawerNavigator(
  {
    Tabs: {
      screen: TabsStack
    }
  },
  {
    contentComponent: () => <SideMenu />
  }
);

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = state => ({
  state: state.nav
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export {RootNavigator, AppNavigator, navMiddleware};
